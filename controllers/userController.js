const db = require("./../models/index");
const User = db.User;



const getAllUsers = async (req, res) => {
    try {
        console.log(">>>>>>>>>>>>",db.User);
        
        let UserList = await User.findAll({
            
        })
        
        res.status(200).json(UserList)
    } catch (err) {
        console.error('Error fetching Users:', err);
    }
}

const addUser = async (req, res) => {
    try {
        let { firstName, lastName, email } = req.body;
       

        const newUser = await User.create({ firstName, lastName, email});
        res.status(201).json({
            newUser
        });
    } catch (err) {
        console.error('Error adding User:', err);
    }
};



const deleteUser = async(req, res)=>{
    try{
        const {id} = req.body;

        const deleted = await User.destroy({
            where: {
                id: id
            }
        })
        if (!!deleted) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(err){
        console.error('Error deleting User:', err);
    }
}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser
}