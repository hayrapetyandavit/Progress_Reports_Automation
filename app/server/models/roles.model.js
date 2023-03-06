module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define(
        "roles",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false },
    );
    return Roles;
};
