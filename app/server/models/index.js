const config = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.role = require("./roles.model")(sequelize, DataTypes);
db.staff = require("./staff.model")(sequelize, DataTypes);
db.course = require("./course.model")(sequelize, DataTypes);
db.subject = require("./subject.model")(sequelize, DataTypes);
db.students = require("./student.model")(sequelize, DataTypes);
db.refreshtoken = require("./refreshtoken.model")(sequelize, DataTypes);
db.trainerReport = require("./trainerReport.model")(sequelize, DataTypes);

db.role.belongsToMany(db.staff, {
    through: "user_roles",
});
db.staff.belongsToMany(db.role, {
    through: "user_roles",
});
db.course.belongsToMany(db.staff, {
    through: "course_model",
    timestamps: false 
});
db.staff.belongsToMany(db.course, {
    through: "course_model",
    timestamps: false 
});

db.course.hasMany(db.subject);
db.subject.belongsTo(db.course);

db.course.hasMany(db.students);
db.students.belongsTo(db.course);

db.refreshtoken.belongsTo(db.staff);

db.students.hasMany(db.trainerReport);
db.trainerReport.belongsTo(db.students);

db.staff.hasMany(db.subject);
db.subject.belongsTo(db.staff);

db.staff.hasMany(db.trainerReport);
db.trainerReport.belongsTo(db.staff);

db.subject.hasMany(db.trainerReport);

module.exports = db;
