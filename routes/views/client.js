module.exports = function(app) {
    app.get('/', function(req, res) {
        console.log(req.user);
        res.render('client/index', {
            title: 'Postit',
            user: req.user
        });
    });
}