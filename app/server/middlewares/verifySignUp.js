const db = require("../models");
const Staff = db.staff;

const checkDuplicateNameOrEmail = async (req, res, next) => {
    try {
        const { email, name, surname } = req.body;
        const staffName = await Staff.findOne({
            where: { name: name },
        });
        if (staffName) {
            res.status(404).send({
                message: "Failed! StaffName is already in use!",
            });
            return;
        }
        const staffSurName = await Staff.findOne({
            where: { name: name },
        });
        if (staffSurName) {
            res.status(404).send({
                message: "Failed! staffSurName is already in use!",
            });
            return;
        }
        const emailcheck = await Staff.findOne({
            where: { email: email },
        });
        if (emailcheck) {
            res.status(404).send({
                message: "Failed! Email is already in use!",
            });
            return;
        }
        next();
    } catch (error) {
        res.json(500).send(err);
    }
};

module.exports = {
    checkDuplicateNameOrEmail,
};
