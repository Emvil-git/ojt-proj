import controller from '../controllers/references';

module.exports = (app: any) => {
    app.get('/refs/get', controller.getAllRefs);
    app.post('/refs/add', controller.createRef);
    app.post('/refs/delete', controller.delRef);
    app.post('/refs/verify', controller.verifyRef);
} 

