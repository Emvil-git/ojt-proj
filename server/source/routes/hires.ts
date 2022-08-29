import controller from '../controllers/hires';

module.exports = (app: any) => {
    app.get('/hires/get', controller.getAllHires);
    app.post('/hires/add', controller.createHire);
    app.post('/hires/delete', controller.delHire);
    app.post('/hires/update/refs', controller.updateHireRefs);
    app.post('/hires/update/docs', controller.updateHireDocs);
    app.post('/hires/update/events', controller.updateHireEvents);
    app.post('/hires/update/asset', controller.updateHireAsset);
    app.post('/hires/update/contact', controller.updateHireContact);

}

