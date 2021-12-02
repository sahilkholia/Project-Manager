const express = require("express")
const app = express();
const mongoose = require("mongoose")
const UserModel = require('./models/Users');

const cors = require('cors');
const { request } = require("express");


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sahil:root@maindb.psbwt.mongodb.net/ProjectManager?retryWrites=true&w=majority");

app.get("/getUsers", (req, res) =>{
    UserModel.find({}, (err, result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
});

app.get("/checkUser/:username", (req, res) =>{
    UserModel.find({username: req.params.username}, (err, result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
});

app.post("/createUser", async (req,res) =>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});

app.listen(3001, () => {
    console.log("Server Run Successfuly!!");
});