const db = require("./../../models");

const transaction = async ()=>{
   return  await db.sequelize.transaction();
}

const commit = async (transactionObj)=>{
    return await transactionObj.commit()
}

const rollBack = async (transactionObj)=>{
    return await transactionObj.rollback()
}


module.exports = {
    transaction,
    commit,
    rollBack
}