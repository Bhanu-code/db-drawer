//CREATING BASIC EXPRESS APP
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// CONFIGURING FOR ENV
const dotenv = require("dotenv");
dotenv.config();

// SUPPORT FOR JSON & PUBLIC FOLDER
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// SETTING VIEW ENGINE AS EJS
app.set("view engine", "ejs");

// Function to parse Prisma schema
function parsePrismaSchema() {
    const prismaSchemaPath = path.join(__dirname, "../prisma/schema.prisma");

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

// Serve parsed Prisma schema data
app.get("/prisma-schema", (req, res) => {
    try {
        const schemaData = parsePrismaSchema();
        console.log(schemaData);
        res.json(schemaData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//listening to requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Visualization server up at http://localhost:${PORT}`);
});

// SETTING ROUTE TO home.ejs
app.get("/", (req, res) =>{
  res.render(__dirname + "/../views/prisma.ejs", { modelsArr: [], fieldsArr: [] });
});
