const User = require('../../models/user')
const jwt = require('jsonwebtoken')
exports.signup =  (req, res) => {
    const {firstName, lastName, email, password} = req.body
  
    const exists = User.findOne({email: email}, function (error, data){
        console.log("Entered")
        if(error){
            console.log("Entered in error")
            return res.status(400).send("Not founded")
        }else if(data) {
            console.log("Entered in data")
            console.log(data)
            return res.status(400).json({message: "Admin already Registered"})
        }else{
            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString(),
                role: 'admin'
            })
        
            try{
                _user.save()
                return res.status(201).json({
                    message: "Admin created successfully" 
                })
            }catch(error){
                console.log(error)
                return res.status(400).json({
                    message: 'Something went wrong'
                })
            }
        }
    } )
    
}

exports.signin = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(error) return res.status(400).json({error})
        if(user){
            if(user.authenticate(req.body.password) && user.role === 'admin'){
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
                const { _id, firstName, lastName, email, role, fullName} = user
                res.status(200).json({
                    token,
                    user: { _id, firstName, lastName, email, role, fullName }
                })
            }else{
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        }else{
            return res.status(400).json( {message: 'Something went wrong'})
        }
    })
}

exports.requireSignin = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    console.log(token)
    next()
}