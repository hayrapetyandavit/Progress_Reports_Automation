module.exports = (sequelize, DataTypes) => {
    const TrainerReport = sequelize.define("trainer_report", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        attendance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        graduate: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
        },
        edited_comment: {
            type: DataTypes.STRING,
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        subjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return TrainerReport;
};
