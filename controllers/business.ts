import { Request, Response } from 'express';
import Business from '../models/business';

const list = async(req: Request, res: Response) => {
    //Promise defination
    const promBusinness = Business.find();
    const promCount = Business.countDocuments();
    //Call at same time and wait until all end
    const [total, business] = await Promise.all([
        promBusinness,
        promCount
    ]);
    
    res.json({
        business,
        total
    });
};

const get = async(req: Request, res: Response) => {
    const { id } = req.params;
    const business = await Business.findById(id);
    res.json({
        business
    });
};

const add = async (req: Request, res: Response) => {
    const { body } = req;
    body.active = true;
    const business = new Business(body);

    await business.save();
    
    res.json({
        msg: req.t('business_successAdd'),
        business
    });
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const business = await Business.findByIdAndUpdate(id, body);
    
    res.json({
        msg: req.t('business_successUpdate'),
        business
    });
};

export {
    list,
    get,
    add,
    update
};