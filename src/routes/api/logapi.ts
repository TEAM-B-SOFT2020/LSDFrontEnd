// libraries
import { AnyARecord } from 'dns';
import * as express from 'express';
import fs from 'fs';

// classes, interfaces & functions
//import Contract from '../contract';
//import { IReservationSummary } from 'contract/src/dto/reservation';

//const contract = new Contract();

const router: express.Router = express.Router();

// middleware for json parsing
router.use(express.json());



// Get info log
router.get('/info', async (req, res) => {
	try {
        console.log(__dirname)
        fs.readFile("C:/Users/thoma/Documents/GitHub/LSDFrontEnd/logs/info.log", "utf8", function(err, data){
            if(err) throw err;
            res.send(data);
        });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});


// Get error log
router.get('/error', async (req, res) => {
	try {
        console.log(__dirname)
        fs.readFile("C:/Users/thoma/Documents/GitHub/LSDFrontEnd/logs/error.log", "utf8", function(err, data){
            if(err) throw err;
            res.send(data);
        });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});


export default router;