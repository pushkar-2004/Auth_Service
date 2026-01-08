const dotenv = require('dotenv')
const bcrypt = require('bcrypt');

dotenv.config();

module.exports = {
    PORT : process.env.PORT,
    JWT_AUTH : process.env.JWT_AUTH
};