const User = require('../models/user')
exports.signup =  (req, res) => {
    const {firstName, lastName, email, password} = req.body
  
    // console.log(req.body)
    const _user = new User({
        firstName,
        lastName,
        email,
        password,
        userName: Math.random().toString()
    })

    try{
        _user.save()
        return res.status(201).json({
            message: "User created successfully" 
        })
    }catch(error){
        console.log(error)
        return res.status(400).json({
            message: 'Something went wrong'
        })
    }

   
    
}