const { createUUID, validateUUID } = require("../../../utils/uuid");
const Logger = require("../../../utils/logger");
const { HttpStatusCode } = require("axios");
const TransactionService = require("../service/transaction");

class TransactionController {
    constructor() {
        this.transactionService = new TransactionService();
    }

    async transferMoney(req, res, next) {
        Logger.info("Transaction creation initiated...");

        try {
            const { fromAccount, toAccount, fromBankId, toBankId, amount, status } = req.body;

            if (!validateUUID(fromAccount)) throw new Error("Invalid 'from account' UUID.");
            if (!validateUUID(toAccount)) throw new Error("Invalid 'to account' UUID.");
            if (!validateUUID(fromBankId)) throw new Error("Invalid 'from bank' UUID.");
            if (!validateUUID(toBankId)) throw new Error("Invalid 'to bank' UUID.");
            if (!amount || typeof amount !== "number" || amount <= 0) {
                throw new Error("'amount' must be a positive number.");
            }

            const transactionId = createUUID();

            const response = await this.transactionService.transferMoney(
                transactionId,
                fromAccount,
                toAccount,
                fromBankId,
                toBankId,
                amount,
                status,
            );

            Logger.info("Transaction creation completed successfully.");
            return res.status(HttpStatusCode.Created).json({
                message: "Transaction created successfully.",
                data: response,
            });
        } catch (err) {
            Logger.error("Error during transaction creation:", err.message);

            const statusCode = err.statusCode || HttpStatusCode.BadRequest; 
            return res.status(statusCode).json({
                message: err.message || "An unexpected error occurred.",
            });

        }
    }
}

const transactionController = new TransactionController();
module.exports = transactionController;
