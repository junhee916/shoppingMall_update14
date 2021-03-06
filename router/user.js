const express = require('express')
const userModel = require('../model/user')
const bcrypt = require('bcryptjs')
const router = express.Router()

// userInfo
router.get("/", (req, res) => {

    userModel
        .find()
        .then(users => {
            console.log(users)
            res.json({
                msg : "get users",
                count : users.length,
                userInfo : users.map(user => {
                    return{
                        id : user._id,
                        name : user.name,
                        email : user.email,
                        data : user.createdAt
                    }
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                msg : err.message
            })
        })
})

// 회원가입
router.post("/signup", (req, res) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
            return res.status(404).json({
                msg : err.message
            })
        }
        else{

            userModel
                .findOne({email : req.body.userEmail})
                .then(user => {
                    if(user){
                        return res.json({
                            msg : "user exited, please other email"
                        })
                    }
                    else{
                        const newUser = new userModel(
                            {
                                name : req.body.userName,
                                email : req.body.userEmail,
                                password : hash
                            }
                        )

                        newUser
                            .save()
                            .then(user => {
                                res.json({
                                    msg : "register user",
                                    userInfo : {
                                        id : user._id,
                                        name : user.name,
                                        email : user.email,
                                        data : user.createdAt
                                    }
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    msg : err.message
                                })
                            })
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        msg : err.message
                    })
                })
        }
    })


})

// 로그인

module.exports = router