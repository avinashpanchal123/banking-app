const Logger = require("../../../utils/logger")
const { transaction, commit, rollBack } = require('../../../utils/transaction');
const bankConfig = require("../../../model-config/bank-config");
const {
  parseSelectFields,
  parseLimitAndOffset,
  parseFilterQueries,
} = require("../../../utils/request");

class BankService {
  constructor() {

  }
  async createBank(id, bank_name, abbreviation, t) {
    if (!t) {
      t = await transaction();
    }

    try {
      Logger.info("create bank service started...");
      const response = await bankConfig.model.create(
        {
          id,
          bank_name,
          abbreviation,
        },
        { t }
      );

      await commit(t);
      Logger.info("create bank service ended...");
      return response;
    } catch (error) {
      await rollBack(t);
      Logger.error(error);
      throw error
    }
  }

  async getAllBanks(query, t) {
    if (!t) {
      t = await transaction();
    }

    try {
      Logger.info("get all banks service started...");
      //   let selectArray = parseSelectFields(query, bankConfig.fieldMapping);
      // if (!selectArray) {
      //   selectArray = Object.values(bankConfig.fieldMapping);
      // }

      //   const includeQuery = query.include || [];
      let association = [];
      //   if (includeQuery) {
      //     association = this.#createAssociations(includeQuery);
      //   }


      const { count, rows } = await bankConfig.model.findAndCountAll({
        // attributes: selectArray,
        // ...parseLimitAndOffset(query),
        // transaction: t,
        // ...parseFilterQueries(query, bankConfig.filters),
        // include: association,
      });
      commit(t);
      Logger.info("get all banks service ended...");
      return { count, rows };
    } catch (error) {
      await rollBack(t);
      Logger.error(error);
    }
  }
}


module.exports = BankService;