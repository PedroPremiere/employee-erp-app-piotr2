const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contract extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            //example
            //UsersWorkingDay.belongsTo(models.WorkingDay, {                foreignKey: 'workingDayId'            });
            //this.belongsTo(models.user, {
            //    foreignKey: 'user'
            //});
        }
    }
    Contract.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            position: DataTypes.STRING,
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Contract',
            timestamps: true
        }
    );

    return Contract;
};
