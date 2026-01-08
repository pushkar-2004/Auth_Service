const {User} = require('../models/index');

class UserRepository {

    async create(data){
        try {
            const result = await User.create(data);
            return result;
        } catch (error) {
            console.log("Something went wrong inside the user repo create");
            throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong inside the user repo destroy");
            throw error;
        }
    }

    async getById(userId){
        try {
            const result = await User.findByPk(userId,{
                attributes:['email','id']
            });
            return result;
        } catch (error) {
            console.log("Something went wrong in reposirory");
            throw error;
        }
    }

};

module.exports = UserRepository;