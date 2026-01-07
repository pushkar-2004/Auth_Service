const UserService = require('../services/user-server')

const userController = new UserService();

const create = async (req,res) => {
    try {
        const result = await userController.create({
            email:req.body.email,
            password:req.body.password
        });
        // const user = result.toJSON();
        delete result.password;
        return res.status(201).json({
            data:result,
            success:true,
            message:"Successfully created a new use",
            error:{},
        });
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong',
            success:false,
            err:error,
            data:{}
        });
    }
}

module.exports = {
    create,
}