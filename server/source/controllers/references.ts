import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = "Refs";

const createRef = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating reference');

    let { 
        refHireId,
        refType,
        refName,
        refInst,
        refNumber,
        refIsContacted,
     } = req.body;

     let query = `INSERT INTO referencetest (refHireId, refType, refName, refInst, refNumber, refIsContacted) VALUES ("${refHireId}", "${refType}", "${refName}", "${refInst}", "${refNumber}", "${refIsContacted}")` ;

     let queryInternal = 'SELECT * FROM referencetest ORDER BY refId DESC LIMIT 1;'

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

const getAllRefs = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all refs');

    let query = "SELECT * FROM referencetest";

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


const delRef = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'deleting a reference');

    let { refId } = req.body;

    let query = `DELETE FROM referencetest WHERE refId = ${refId}` ;

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

const verifyRef = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'verifying a reference');

    let { refId } = req.body;

    let query = `UPDATE referencetest SET refIsContacted = 1 WHERE refId = ${refId}` ;

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

export default { getAllRefs, createRef, delRef, verifyRef};
