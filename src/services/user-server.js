const jwt = require('jsonwebtoken');
const { JWT_AUTH } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');
const bcrypt = require('bcrypt');


class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const result = await this.userRepository.create(data);
            return result;
        } catch (error) {
            console.log("something went wrong inside the service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            // console.log(user);
            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("Passwords do not match");
                throw {error:"Incorrect password"};
            }
            const newJWT = this.createToken({email:user.email,id:user.id});
            // console.log(newJWT);
            return newJWT;
        } catch (error) {
            console.log("Something went wrong in the sign In process");
            throw error
        }
    }

    async isAuthenticated(token){
        try {
            const response = this.verifyToken(token);
            if(!response){
                throw {error:"Invalid token"};
            }
            const user = await this.userRepository.getById(response.id);
            if(!user){
                throw {error:"No user with the corresponding token exists"};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the token auth");
            throw error;
        }
    }

    createToken(user){
        try {
            const result  = jwt.sign(user,JWT_AUTH,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in create token");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_AUTH);
            return response;
        } catch (error) {
            console.log("Something went wrong in toekn validation");
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong inside the the check password");
            throw error;
        }
    }

};

module.exports = UserService;