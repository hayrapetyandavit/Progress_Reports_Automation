const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check } = require("express-validator");
const generator = require("generate-password");
const config = require("../config/auth.config");
const transporter = require("../config/mail.config");
const { validationResult } = require("express-validator");

const { staff: Staff, refreshtoken: RefreshToken, course: Course } = db;

const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, surname, email, courseId } = req.body;
        const password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            lowercase:true,
            uppercase: true,
            strict: true,
            exclude: '"',
        });
        const userStaff = {
            name,
            surname,
            email,
            password: await bcrypt.hash(password, 10),
        };
        const staff = await Staff.create(userStaff);
        if (!staff) {
            return res.status(409).send("Details are not correct");
        }
        await staff.setRoles([1]);
        const course = await Course.findAll();
        // if (!course.length) {
            await staff.setCourses(courseId);
        // }
        
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: staff.email,
            subject: "Sourcemind",
            html: `<div style="background-color:#fff;">
                    <h2 style="color:#ff6600;">Sourcemind</h2>
                    <h3>Hi ${staff.name} ${staff.surname} jan!</h3>
                    <p>You became a user in sourcemind report.
                    Here is your username and password.</p>
                    <p> Login: <b>${staff.email}</b>.</p>
                    <p>Password: <b>${password}</b>.</p>
                </div>`,
            text: ``,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return res.status(201).json("trainer create successfuly");
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const staff = await Staff.findOne({ where: { email: email } });
        if (!staff) {
            return res.status(404).send({
                message: "Authentication failed",
            });
        }
        const passwordIsValid = await bcrypt.compare(password, staff.password);

        if (!passwordIsValid) {
            return res.status(404).send({
                message: "Authentication failed",
            });
        }

        const token = jwt.sign(
            { id: staff.id, exp: Math.round(new Date(Date.now()) / 1000) + 30 },
            config.secret,
        );

        let refreshToken = await createToken(staff);

        let authorities;
        const roles = await staff.getRoles();
        roles.forEach((element) => {
            authorities = element.name.toUpperCase();
        });

        res.cookie("refresh_token", refreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.cookie("access_token", token, { httpOnly: true });
        res.status(201).send({
            id: staff.id,
            name: staff.name,
            surname: staff.surname,
            email: staff.email,
            roles: authorities,
            // accessToken: token,
            // refreshToken: refreshToken,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name,surname, email, oldPassword, newPassword } = req.body;
        const staff = await Staff.findByPk(req.userId);
        if (!staff) {
            throw new Error('User not found');
          }

          staff.name = name;
          staff.surname = surname;
          const existingUser = await Staff.findOne({ where: { email } });
          if (existingUser && existingUser.id !== req.userId) {
            throw new Error('Email address already in use');
          } else {
            staff.email = email;
          }
        const passwordIsValid = await bcrypt.compare(oldPassword, staff.password);

          if(newPassword) {
            staff.password = await bcrypt.hash(newPassword,10)
          }

          await staff.save();
      
        const updatedStaff = await Staff.findByPk(req.userId);
        const roles = await updatedStaff.getRoles();
        let authorities;
        roles.forEach((element) => {
            authorities = element.name.toUpperCase();
        });
        res.status(200).send({
            id: updatedStaff.id,
            name: updatedStaff.name,
            surname: updatedStaff.surname,
            email: updatedStaff.email,
            roles: authorities,
        });

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

const createToken = async (user) => {
    let expiredAt = new Date();

    let _token = jwt.sign(
        { id: user.id, exp: Math.round(new Date(Date.now()) / 1000) + 1296000 },
        config.secret,
    );

    let refreshToken = await RefreshToken.create({
        token: _token,
        staffId: user.id,
        expiryDate: expiredAt.getTime(),
    });
    return refreshToken.token;
};

const logout = async (req, res) => {
    try {
        const id = req.userId;
        await RefreshToken.destroy({
            where: {
                staffId: id,
            },
        });
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");
        res.status(200).send({ message: "logout success" });
        return;
    } catch (error) {
        res.status(500).send([{ message: error }]);
    }
};

module.exports = {
    signup,
    login,
    logout,
    updateProfile
};
