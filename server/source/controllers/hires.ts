import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = "Hires";

const createHire = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting hire');

    let { hireName, hireRole, hireDepartment, hireReportsTo, hireStartDate } = req.body;

     let query = `INSERT INTO hiretest (hireName, hireRole, hireDepartment, hireReportsTo, hireStartDate) VALUES ("${hireName}", "${hireRole}", "${hireDepartment}", "${hireReportsTo}", "${hireStartDate}")`;

    let queryInternal = "SELECT * FROM hiretest ORDER BY hireId DESC LIMIT 1;"

     console.log(req.body);
     console.log(query);

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
};

const updateHireRefs = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating hire refs');

    let { hireId, hireRefs } = req.body;

    console.log( hireRefs );

     let query = `UPDATE hiretest SET hireRefs = '${hireRefs}' WHERE hireId = (${hireId})`;
     let queryInternal = `SELECT hireRefs FROM hiretest WHERE hireId = ${hireId}`;

     console.log(req.body);
     console.log(query);

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
};

const updateHireDocs = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating hire docs');

    let { hireId, hireDocs } = req.body;

     let query = `UPDATE hiretest SET hireDocs = "${hireDocs}" WHERE hireId = (${hireId})`;
     let queryInternal = `SELECT hireDocs FROM hiretest WHERE hireId = ${hireId}`;

     console.log(req.body);
     console.log(query);

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
};

const updateHireAsset = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating hire docs');

    let { hireId, hireAsset } = req.body;

     let query = `UPDATE hiretest SET hireAsset = "${hireAsset}" WHERE hireId = (${hireId})`;
     let queryInternal = `SELECT hireAsset FROM hiretest WHERE hireId = ${hireId}`;

     console.log(req.body);
     console.log(query);

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
};

const updateHireEvents = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating hire docs');

    let { hireId, hireEventIds } = req.body;

     let query = `UPDATE hiretest SET hireEvents = '${hireEventIds}' WHERE hireId = (${hireId})`;
     let queryInternal = `SELECT hireEvents, hireId FROM hiretest WHERE hireId = ${hireId}`;

     console.log(req.body);
     console.log(query);

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
};

const updateHireContact = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Updating hire contacts');

    let { hireId, contactInfo } = req.body;

     let query = `UPDATE hiretest SET hireContact = '${contactInfo}' WHERE hireId = ${hireId}`;

     let queryInternal = `SELECT hireContact FROM hiretest WHERE hireId = ${hireId}`;

     console.log(req.body);
     console.log(query);

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
};

const getAllHires = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all hires');

    let query = "SELECT * FROM hiretest";

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

const delHire = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'deleting a hire');

    let { hireId } = req.body;

    let query = `DELETE FROM hiretest WHERE hireId = ${hireId}` ;

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



export default { getAllHires, createHire, updateHireRefs, updateHireDocs, updateHireEvents, updateHireAsset, updateHireContact, delHire };
