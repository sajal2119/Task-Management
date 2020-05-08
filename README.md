# Task-Management

> Demo is available ![here](https://notesmap.imfast.io/)

Purpose of the repo
===================

To build a very simple user interface in order to manage tasks within a team

Stack used
==========

The stack used for developing is described as below :

* [ReactJS](https://facebook.github.io/react/)
* [React-Router](https://github.com/ReactTraining/react-router)
* [Redux](http://redux.js.org/)
* [MaterialUI](http://www.material-ui.com/)
* [MaterializeCSS](http://materializecss.com/)

Steps for Setup
===============

### 1. Clone the repository in workspace of your local system using:
```
git clone https://github.com/sajal2119/Task-Management.git
```

### 2. Change the current directory to folder of local repository
```
cd Task-Management
```

### 3. In the directory, install node dependencies from the *package.json*
```
npm install
```

### 4. Copy the *config_template.json* file into *config.json* to have local parameters for running the application (This step does not change anything right now, because no key-value pair is present/used from *config_template.json* file)
```
cp config_template.json config.json
```

### 5. Run npm scripts to start the build process. Depending on type of environment you are executing the step, choose any one:
  1. Developement environment
     *  Start the build process manually.
       ```
         npm run start
       ```
  2. Production environment
    ```
      npm run build
    ```

This will start the server on port 8080 (e.g. http://localhost:8080)
