const { Op } = require("sequelize");
const Logger = require("../../../utils/logger");
const { transaction, rollBack, commit } = require("../../../utils/transaction");
const userConfig = require("../../../model-config/user-config");
const accountConfig = require("../../../model-config/account-config");
const bankConfig = require("../../../model-config/bank-config");
const transactionConfig = require("../../../model-config/transaction-config");

class TransactionService {
    async transferMoney(
        transactionId,
        fromAccount,
        toAccount,
        fromBankId,
        toBankId,
        amount,
        status,
        t
    ) {
        if (!transactionId || !fromAccount || !toAccount || !fromBankId || !toBankId || !amount) {
            throw new Error("Missing required parameters for transaction creation.");
        }

        let transactionInstance = t;

        try {
            if (!transactionInstance) {
                transactionInstance = await transaction();
            }

            const fromBank = await bankConfig.model.findOne({
                where: { id: fromBankId },
                transaction: transactionInstance,
            });
            if (!fromBank) {
                throw new Error(`Bank with ID ${fromBankId} does not exist.`);
            }

            const toBank = await bankConfig.model.findOne({
                where: { id: toBankId },
                transaction: transactionInstance,
            });
            if (!toBank) {
                throw new Error(`Bank with ID ${toBankId} does not exist.`);
            }

            const senderAccount = await accountConfig.model.findOne({
                where: {
                    account_no: fromAccount,
                    balance: { [Op.gte]: amount },
                },
                transaction: transactionInstance,
            });
            if (!senderAccount) {
                throw new Error("Insufficient balance in the sender's account.");
            }

            await accountConfig.model.update(
                { balance: senderAccount.balance - amount },
                {
                    where: { account_no: fromAccount },
                    transaction: transactionInstance,
                }
            );

            await accountConfig.model.increment(
                { balance: amount },
                {
                    where: { account_no: toAccount },
                    transaction: transactionInstance,
                }
            );

            await transactionConfig.model.create(
                {
                    transaction_id: transactionId,
                    from_account: fromAccount,
                    to_account: toAccount,
                    from_bank: fromBankId,
                    to_bank: toBankId,
                    amount,
                    status,
                },
                { transaction: transactionInstance }
            );

            await commit(transactionInstance);

            Logger.info(`Transaction ${transactionId} completed successfully.`);
        } catch (error) {
            rollBack(error)
            if (transactionInstance) {
                await rollBack(transactionInstance);
            }
            Logger.error("Transaction failed: ", error);
            throw error;
        }
    }
}

module.exports = TransactionService;
