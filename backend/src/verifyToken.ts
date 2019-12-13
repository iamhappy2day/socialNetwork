const jwt = require('jsonwebtoken');
import {Request, Response, NextFunction} from 'express';

//we can add this middleware function to any route we want to make it private(protected)
// we don't want them to access it without having this token
//we are gonna add this function before every private route to check if this token is avalible

 export const verifyToken = function (req: any, res: Response, next: NextFunction) {

    if(!req.headers.authorization)
        return res.status(401).send('Access Denied. Authorize please');

    let token = req.headers.authorization.split(' ')[1]; //bearer из 0 index and actual token из 1 index
    if( token === 'null') {
        return res.status(401).send('Access Denied. Authorize please')
    }
    // But if we have a token we can verify it

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    if(!verified) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = verified.subject;
    next();
};

