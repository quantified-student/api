import {Request, Response, NextFunction} from 'express';
import QsApi from "../dataSources/qs-api/qs-api";
import request from "request";


export default async function dataSharingMiddleware(req: Request, res: Response, next: NextFunction) {
    const _qsApi = new QsApi();
    // Get the user token from the headers
    const token = req.headers.authorization;
    console.log(req)

    if(!token) res.status(401).send('No token provided').end();

    console.log(token)
    // Send a request to the qs-api to get the user's data
    const options = {
        url: 'https://fhict.instructure.com/api/v1/users/self',
        headers: {
            'Authorization': token
        }
    }

    await request(options, (err: any, res: any) => {
        console.log(res.body)
        const user = res.body.user;
        // If the user is not found, return a 401
        if(!user.id) res.status(401).send('Invalid token').end();

        // Add the user id to the request object
        req.body.userId = user.id;

        // Check if user exists in the database
        _qsApi.getUserFromDatabase(Number(user.id)).then((user: any) => {
            req.body.user = user;
            if(user) {
                console.log(user);
                // User exists, just continue
                next();
            }
            // User does not exist, create a new user

        });
        // If not, create a new user

    });

    next();
}