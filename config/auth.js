// jshint esversion:10
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');

            return next()

        } else {
            req.flash('error_msg', 'You need to log in to view this page');
            res.redirect('/users/login');
        }


    }
}