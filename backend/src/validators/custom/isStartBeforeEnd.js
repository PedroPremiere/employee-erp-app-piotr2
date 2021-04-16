module.exports = (startDate, request) => {
    const { endDate } = request.body;

    if (startDate > endDate) {
        return Promise.reject('Start Date must be before end');
    }

    return true;
};
