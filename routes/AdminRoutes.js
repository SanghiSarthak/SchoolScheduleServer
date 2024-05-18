const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Admin = require('../database/schema/adminUserSchema');
const LocalStrategy = require('passport-local');
const passport = require('passport');
const { isAdmin } = require('../helper/helper');
require('../helper/passportConfig');


router.post('/register', async (req, res) => {
    try {
        const { email, password, name, isAdmin, isUser } = req.body;
        if (!email || !password || !name) {
            res.status(400).send('All fields are required');
        }
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            email,
            password: hashedPassword,
            isAdmin: isAdmin,
            isUser: (isAdmin) ? true : isUser,
            name: name
        });
        await newAdmin.save();
        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
})


router.post('/registeruser', isAdmin, async (req, res) => {
    res.send("Registered User")
})



router.post('/user', isAdmin , async (req, res) => {
    const { email } = req.body;
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
        return res.status(200).json(existingUser);
    }
    else {
        return res.status(200).send("No such user found");
    }
})



router.post('/login', passport.authenticate('local', {
    successRedirect: "/colleges/home",
    failureRedirect: '/admin/logind'
}), (req, res) => {
    // console.log("logged in");
    // res.redirect("/colleges/home");
}
);


router.get('/logind', (req, res,) => {
    res.send("Login Page");
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout(()=>{
        res.redirect('/admin/logind');
    });
   
});




module.exports = router;