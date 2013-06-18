module.exports = function(app) {
    app.get('/admin', function(req, res) {
        console.log(req.user);
        res.render('admin/index', {
            title: 'Postit admin',
            session: req.user
        });
    });

    app.get('/admin/articles', function(req, res) {
        console.log(req.user);
        res.render('admin/index', {
            title: 'Postit admin',
            session: req.user
        });
    });

    app.get('/admin/articles/:id', function(req, res) {
        console.log(req.user);
        res.render('admin/index', {
            title: 'Postit admin',
            session: req.user
        });
    });
}