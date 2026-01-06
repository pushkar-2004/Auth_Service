const UserRepository = require('../repository/user-repository');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const result = await this.userRepository.create(data);
            return data;
        } catch (error) {
            console.log("something went wrong inside the service layer");
            throw error;
        }
    }

};

module.exports = UserService;