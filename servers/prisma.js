//CREATING BASIC EXPRESS APP
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const net = require('net');
// CONFIGURING FOR ENV
const dotenv = require("dotenv");
dotenv.config();

// SUPPORT FOR JSON & PUBLIC FOLDER
app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static('public'));
app.use(express.json());

// SETTING VIEW ENGINE AS EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/../views"));

// Function to parse Prisma schema
function parsePrismaSchema() {
    const prismaSchemaPath =  path.join(process.cwd(), "/prisma/schema.prisma"||__dirname+"/prisma/schema.prisma");

    // Check if Prisma schema file exists
    if (!fs.existsSync(prismaSchemaPath)) {
        throw new Error("Prisma schema file not found");
    }

    // Read Prisma schema file
    const prismaSchema = fs.readFileSync(prismaSchemaPath, "utf-8");

    // Parse Prisma schema
    const tables = {};
    let currentTable = null;

    // Splitting the schema file by lines
    const lines = prismaSchema.split("\n");

    lines.forEach(line => {
        // Assuming models start with "model" keyword
        if (line.trim().startsWith("model")) {
            const modelName = line.trim().split(" ")[1]; // Extracting model name
            tables[modelName] = {};
            currentTable = modelName;
        } else if (currentTable && line.trim().startsWith("}")) {
            // End of model definition
            currentTable = null;
        } else if (currentTable && !line.trim().startsWith("model") && !line.trim().startsWith("}")) {
            // Field definition inside a model
            const parts = line.trim().split(/\s+/); // Splitting by whitespace
            const fieldName = parts[0]; // Extracting field name
            tables[currentTable][fieldName] = parts.slice(1); // Storing field attributes
        }
    });

    return tables;
}
const schemaData = parsePrismaSchema();
const tables = Object.keys(schemaData);
const attrs =Object.values(schemaData);
// res.json(schemaData);


//listening to requests
const PORT = process.env.PORT || 3001;

// SETTING ROUTE TO home.ejs
app.get("/", (req, res) =>{
    res.render(__dirname + "/../views/prisma.ejs", { modelsArr: tables, fieldsArr: attrs});
});
// app.get("/schema", (req, res) =>{
//     res.json({modelsArr: tables, fieldsArr: attrs});
// });
function startServer(port) {
    const server = net.createServer();

    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            // port is currently in use, try the next one
            startServer(++port);
        } else {
            // some other error, throw it
            throw err;
        }
    });

    server.once('listening', () => {
        // close the server and start the express app on this port
        server.close();
        app.listen(port, () => {
            console.log(`Visualization server up at http://localhost:${port}`);
        });
    });

    server.listen(port);
}

startServer(PORT);