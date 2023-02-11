const Router = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Auth',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    });
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
                const user = candidate;
                req.session.user = user;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/');
                })
            } else {
                req.flash('loginError', 'Wrong password')
                res.redirect('/auth/login#login');
            }
        } else {
            req.flash('loginError', 'User does not exist')
            res.redirect('/auth/login#login');
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const {email, password, confirm, name} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            req.flash('registerError', 'User already exists');
            res.redirect('/auth/login#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({email, name, password: hashPassword, cart: {items: []}});
            await user.save();
            res.redirect('/auth/login#login');
        }
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;