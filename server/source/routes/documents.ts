import controller from '../controllers/documents';

module.exports = (app: any) => {
    app.get('/docs/get', controller.getAllDocs);
    app.post('/docs/add', controller.createDoc);
    app.post('/docs/delete', controller.delDoc);
    app.post('/docs/verify', controller.verifyDoc);

} 