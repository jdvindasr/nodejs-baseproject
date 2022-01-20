import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import i18next from 'i18next';
import i18Backend from 'i18next-fs-backend';   
import i18middleware from 'i18next-http-middleware'; 

import businessRoutes from './routes/business';
import brandRoutes from './routes/brand';
import logger from './config/logger';
import database from './database/config';

class Server {
    private NAMESPACE = 'Server';
    private app: express.Application;
    private port: string;
    private apiPaths = {
        business: '/api/business',
        brand: '/api/brand',
    };
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.database();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Body defination
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //Public
        this.app.use(express.static('public'));
        //Filter
        this.filter();   
        //Error handler
        // this.errorHandler();
        //Translator
        this.languages();
    }

    routes() {
        this.app.use(this.apiPaths.business, businessRoutes);
        this.app.use(this.apiPaths.brand, brandRoutes);
    }

    listen() {
        this.app.listen(this.port, ()=> {
            logger.info(this.NAMESPACE, `Server online. Port ${this.port}`)
        });
    }

    async database() {
        await database.connect();
    }

    filter() {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            //Request
            logger.info(this.NAMESPACE, `method: [${req.method}] - url: [${req.url}] - ip: [${req.socket.remoteAddress}] - data: [${JSON.stringify(req.body)}]`);
        
            res.on('finish', () => {
                //Response
                logger.info(this.NAMESPACE, `method: [${req.method}] - url: [${req.url}] - status: [${res.statusCode}] - ip: [${req.socket.remoteAddress}]`);
            })
            
            next();
        });
    }

    errorHandler() {
        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const error = new Error('Not found');
            res.status(404).json({
                message: error.message
            });
        });
    }

    languages() {
        i18next.use(i18Backend).use(i18middleware.LanguageDetector)
        .init({
            fallbackLng: 'en',
            backend: {
                loadPath: './translation/{{lng}}/file.json'
            }
        });

        this.app.use(i18middleware.handle(i18next));
    }

    // rules() {
    //     this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    //         res.header('Access-Control-Allow-Origin', '*');
    //         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    //         if (req.method == 'OPTIONS') {
    //             res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    //             return res.status(200).json({});
    //         }

    //         next();
    //     });
    // }
}

export default Server;