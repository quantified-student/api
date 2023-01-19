import {Request, Response, NextFunction} from 'express';
import request from "request";
import * as process from "process";


export default async function dataSharingMiddleware(req: Request, original_res: Response, next: NextFunction) {
    // Get the user token from the headers
    const token = req.headers.authorization;
    console.log(token)
    if(!token) original_res.status(401).end('No token provided');

    // Send a request to the qs-api to get the user's data
    const options = {
        url: 'https://fhict.instructure.com/api/v1/users/self',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    request(options, async (err: any, res: any) => {
        if (err)
            original_res.status(500).end('Something went wrong');
        const user = JSON.parse(res.body);
        // If the user is not found, return a 401
        if (!user?.id)
            original_res.status(401).end('Invalid token');
        // Add the user id to the request object
        req.body.userId = user.id;

        options.url = process.env.QS_API_URL + `users/${user.id}`;
        // Check if user exists in the database
        await request(options, async (err: any, res: any) => {
            const qsUser = res.body;
            req.body.qsUser = qsUser;

            if (qsUser) {
                // User exists, just continue
                next();
            }
            // User does not exist, create a new user
            console.log("No user");
            next();
        });
    });

    next();
}