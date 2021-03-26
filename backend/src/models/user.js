const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }
    User.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            birthDate: DataTypes.DATEONLY
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'User'
        }
    );

    return User;
};
