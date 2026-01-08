const UserService = require('../services/user-server')

const userService = new UserService();

const create = async (req,res) => {
    try {
        const result = await userService.create({
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

const signIn = async (req,res) => {
    try {
        // console.log(req.body);
        const result = await userService.signIn(req.body.email,req.body.password);
        // console.log(" result is =" ,result)
        return res.status(200).json({
            success:true,
            data:result,
            message:"SignIn successfull",
            error:{}
        });
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong in SignIn controller',
            success:false,
            err:error,
            data:{}
        });
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.header['x-access-token'];
        const response = userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            err:{},
            data:response,
            message:"User is authenticated and token is valid"
        });
    } catch (error) {
        return res.status(500).json({
            message:'Something went wrong in isAuthenticated controller',
            success:false,
            err:error,
            data:{}
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
}