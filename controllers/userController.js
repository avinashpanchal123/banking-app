const db = require("./../models/index");
const User = db.User;



const getAllUsers = async (req, res) => {
    try {
        console.log(">>>>>>>>>>>>",db.User);
        
        let userList = await User.findAll({
            where: {
                user_id: 1
            }
        })
        
        res.status(200).json(userList)
    } catch (err) {
        console.error('Error fetching categories:', err);
    }
}

const addUser = async (req, res) => {
    try {
        let { firstName, lastName, email, contact_no } = req.body;
       

        const newuser = await user.create({ firstName: firstName, lastName: lastName, email: email, contact_no: contact_no });
        res.status(201).json({
            id: newuser.id,
            name : newuser.user_name,
            type : newuser.user_type
        });
    } catch (err) {
        console.error('Error adding user:', err);
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
            res.status(200).json({ message: 'user deleted successfully' });
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    }catch(err){
        console.error('Error deleting user:', err);
    }
}

module.exports = {
    getAllUsers,
    addUser,
    deleteUser
}