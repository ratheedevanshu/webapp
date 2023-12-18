To run this application you would be needed to install the dependencies using npm i ,
and you can use your own mongo url and runn reddis , mysql server , rabbitmq with default settings in your machine on localhost
base url for api are http://localhost:3000/api/
for api documentation please visit https://documenter.getpostman.com/view/18231085/2s9YknA2dG 
regards devanshu rathee

user routes :  
1  create user : /user/createUser    (POST)
    body : {
    "email" : "pqsdffassswsdsfet@gmail.com",
    "password" : "qwerty"
}  , type is json

2 edit password  user/editPassword/:userid    (PUT)
   body : {
    "password" : "qwerty"
}  , type is json

3 login  user/login    (POST)
    body : {
    "email" : "pqsdffassswsdsfet@gmail.com",
    "password" : "qwerty"
}  , type is json

4 get by id details  user/:userid    (get)

similarly for fgame data the model follows this body type
{
    "userId" : "0b1b588b-c384-4f65-b1b9-ba647b41ebcc",
    "score" : 12,
    "level" : 1,
    "achievements" : [
         {
            "name": "sample",
            "description": "yo"
         }
    
    ]
}
the inheretd logic for all api's are same the rabbit mq and reddis server are without passswords on local machine 
Please do connect if having any troiubles while testing
regards devasnshu rathee.
