const { StatusCodes } = require('http-status-codes');
const BankService = require('./../service/bank');
const {setXTotalCountHeader} = require('../../../utils/response.js')

class BankController {
    constructor(){
        
    }

    async createBank (req, res, next){
        try{

        }catch(err){

        }
    }

    async getAllBanks (req, res, next){
        try{
            const {count, rows} = await BankService.getAllBanks();
            setXTotalCountHeader(res, count)
            res.status(StatusCodes.OK).json(rows)
        }catch(err){
            next(err)
        }
    }
}

module.exports = BankController;