module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define(
        "subject",
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
            courseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            staffId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            max_score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            weightage: {
                type: DataTypes.INTEGER,
            }
        },
        { timestamps: false },
    );
    return Subject;
};
