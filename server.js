const express = require('express');
const res = require('express/lib/response');
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const { hash } = require('bcrypt');
const { urlencoded } = require('express');
const { RepeatWrapping } = require('three');
const saltRounds = 10;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/examples/js/controls')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/three/examples/js/loaders')));
app.use(express.static(path.join(__dirname,"src")));
app.use('/images', express.static('images'));




mongoose.connect("mongodb://localhost:27017/SIH",{useNewUrlParser : true});

const userSchema = new mongoose.Schema({
    name:String,
    email : String,
    password  : String 
});

const User = new mongoose.model("User",userSchema);

const contactSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    comment: String
});

const Contact = new mongoose.model("Contact",contactSchema);


app.get('/contactus',(req,res)=>{
   res.sendFile(__dirname + '/src' + '/contactus.html');
});

app.get('/login',function(req,res){
    
    res.sendFile(__dirname +"/src" +"/login.html");
});

app.get('/signup',function(req,res){
    
     res.sendFile(__dirname +"/src" +"/signup.html");
});

app.get('/aboutus',function(req,res){
    
    res.sendFile(__dirname +"/src" +"/aboutus/index.html");
});

function check(){
    if(window.getElementById("victory").value == password) {
         return true;
    }
    else {    
         alert("wrong keyword entry");
         return false;
    }
  }

app.post('/login',function(req,res){
    const email = req.body.email;
    const password = req.body.password;

   User.findOne({email:email}, function(err,foundUser){
    //    console.log(foundUser);
       if(err){
           console.log(err);
       }else{
           if(foundUser){
              bcrypt.compare(password,foundUser.password,function(err,response){
                if(err){
                    console.error(err);
                }else if(response){
                    res.sendFile(__dirname+"/src"+"/index.html");
                }else{
                    res.sendFile(__dirname+"/src"+"/login.html");
                
               
                }
              });


           }else{
            
            res.status(200).send('email no');
           }
       }
   });

})

app.post('/signup',function(req,res){
    bcrypt.hash(req.body.password,saltRounds,function(err,hash){
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password  : hash
        });
    
        newUser.save(function(err){
            if(err){
                console.error(err);
            }else{
                res.sendFile(__dirname+"/src"+"/index.html");
                // res.status(200).send('some text');
            }
        });
    });
})

app.post('/contactus',(req,res)=>{
    const newContact = new Contact({
        fname : req.body.fname,
        lname : req.body.lname,
        email : req.body.email,
        comment : req.body.comment
    });

    newContact.save(function(err){
        if(err){
            console.error(err);
        }else{
            res.sendFile(__dirname+"/src"+"/index.html");
            res.status(200).send('some text');

        }
    });

});

app.listen(3000, ()=> {
    
    console.log('Server is wokrking on http://localhost:3000');
});