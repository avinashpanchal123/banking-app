const userConfig = require('../../../model-config/user-config');
const { transaction, commit, rollBack } = require('../../../utils/transaction');
const Logger = require('../../../utils/logger')

class UserService {
    async createUser(id, full_name, username, email, t) {
        if (!t) {
          t = await transaction();
        }
    
        try {
          Logger.info("create user service started...");
    
          let response = await userConfig.model.create(
            {
              id,
              full_name,
              username,
              email,
            },
            { t }
          );
    
          await commit(t);
          Logger.info("create user service ended...");
    
          return response;
        } catch (error) {
          await rollBack(t);
          Logger.error(error);
        }
      }

    async getAllUsers(query, t) {
        if (!t) {
            t = await transaction();
        }
        try {
            Logger.info("get all users service started...");

            const { count, rows } = await userConfig.model.findAndCountAll();
            commit(t);

            Logger.info("get all users service ended...");

            return { count, rows };
        } catch (err) {
            rollBack(t);
            Logger.error(err)
        }
    }
}

module.exports = UserService;