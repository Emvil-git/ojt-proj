import controller from '../controllers/assets';

module.exports = (app:any) => {
    app.get('/assets/get', controller.getAllAssets);
    app.post('/assets/create', controller.createAsset);
    app.post('/assets/delete', controller.delAsset);
    app.post('/assets/updateHire', controller.updateAssetHire);
    app.post('/assets/updateProgram', controller.updateAssetProgram);
    app.post('/assets/installProgram', controller.installProgram);
} 