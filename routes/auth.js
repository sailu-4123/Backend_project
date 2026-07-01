const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{
    const hashed = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
        email: req.body.email,
        password: hashed
    });
    res.send(user);
});

router.post('/login', async (req,res)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.send("User not found");

    const match = await bcrypt.compare(req.body.password, user.password);
    if(!match) return res.send("Wrong password");

    const token = jwt.sign({id:user._id, role:user.role}, "secret");
    res.send({token});
});

module.exports = router;