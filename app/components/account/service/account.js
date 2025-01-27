const Logger = require("../../../utils/logger");
// const NotFoundError = require("../../../errors/notFoundError");
const { transaction, rollBack, commit } = require("../../../utils/transaction");
// const sendEmail = require("../../../utils/email");
const userConfig = require("../../../model-config/user-config");
const accountConfig = require("../../../model-config/account-config");
const bankConfig = require("../../../model-config/bank-config");
// const badRequest = require("../../../errors/badRequest");
const { createUUID } = require("../../../utils/uuid");
const {
  parseSelectFields,
  parseLimitAndOffset,
  parseFilterQueries,
} = require("../../../utils/request");

class AccountService{
    async createAccount(id, user_id, bank_id, t) {
        if (!t) {
          t = await transaction();
        }
        try {
          Logger.info("create account service started...");
          const user = await userConfig.model.findOne({
            where: { id: user_id },
            transaction: t,
          });
          if (!user) {
            throw new NotFoundError(`User with id ${user_id} does not exist.`);
          }
          const bank = await bankConfig.model.findOne({
            where: { id: bank_id },
            transaction: t,
          });
    
          if (!bank) {
            throw new NotFoundError(`Bank with id ${bank_id} does not exist.`);
          }
    
          const bank_name = bank.bank_name;
          let balance = 1000;
          const newAccount = await accountConfig.model.create(
            {
              id,
              user_id: user.id,
              bank_id: bank.id,
              bank_name,
              balance,
            },
            { transaction: t }
          );
    
          await commit(t);
          Logger.info("create account service ended...");
          // await sendEmail(
          //   user.email,
          //   "Account Created",
          //   `Hi ${user.name}! Your account has been successfully created in ${bankName}. Your account id is - ${id}`
          // );
          return newAccount;
        } catch (error) {
          await rollBack(t);
          Logger.error(error);
          throw error;
        }
      }
}

module.exports = AccountService;