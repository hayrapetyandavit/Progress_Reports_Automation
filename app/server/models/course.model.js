module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define(
        "course",
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
            startDate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            endDate: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { timestamps: false },
    );
    return Course;
};
