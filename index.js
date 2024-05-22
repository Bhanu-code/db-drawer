#!/usr/bin/env node

const { spawn } = require("child_process");
const fs = require('fs');
const path = require("path");

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
    //check if /model is present or not
    modelDirPath = path.join(process.cwd(), '/models')
    if (!fs.existsSync(modelDirPath)){
        console.log("Error : models folder not found, create a models folder to visualize schemas")
        process.exit()
    }

    nodeProcess = startProcess();
    watchFiles();
    process.on('SIGINT', async () => { await exitHandler() });
    process.on('SIGTERM', async () => { await exitHandler() });
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
    }

    // Setup event handlers for child process
    processExited = false;
    childProcess.on('close', () => {
        processExited = true;
        console.log('server restarting');
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
                console.log("files modified...");
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
