
# db-drawer 

<br>
<br>
<br>
<br>
<br>
<br>


<!-- TABLE OF CONTENTS -->

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#1 Project Description">Project Description</a>
    </li>
    <li>
      <a href="#2 Project Architechture">Project Architechure</a>
    </li>
    <li>
      <a href="#3 Tech Stacks">Tech Stacks</a>
    </li>
    <li>
      <a href="#4 Building the project in your system">Building the project in your system</a>
    </li>
    <li>
      <a href="#5 Contributing">Contributing</a>
    </li>
    

# <a name="1 Project Description">Project description:</a>


db-drawer is a cli tool for visualising your database schemas. db-drawer checks the data model schemas of your project ("./models") folder and visualises by running on localhost in node environment. it attaches to your project as an npm package.

[ Note: You must have your models inside a "models" folder ]

Imagine you have so many model files in  your project. You need to check every file again and again to see all field names, validations, field types are specified correctly. It becomes painful when you have relationships, cascading among your tables. Think how it would be to see them in a beautiful tabular format, with field names, field types specified along with constraints populated with different colors, arrow lines pointing to relationships etc. It does not only provide you just a view of your model files but also validates that your model files are syntactically corrent.

It reads the models files inside your project and shows them in a tabular format by spinning up a server on localhost. It actively looks for changes inside your model files and reflects them immediately.

currently, we have support only for sequelize and mongoose.

refer to the video link to get a quick glipmse of the project: https://youtu.be/FTxOed97E2A?si=RuxWV1J56LuWdVmA

# <a name="2 Project Architechure">Project Architechure:</a>

Project Architechure

![WhatsApp Image 2024-05-18 at 00 20 55](https://github.com/suhanipaliwal/db-drawer/assets/161575955/d6854ec8-fa70-4e82-96ab-6ad278b4f258)


Dataset can be downloaded from the mentioned below link:
# <a name="3 Tech Stacks">Tech Stacks:</a>

To be able to contribute to this project following technolgies you should learn,

1. JavaScript
2. EJS(Embedded Javascript)
3. little Knowledge of Express.js
4. CSS
5. Little Knowledge of ORMs like Mongoos, Sequelize, TypeORM etc.
6. Process Management in JavaScript

You can start contribute with knowledge of JavaScript and learn others on the go.


# <a name="4 Building the project in your system">Building the project in your system</a>

[ Note: The current version of the project works only when you install it globally for development ]

**Use the project:**

I suggest everyone to use the project first. 
1. Have a project have database schemas files inside a "./models" folder. 
2. Install db-drawer with the command "npm install -g db-drawer".
3. hit the command "db-draw s"(if using sequelize) or "db-draw m"(if using mongoose).
4. Play around and get familiar.

<br/>

**Build the project:**
For building the project in your system follow this steps,

[ Note: You will need a demo supporting project that has models e.g: <a href="https://github.com/Bhanu-code/next_store_api "> demo supporting project </a>]

1. Fork the db-drawer repository.
2. Clone the repository.
3. cd db-drawer && npm install.
4. hit npm install -g (this will install db-drawer globally)
5. Now cd to demo project(which has models) and hit the command "db-draw s"(for sequelize) or "db-draw m"(for mongoose). It will spinup the visualisation server.
6. Now create a new branch in db-drawer project, make changes and raise PR.



# <a name="5 Contributing">Contributing</a>

[ Note: Always create a New Branch for a New PR ]

<a href="https://github.com/Bhanu-code/db-drawer/blob/main/CONTRIBUTING.md">refer to CONTRIBUTING.md </a>

<a href="https://github.com/Bhanu-code/db-drawer/blob/main/CODE_OF_CONDUCT.md">refer to CODE_OF_CONDUCT.md </a>





## 🙏 Support

This project needs a ⭐️ from you. Don't forget to leave a star ⭐️



