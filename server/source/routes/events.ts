import controller from '../controllers/events';

module.exports = (app: any) => {
    app.get('/events/get', controller.getAllEvents);
    app.post('/events/create', controller.createEvent);
    app.post('/events/delete', controller.delEvent);
}
