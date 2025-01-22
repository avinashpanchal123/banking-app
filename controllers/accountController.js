const db = require("./../models/index");
const Acccount = db.Acccount;



const getAllAccounts = async (req, res) => {
    try {
        let account_list = await Acccount.findAll({
            where: {
                user_id: 1
            }
        })
        
        res.status(200).json(account_list)
    } catch (err) {
        console.error('Error fetching accounts:', err);
    }
}

const addAccount = async (req, res) => {
    try {
        let { firstName, lastName, email, contact_no } = req.body;
       

        const newuser = await user.create({ firstName: firstName, lastName: lastName, email: email, contact_no: contact_no });
       
    } catch (err) {
        console.error('Error adding account:', err);
    }
};



const deleteAccount = async(req, res)=>{
    try{
        const {id} = req.body;

        const deleted = await Acccount.destroy({
            where: {
                id: id
            }
        })
        if (!!deleted) {
            res.status(200).json({ message: 'account deleted successfully' });
        } else {
            res.status(404).json({ message: 'account not found' });
        }
    }catch(err){
        console.error('Error deleting account:', err);
    }
}

module.exports = {
    getAllAccounts,
    addAccount,
    deleteAccount
}