// CREATING BASIC EXPRESS APP
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const net = require('net');
const dotenv = require("dotenv");
const e = require("express");
dotenv.config();
// SUPPORT FOR JSON & PUBLIC FOLDER
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// SETTING VIEW ENGINE AS EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/../views"));

function parseTypeOrmEntity() {
    const entityFolderPath = path.join(process.cwd(), "/src/entity"||__dirname+"/src/entity");

    // Check if entity folder exists
    if (!fs.existsSync(entityFolderPath)) {
        throw new Error("Entity folder not found");
    }

    // Read all entity files
    const entityFiles = fs.readdirSync(entityFolderPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    const entities = {};

    entityFiles.forEach(file => {
        const entityContent = fs.readFileSync(path.join(entityFolderPath, file), "utf-8");

        let currentEntity = null;

        // Splitting the entity file by lines
        const lines = entityContent.split("\n");

        lines.forEach((line, index) => {
            // Assuming entities start with "@Entity" decorator
            if (line.trim().startsWith("@Entity")) {
                let entityName = file.replace('.ts', '').replace('.js', ''); // Extracting entity name from file name
                const decoratorContent = line.trim().match(/\((.*?)\)/);
                if (decoratorContent) {
                    const customName = decoratorContent[1].replace(/'/g, '');
                    if (customName) {
                        entityName = customName;
                    }
                }
                entities[entityName] = {};
                currentEntity = entityName;
            } else if (currentEntity && (line.trim().startsWith("@PrimaryGeneratedColumn") || line.trim().startsWith("@Column"))) {
                let nextLineIndex = index + 1;
                while (!lines[nextLineIndex].trim().includes(':')) {
                    nextLineIndex++;
                }
                const nextLine = lines[nextLineIndex].trim();
                const columnParts = nextLine.split(':'); // Splitting by colon
                const columnName = columnParts[0].trim(); // Extracting column name
                const columnType = columnParts[1].split(';')[0].trim(); // Extracting column type
                entities[currentEntity][columnName] = columnType; // Storing column name and type
            }
        });
    });

    return entities;
}
const entityData = parseTypeOrmEntity();
// console.log(entityData);
const tables = Object.keys(entityData);
const attrs =Object.values(entityData);
// console.log(tables);
// console.log(attrs);
const PORT = process.env.PORT || 3001;

// SETTING ROUTE TO home.ejs
app.get("/", (req, res) =>{
    res.render(__dirname + "/../views/torm.ejs", { modelsArr: tables, fieldsArr: attrs});
});
app.get("/schema", (req, res) =>{
    res.json({modelsArr: tables, fieldsArr: attrs});
});             
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