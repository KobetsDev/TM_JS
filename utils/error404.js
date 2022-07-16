export default (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.render('404', {
            url: 'http://' + req.headers.host + req.url,
            title: 404
        });
        return;
    }
    if (req.accepts('json')) {
        res.json({ error: 'Page not found' });
        return;
    }
    res.type('txt').send('Page not found');
}