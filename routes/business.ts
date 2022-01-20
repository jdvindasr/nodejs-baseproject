import { Router } from 'express';
import { check } from 'express-validator';

import { list, get, add, update } from '../controllers/business';
import { validateFields } from '../middlewares/requestValidators';
import { isBusinessNameValid, isBusinessIdValid} from '../helpers/dbValidators/business';

const router = Router();

router.get('/', list);

router.get('/:id',  
[
    check('id','general_invalidId').isMongoId(),
    check('id').custom(isBusinessIdValid),
    validateFields
],
get);

router.put('/:id',  
[
    check('id','general_invalidId').isMongoId(),
    check('id').custom(isBusinessIdValid),
    check('active', 'business_activeWrongFormat').isBoolean(),
    validateFields
],
update);

router.post('/',
[
    check('name', 'business_namerequiered').notEmpty(),
    check('name').custom(isBusinessNameValid),
    validateFields
],
add);

//router.delete('/:id',delete)

export default router;