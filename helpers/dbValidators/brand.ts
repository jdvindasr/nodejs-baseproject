import Brand from '../../models/brand';

const isBrandNameValid = async(name = '') => {
    const validation = await Brand.findOne( { name } );
    if(validation) { 
        throw new Error('brand_allreadyExits');
    }
};

const isBrandIdValid = async( id: number ) => {
    const validation = await Brand.findById( { id } );
    if(!validation) { 
        throw new Error('general_idNotExits');
    }
};

export {
    isBrandNameValid,
    isBrandIdValid
};