#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require('fs');
const path = require("path");
const express = require('express');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

// Define variables
let nodeProcess = null;
let processExited = true;
let pathsToWatch = [
    path.join(process.cwd(), '/models/**/*.js'),
    path.join(process.cwd(), '/prisma/schema.prisma')
];

let previousReloadTimer = null;

// Initialize the script
if (process.argv.length === 3) {
    init();
}

// Initialization function
function init() {
    // Check if /model is present or not
    modelDirPath = path.join(process.cwd(), '/models');
    if (!fs.existsSync(modelDirPath)) {
        console.log("Error: models folder not found, create a models folder to visualize schemas");
        process.exit();
    }

    const app = express();
    const port = 3000;

    // Serve static files (your visualizations)
    app.use(express.static(path.join(__dirname, 'public')));

    // Add routes for export functionality
    app.get('/export/pdf', async (req, res) => {
        try {
            const pdf = await generatePDF();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=schema.pdf');
            res.send(pdf);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error generating PDF');
        }
    });

    app.get('/export/png', async (req, res) => {
        try {
            const png = await generatePNG();
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', 'attachment; filename=schema.png');
            res.send(png);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error generating PNG');
        }
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });

    nodeProcess = startProcess();
    watchFiles();
    process.on('SIGINT', async () => { await exitHandler(); });
    process.on('SIGTERM', async () => { await exitHandler(); });
}

// Start the child process
function startProcess() {
    let childProcess = null;

    // Start the appropriate server based on command-line argument
    if (process.argv[2] === 'm') {
        childProcess = spawn('node', [path.join(__dirname, '/servers/mongo.js')], {
            stdio: [process.stdin, process.stdout, process.stderr]
        });
    } else if (process.argv[2] === 's') {
        childProcess = spawn('node', [path.join(__dirname, '/servers/sqlz.js')], {
            stdio: [process.stdin, process.stdout, process.stderr]
        });
    } else if (process.argv[2] === 'p') {
        childProcess = spawn('node', [path.join(__dirname, '/servers/prisma.js')], {
            stdio: [process.stdin, process.stdout, process.stderr]
        });
    } else if (process.argv[2] === 't') {
        childProcess = spawn('node', [path.join(__dirname, '/servers/torm.js')], {
            stdio: [process.stdin, process.stdout, process.stderr]
        });
    }

    // Setup event handlers for child process
    processExited = false;
    childProcess.on('close', () => {
        processExited = true;
        console.log('Server restarting');
    });
    childProcess.on('error', () => {
        processExited = true;
        console.log('Error occurred');
    });

    return childProcess;
}

// Watch files for changes
function watchFiles() {
    // Watch each directory in pathsToWatch
    pathsToWatch.forEach(dir => {
        fs.watchFile(dir, { interval: 1000 }, (curr, prev) => {
            // Check if file content has changed
            if (curr.mtime !== prev.mtime) {
                console.log("Files modified...");
                clearTimeout(previousReloadTimer);
                previousReloadTimer = setTimeout(async () => {
                    await reload();
                }, 1000);
            }
        });
    });
}

// Reload the server
async function reload() {
    await stopProcess();
    nodeProcess = startProcess();
}

// Stop the child process
async function stopProcess() {
    return new Promise((resolve, reject) => {
        nodeProcess.kill();
        const key = setInterval(() => {
            if (processExited) {
                clearInterval(key);
                resolve(true);
            }
        }, 500);
    });
}

// Handle exit signals
async function exitHandler() {
    await stopProcess();
    process.exit();
}

// Generate PDF function
async function generatePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${3000}`); // URL of your visualization
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdf;
}

// Generate PNG function
async function generatePNG() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`http://localhost:${3000}`); // URL of your visualization
    const screenshot = await page.screenshot({ fullPage: true });
    await browser.close();
    return screenshot;
}
