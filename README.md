# Restaurant_list_passport
載入passport module,增加local login/facebook login功能,session機制,bcrypt hash code, flash message

## Getting Started
### Installing
```
install Node.js, this project use version V10.15.0
```
```
install MongoDB
```
## Running the project

#### 1.Clone or download this project
```
git clone https://github.com/brendasy/Restaurant_list_passport.git
```

#### 2.Dowload modules 
```
cd Restaurant_list_passport/
npm install
```

#### 3.Install Nodemon
```
cd Restaurant_list_passport/
npm install -g nodemon
```

#### 4.Initial the seeds data 
```
cd Restaurant_list_passport/models/seeds
node Seeder.js
```
Now you can check MongoDB if there are 2 users in users collection and each user has 3 restaurants data in restaurants collection under restaurant database.

If there are data in restaurant dbs, then you could go on the next step.

#### 5.Execute the web server
```
cd Restaurant_list_passport/
npm run dev
```
#### If you may see the result as following, then you could go on the next step.

    > nodemon app.js

    [nodemon] 2.0.2
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching dir(s): *.*
    [nodemon] watching extensions: js,mjs,json
    [nodemon] starting `node app.js`
    Express is listening on localhost:3000
    mongodb connected!
    
#### 6.Start the browser

```
Enter the URL http://localhost:3001/ at browser
```

## Built With

* [nvm-windows](https://github.com/coreybutler/nvm-windows) - Node.js environment for windows OS
* [nvm](https://github.com/nvm-sh/nvm) - Node.js environment for Linux / Mac OS
* [cmder](https://cmder.net/) - Used to type cmd in windows OS
* [MongoDB](https://www.mongodb.com/) - Database server


## Authors

* **Brenda** 
