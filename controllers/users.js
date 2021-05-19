const User = require('../models/user');

module.exports.registrationForm = (req, res) => {
    res.render('users/register')
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({ email, username });
        const registeredUser =  await User.register(user, password)
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success','Welcome To MountainAir');
            res.redirect('/campgrounds');
        })       
    } catch(e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}

module.exports.loginPage =  (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Home');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout =  (req, res) => {
    req.logout();
    req.flash('success', "Bye Bye Bye");
    res.redirect('/campgrounds');
}