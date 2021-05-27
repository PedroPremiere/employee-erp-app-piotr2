const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        async isAdmin() {
            const roles = await this.getRoles();

            return roles.some(role => role.isAdmin());
        }

        static associate(models) {
            User.belongsToMany(models.Role, {
                as: 'roles',
                foreignKey: 'userId',
                sourceKey: 'id',
                through: 'RoleUser'
            });
        }
    }

    User.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            birthDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            avatarFilePath: {
                type: DataTypes.STRING,
                allowNull: true
            },
            vacationDays: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: false
            }
        },

        {
            defaultScope: {
                attributes: { exclude: ['password'] }
            },
            sequelize,
            timestamps: true,
            paranoid: true,
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
