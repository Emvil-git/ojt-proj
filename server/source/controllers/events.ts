import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';

const NAMESPACE = "Events";

const createEvent = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Creating event');

    let { 
        eventName,
        eventDate,
        eventPlatform,
        eventLink,
        eventParticipants,
     } = req.body;

     let query = `INSERT INTO eventtest (eventName, eventDate, eventPlatform, eventLink, eventParticipants) VALUES ("${eventName}", "${eventDate}", "${eventPlatform}", "${eventLink}", "${eventParticipants}")` ;

     let queryInternal = "SELECT * FROM eventtest ORDER BY eventId DESC LIMIT 1;"

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

const getAllEvents = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all events');

    let query = "SELECT * FROM eventtest";

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

const delEvent = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'deleting an event');

    let { eventId } = req.body;

    let query = `DELETE FROM eventtest WHERE eventId = ${eventId}` ;

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

export default { getAllEvents, createEvent, delEvent };
