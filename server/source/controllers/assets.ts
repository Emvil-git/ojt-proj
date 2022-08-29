import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = "Assets";

const createAsset = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating assets');

    let { 
        assetName,
        assetPrograms,
     } = req.body;

     let query = `INSERT INTO assettest (assetName, assetPrograms) VALUES ("${assetName}", "${assetPrograms}")` ;

     Connect()
     .then(connection => {
         Query(connection, query)
         .then(result => {
             return res.status(200).json({
                 result
                 
             });
         })
         .catch(error => {
             logging.error(NAMESPACE, error.message, error);
 
             return res.status(500).json({
             message: error.message,
             error
             })
         })
         .finally(() => {
             connection.end();
         })
     })
     .catch(error => {
         logging.error(NAMESPACE, error.message, error);
 
         return res.status(500).json({
             message: error.message,
             error
         })
     })
}

const updateAssetProgram = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Adding program to/ Updating program on an asset');

    let { 
        assetId,
        assetPrograms,
     } = req.body;

     let query = `UPDATE assettest SET assetPrograms = '${assetPrograms}' WHERE assetId = ${assetId}`;
     let queryInternal = `SELECT assetPrograms FROM assettest WHERE assetId = ${assetId}` ;

     Connect()
     .then(connection => {
         Query(connection, query)
         .then(result => {
            Query(connection, queryInternal).then(results => {
                return res.status(200).json({
                    results
                });
            })
            .catch(error => {
                logging.error(NAMESPACE, error.message, error);
    
                return res.status(500).json({
                message: error.message,
                error
                })
            })
            .finally(() => {
                connection.end();
            })
         })
         .catch(error => {
             logging.error(NAMESPACE, error.message, error);
 
             return res.status(500).json({
             message: error.message,
             error
             })
         })
         .finally(() => {
             connection.end();
         })
     })
     .catch(error => {
         logging.error(NAMESPACE, error.message, error);
 
         return res.status(500).json({
             message: error.message,
             error
         })
     })
}

const updateAssetHire = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating asset hire');

    let { 
        assetId,
        assetHireId,
     } = req.body;

     let query = `UPDATE assettest SET assetHireId = ${assetHireId} WHERE assetId = ${assetId}` ;

     let queryInternal = `SELECT * FROM assettest WHERE assetId = ${assetId}` ;

     Connect()
     .then(connection => {
         Query(connection, query)
         .then(result => {
            Query(connection, queryInternal).then(results => {
                return res.status(200).json({
                    results
                });
            })
            .catch(error => {
                logging.error(NAMESPACE, error.message, error);
    
                return res.status(500).json({
                message: error.message,
                error
                })
            })
            .finally(() => {
                connection.end();
            })
         })
         .catch(error => {
             logging.error(NAMESPACE, error.message, error);
 
             return res.status(500).json({
             message: error.message,
             error
             })
         })
         .finally(() => {
             connection.end();
         })
     })
     .catch(error => {
         logging.error(NAMESPACE, error.message, error);
 
         return res.status(500).json({
             message: error.message,
             error
         })
     })
}

const getAllAssets = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all assets');

    let query = "SELECT * FROM assettest";

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
                results
            });
        })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
            message: error.message,
            error
            })
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
};

const delAsset = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'deleting an asset');

    let { assetId } = req.body;

    let query = `DELETE FROM assettest WHERE assetId = ${assetId}` ;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json({
                results
            });
        })
        .catch(error => {
            logging.error(NAMESPACE, error.message, error);

            return res.status(500).json({
            message: error.message,
            error
            })
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(error => {
        logging.error(NAMESPACE, error.message, error);

        return res.status(500).json({
            message: error.message,
            error
        })
    })
};

const installProgram = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'installing program');

    let { 
        assetId,
        assetPrograms,
     } = req.body;

     let query = `UPDATE assettest SET assetPrograms = '${assetPrograms}' WHERE assetId = ${assetId}` ;

     Connect()
     .then(connection => {
         Query(connection, query)
         .then(result => {
             return res.status(200).json({
                 result
                 
             });
         })
         .catch(error => {
             logging.error(NAMESPACE, error.message, error);
 
             return res.status(500).json({
             message: error.message,
             error
             })
         })
         .finally(() => {
             connection.end();
         })
     })
     .catch(error => {
         logging.error(NAMESPACE, error.message, error);
 
         return res.status(500).json({
             message: error.message,
             error
         })
     })
};

export default { getAllAssets, createAsset, updateAssetHire, updateAssetProgram, delAsset, installProgram };
