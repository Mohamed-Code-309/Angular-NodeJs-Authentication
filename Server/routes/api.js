
const express = require('express')
const router = express.Router()

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const db = "mongodb+srv://mohamed:nn4CdkD7GFD53AnI@cluster0.kngjr.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.connect(db, err =>{
    if(err){
        console.log("Error| " +err)
    }
    else{
        console.log("Connected to MongoDB")
    }
})

function verifyToken(req, res, next){
  
  //check if authorization key is present in the header
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized Request')
  }

  //authorizaton property is present, we extract the token from the bearer token
  let token = req.headers.authorization.split(' ')[1];
  if(token == 'null'){
    return res.status(401).send('Unauthorized Request')
  }
  //token exist so we verify it using jwt 
  let payload = jwt.verify(token, 'SecretKey');
  // the verify method returns the decoded token only if it is valid
  if(!payload){
    return res.status(401).send('Unauthorized Request')
  }  
  req.userId = payload.subject;
  next();
}


router.get('/',(req, res) =>{
    res.send('hello from API route')
})


router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData)
    user.save((err, user) => {
        if(err){
            console.log(err);
        }
        else{
            //payload creation
            let payload = { subject: user._id}
            //assign token and generate it
            let token = jwt.sign(payload, "SecretKey"); //secret key (second param used in verification) can be anything
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (err, user) => {
        if(err){
            console.log(err);
        }
        else{
            if(!user){ 
                res.status(401).send('Invalid Email')
            }
            else{

                if(user.password != userData.password){
                    res.status(401).send('Invalid Password')
                }
                else{ 
                    let payload = { subject: user._id}
                    let token = jwt.sign(payload, "SecretKey"); 
                    res.status(200).send({token})
                }
            }
        }
    })
})


router.get('/events', (req, res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events)
})

module.exports = router

