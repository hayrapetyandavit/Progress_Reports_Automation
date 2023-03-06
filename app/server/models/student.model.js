module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define(
        "student",
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
            surname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                isEmail: true,
                allowNull: false,
            },
            courseId: {
                type: DataTypes.INTEGER,
            },
        },
        { timestamps: false },
    );
    return Student;
};
