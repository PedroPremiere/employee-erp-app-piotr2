const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            admin: DataTypes.BOOLEAN,
            birthDate: DataTypes.DATEONLY
        },

        {
            sequelize,
            timestamps: true,
            modelName: 'User',
            hooks: {
                async beforeSave(user, options) {
                    if (options.fields && options.fields.includes('password')) {
                        user.password = await bcrypt.hash(user.password, 8);
                    }
                }
            }
        }
    );

    return User;
};
