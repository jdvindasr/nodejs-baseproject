import { Request, Response } from 'express';
import Brand from '../models/brand';

const list = async(req: Request, res: Response) => {
    //Promise defination
    const promBusinness = Brand.find();
    const promCount = Brand.countDocuments();
    //Call at same time and wait until all end
    const [total, brand] = await Promise.all([
        promBusinness,
        promCount
    ]);
    
    res.json({
        brand,
        total
    });
};

const get = async(req: Request, res: Response) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.json({
        brand
    });
};

const add = async (req: Request, res: Response) => {
    const { body } = req;
    body.active = true;
    const brand = new Brand(body);

    await brand.save();
    
    res.json({
        msg: req.t('brand_successAdd'),
        brand
    });
};

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const brand = await Brand.findByIdAndUpdate(id, body);
    
    res.json({
        msg: req.t('brand_successUpdate'),
        brand
    });
};

export {
    list,
    get,
    add,
    update
};