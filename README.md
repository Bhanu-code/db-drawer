# db-drawer
![db-drawer](db-drawer-logo.png)

A cli tool for visualising your database schemas. db-drawer checks the data model schemas of your project ("./models") folder and visualises by running on localhost in node environment. it attaches to your project as an npm package.

Currently, we have support only for sequelize and mongoose.

Refer to Learn.md for building the project: <a href="https://github.com/Bhanu-code/db-drawer/blob/main/Learn.md">Learn.md</a>

Video demonstration of the project: <a href="https://youtu.be/bcp6hE_R75U?si=Rd8dj-SLtZwtVjwH">Demonstration video</a>

Join Our Discord channel: <a href="https://discord.gg/bgnvc7Wc">Discord</a>


## Installation

Install db-drawer with npm

### Local installation

```javascript
//Install as dev dependency in your project
npm install db-drawer --save-dev

//For sequelize
npx db-draw s

//For mongoose
npx db-draw m
```

### Global installation

```javascript
npm install -g db-drawer

cd /path/to/your/project

//For sequelize
db-draw s

//For mongoose
db-draw m
```
After executing the command, it will run localhost where you can see your schema, relationship and constraints in a tablular format
    
## Screenshots

![db-draw with mongoDB](mongo2.png)
![db-draw with SQL](sql.png)

## Local Setup

Note: [ Don't commit to main branch, always create a seprate branch before raising PR ]

```javascript
// You will need a demo project that has "/models" folder to see your models visualised.
//To setup the project locally, for the repository and copy the forked copy the https url

//In the terminal write
git clone [repo-url]

cd db-drawer

npm install

// Have a project that has "models" folder
//Install dbdrawer-mongo to the project globally
npm install -g 

// Open the demo project
cd /path/to/your/project

//Run the command for sequelize
db-draw s

//Run the command for mongoose
db-draw m

```

Hit enter and it will run localhost where you can see your schema, relationship and constraints in a tablular format

Create a branch, make changes and raise PR


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## License

[MIT License](LICENSE)

