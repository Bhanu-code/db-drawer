
# db-drawer

a cli tool for visualising your database schemas. db-drawer checks the data model schemas of your project ("./models") folder and visualises by running on localhost in node environment. it attaches to your project as an npm package.

currently, we have support only for sequelize and mongoose.
For,  sequelize check: https://github.com/Bhanu-code/db-drawer



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

```javascript
//To setup the project locally, for the repository and copy the forked copy the https url
//in the terminal write
git clone [repo-url]
cd db-drawer
npm install
// have a project that has "models" folder
//install dbdrawer-mongo to the project globally
npm install -g 
//on the demo project
//run the command for sequelize
dbdraw s
//run the command for mongoose
dbdraw m

// hit enter and it will run localhost where you can see your schema, relationship and constraints in a tablular format
//create a branch, make changes and raise PR
```


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT License](LICENSE)

