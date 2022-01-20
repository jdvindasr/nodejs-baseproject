import Business from '../../models/business';

const isBusinessNameValid = async(name = '') => {
    const validation = await Business.findOne( { name } );
    if(validation) { 
        throw new Error('business_allreadyExits');
    }
};

const isBusinessIdValid = async( id: number ) => {
    const validation = await Business.findById( { id } );
    if(!validation) { 
        throw new Error('general_idNotExits');
    }
};

export {
    isBusinessNameValid,
    isBusinessIdValid
};