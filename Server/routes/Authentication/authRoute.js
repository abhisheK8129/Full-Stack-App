const express = require('express')
const { registerTheUser, loginTheUser, logoutTheUser, authMiddleware } = require('../../Controllers/Authentication')
const route = express.Router()



route.post('/register',registerTheUser)
route.post('/login', loginTheUser)
route.post('/logout',logoutTheUser)
route.get('/check-auth', authMiddleware, (req,res)=>{
    const user = req.user
    res.status(200).json({
        success: true,
        message: 'User is authorized',
        user
    })
})



module.exports = route