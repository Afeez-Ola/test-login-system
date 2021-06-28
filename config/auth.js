// jshint esversion:10
module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/login');
        req.flash('error_msg', 'You need to log in to view this page');

        req.session.returnTo = req.originalUrl;
        res.redirect('/users/login');

    }
}