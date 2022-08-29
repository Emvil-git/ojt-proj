import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = "Documents";

const createDoc = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating document');

    let { 
        docTitle,
        docHireId,
        docType,
        docDate,
        docSize,
        docIsVerified,
     } = req.body;

     let query = `INSERT INTO doctest (docTitle, docHireId, docType, docDate, docSize, docIsVerified) VALUES ("${docTitle}", "${docHireId}", "${docType}", "${docDate}", "${docSize}", "${docIsVerified}")` ;

     let queryInternal = "SELECT * FROM docTest ORDER BY docId DESC LIMIT 1;"

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

const getAllDocs = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all documents');

    let query = "SELECT * FROM doctest";

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

const delDoc = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'deleting an document');

    let { docId } = req.body;

    let query = `DELETE FROM doctest WHERE docId = ${docId}` ;

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

const verifyDoc = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'verifying a document');

    let { docId } = req.body;

    let query = `UPDATE doctest SET docIsVerified = 1 WHERE docId = ${docId}` ;

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

export default { getAllDocs, createDoc, delDoc, verifyDoc };
