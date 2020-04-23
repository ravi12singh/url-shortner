import * as express from 'express';
const winston = require('winston');
const ShortUrl = require('../models/shortUrl');

class Api {
    public app;
    public logger;
    private message: String = 'URL Sent';
    private status: String = 'Success';

    constructor() {
        this.app = express();
        this.mountRoutes();
        this.logger = winston.createLogger({
            level: 'info',
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'combined.log'})
            ]
        });
    }

    private mountRoutes(): void {
        const router = express.Router();
        router.get('/getData', async (req, res, err) => {
            try {
                const shortUrls = await ShortUrl.find();
                res.json({message: this.message, data: {shortUrls: shortUrls}});
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'An error occurred trying to process your request',
                });
            }
        });
        router.post('/shortenUrl', async (req, res) => {
            try {
                const fullUrl = await ShortUrl.findOne({full: req.body.full});
                if (fullUrl == null) {
                    const createUrl = await  ShortUrl.create({full: req.body.full, short: req.body.short});
                    res.json({status: this.status, data: createUrl});
                    this.logger.log({level: 'URL Info', data: createUrl});
                    this.logger.info('New URL Added' + new Date());
                } else {
                    res.json({message: 'URL Already Exists'});
                    this.logger.log({level: 'URL Info', data: fullUrl});
                    this.logger.info('URL Already Exists' + new Date());
                }
            } catch (error) {
                this.logger.log({level: 'error', error: error});
                this.logger.error('error' + new Date());
            }
        });
        router.get('/shortUrls', async (req, res) => {
            try {
                const shortUrl = await ShortUrl.findOne({short: req.query.short});
                if (shortUrl == null) {
                    res.status(404).send({error: false, message: 'Error'});
                }
                shortUrl.clicks++;
                shortUrl.save();
                res.json({Status: this.status, data: shortUrl});
            } catch (error) {
                this.logger.log({level: 'error', error: error});
                this.logger.error('error' + new Date());
            }
        });
        module.exports = router;
    }
}
export default new Api().app;

