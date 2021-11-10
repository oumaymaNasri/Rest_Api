const dotenv = require('dotenv');
const express = require('express');
const userModel=require('./models/User')

  
dotenv.config()

 // connect my database 
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/my_db'; //le nom de la base de donnée

mongoose.connect(mongoDB,{useUnifiedTopology: true, useNewUrlParser:true}) ;

mongoose.Promise=global.Promise ;

module.exports = mongoose ;

const app = express()

//test for first time
app.get('/User', (req,res)=>{
    res.send('hello my user')
});

//route for add one user
app.post('/addUser', (req,res)=>{
    userModel.create(req.body, function(err, User){
        if(err){
            console.log('err',err) ;
            res.json({message: 'error add user', status: 500, data:null})
        }else{
            res.json({message:'new user added', status:200, data:User})
        }
    })
});

//route for get all users

app.get('/getAllUsers', (req,res)=>{
    userModel.find({}).exec(function(err,users){
        if(err){
            res.json({message:'error users in system',status:500,data:null})
        } else{
            res.json({message:'all users on system', status:200,data:users})
        } 
    })
});

//route for update one user

app.put('/updateUser/:id', (req,res)=>{
    userModel.updateOne({_id: req.params.id},req.body,function(err,user){
        if(err){
            res.json({message:'user is not updated',status:500,data:null})
        }else{
            res.json({message:'user is updated',status:200,data:user})
        }
    });
})

//route for delete one user

app.delete('/deleteUserById/:id', (req,res)=>{
    userModel.deleteOne({_id: req.params.id},function(err,user){  
        if(err){
            res.json({message:'error delete',status:500,data:null})
        }else{
            res.json({message:'user is deleted', status:200,data:user})
        }
    })
});
















app.listen(5000,console.log('Server running at http://127.0.0.1:5000/')) 





 