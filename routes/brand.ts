import { Router } from 'express';
import { check } from 'express-validator';

import { list, get, add, update } from '../controllers/brand';
import { validateFields } from '../middlewares/requestValidators';
import { isBrandIdValid, isBrandNameValid } from '../helpers/dbValidators/brand';
import { isBusinessIdValid } from '../helpers/dbValidators/business';

const router = Router();

router.get('/', list);

router.get('/:id',  
[
    check('id','general_invalidId').isMongoId(),
    check('id').custom(isBrandIdValid),
    validateFields
],
get);

router.put('/:id',  
[
    check('id','general_invalidId').isMongoId(),
    check('id').custom(isBrandIdValid),
    check('active', 'brand_activeWrongFormat').isBoolean(),
    validateFields
],
update);

router.post('/',
[
    check('name', 'brand_namerequiered').notEmpty(),
    check('name').custom(isBrandNameValid),
    check('business').isMongoId(),
    check('business').custom(isBusinessIdValid),
    validateFields
],
add);

//router.delete('/:id',delete)

export default router;