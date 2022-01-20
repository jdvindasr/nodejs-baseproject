import express from 'express';
import { validationResult } from 'express-validator';

const validateFields = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(err => {
            err.msg = req.t(err.msg);
        });
        return res.status(400).json(errors);
    }
    next();
}

export  {
    validateFields
};
