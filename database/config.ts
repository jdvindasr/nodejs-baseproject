import mongoose from 'mongoose';
import logger from '../config/logger';

const NAMESPACE = 'DATABASE/CONFIG'
const mongoOpts = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN || '', mongoOpts);
        logger.info(NAMESPACE, 'Database connected');
    } catch (error) {
        logger.error(NAMESPACE, 'Database connected', error);
        // throw new Error('Error a la hora de iniciar la base de datos');
    }
}

export default {
    connect
};