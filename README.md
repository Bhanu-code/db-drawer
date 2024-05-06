
# db-drawer

a cli tool for visualising your database schemas. db-drawer checks the data model schemas of your project ("./models") folder and visualises by running on localhost in node environment. it attaches to your project as an npm package.

currently, we have support only for sequelize and mongoose.

refer to the video link to get a quick glipmse of the project: https://youtu.be/FTxOed97E2A?si=RuxWV1J56LuWdVmA

Join Our Discord channel: <a></a>https://discord.gg/hMQcQcng


## Installation

Install db-drawer with npm

```javascript
//install using npm
npm install -g db-drawer
//open terminal and type
//for sequelize
db-draw s
//for mongoose
db-draw m
// hit enter and it will run localhost where you can see your schema, relationship and constraints in a tablular format
```
    
## Screenshots

![alt text](mongo2.png)
![alt text](sql.png)

## Local Setup

Note: [ Don't commit to main branch, always create a seprate branch before raising PR ]

```javascript
// You will need a demo project that has "/models" folder to see your models visualised.
//To setup the project locally, for the repository and copy the forked copy the https url
//in the terminal write
git clone [repo-url]
cd db-drawer
npm install
// have a project that has "models" folder
//install dbdrawer-mongo to the project globally
npm install -g 
// Open the demo project
//run the command for sequelize
db-draw s
//run the command for mongoose
db-draw m

// hit enter and it will run localhost where you can see your schema, relationship and constraints in a tablular format
//create a branch, make changes and raise PR
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT License](LICENSE)

