const { StatusCodes } = require('http-status-codes');
const { Contract } = require('../../models');

class IndexController {
    static async invoke(request, response) {
        const contracts = await Contract.findAll();

        return response.send(contracts);
    }
}

module.exports = IndexController;
