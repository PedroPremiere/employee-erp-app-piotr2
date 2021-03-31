const { StatusCodes } = require('http-status-codes');
const { Vacation } = require('../../models');

class IndexController {
    static async invoke(request, response) {
        const vacations = await Vacation.findAll();

        return response.send(vacations);
    }
}

module.exports = IndexController;
