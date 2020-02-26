const express = require('express')
const router = express.Router()
const User = require('../models/auth')
const bcrypt = require ('bcrypt')

router.get('/',async function(req,res){
    try{
        const user = await User.find()
        res.json(user)

    } catch (err) {
        res.status(500).send({message: err.message})
    }
})

router.post('/register', async function(req,res){
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    const user = new User({ 
        name: req.body.name, 
        email: req.body.email, 
        password: hashedPassword })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message:err.message})

    }
    
})

router.post('/login',userByEmail, async function(req,res){
    const user = res.user
    try{
        if (await bcrypt.compare(req.body.password,user.password)){
            res.send('User Authentication is successful')
        } else {
            res.send('User authentication is failed')
        }


    } catch(err){
        res.status(400).json({message:err.message})
    }

})

async function userByEmail (req,res,next) {
    let user
    try{
        user = await User.findOne({email: req.body.email})
        if (user == null) {
            res.status(404).send("User with this email not found")
        }

    } catch (err) {
        res.status(500).json({message: err.message})
    }
    res.user = user
    next()
}



async function userByID (req,res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if (user == null){
            return res.status(404).json({message:"User not found"})
        }


    } catch (err) {
        return res.status(500).json({message:err.message})

    }
    res.user = user
    next()
}


module.exports = router