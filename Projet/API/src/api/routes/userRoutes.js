module.exports = function(app, routeController) {
    app.route('/users')
        .get((req, res) => { res.status(200).send([ { name : 'Adrien Buet'}]) })
        .post(() => { throw new Error('Veuillez implémenter cette fonctionnalité !!!!'); });
}