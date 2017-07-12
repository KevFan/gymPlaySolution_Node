### Project Title:
Gym Play Node - <https://github.com/KevFan/gymPlaySolution_Node>

### Project Description:
The project uses the [glitch template 1](https://github.com/wit-ict-summer-school-2017/glitch-template-1) as a base, and attempts to convert the [play web assignment solution](https://github.com/wit-ict-summer-school-2017/play-gym-web) to node. 

There are several differences between the two but the overall functionality should remain the same.

### How to start project:
To run the project locally, clone or download the project. Unzip the project, and browse to project root directory using a terminal. Enter the `npm install` command to install the project dependencies. 

Following the dependency installation, enter the `npm start` which would host the project on <http://localhost:4000/>


### User Instructions:
After hosting the project locally, users can signup or login using the preloaded accounts provided: 
```
User Accounts:

email: homer@simpson.com
password: secret

email: marge@simpson.com
password: secret
```
There is also a preloaded trainer account, which serves as an admin that can delete users and add comments to user assessments: 
```
Trainer Account:

email: trainer@trainer.com
password: secret

```
Alternative for the deployed version, you can visit <https://gym-node.glitch.me/>

The above user and trainer accounts should also work for the deployed version, assuming none of the preloaded user accounts has been deleted.

### Feature List:
+ Session information
+ Assessments - sorted by date
+ Member - registration
+ Member - add assessments
+ Member - delete assessments
+ Member - update account details
+ Trainer - update assessment comment
+ Trainer - delete member

### Notes: 
+ There is no sign up available for a Trainer. Trainers must be preloaded from the trainer-store.json 

### List of Software + Technologies Used
+ [Node.js](https://nodejs.org/en/)
+ [Express](https://expressjs.com/) - Node.js Web Framework
+ [Glitch](https://glitch.com/) - Deployment platform
+ [Lowdb](https://github.com/typicode/lowdb) - JSon database for persistence
+ [WebStorm](https://www.jetbrains.com/webstorm/) - JavaScript IDE


### Authors:
Kevin Fan ([KevFan](https://github.com/KevFan))

### Version/Date:
12th July 2017