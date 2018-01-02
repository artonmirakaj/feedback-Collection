const passport = require('passport');

module.exports = app => {
    // route handler
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    // route handler
    app.get('/auth/google/callback', passport.authenticate('google'));

    // logout route handler
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    // route handler
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};