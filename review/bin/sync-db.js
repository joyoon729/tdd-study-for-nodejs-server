const models = require('../models/models');

module.exports = () => {
    const options = {
        force: process.env.NODE_ENV === 'test' ?
                true : false
    }
    console.log(options)
    return models.sequelize.sync(options);
}