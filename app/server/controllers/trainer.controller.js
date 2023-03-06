const db = require("../models");
const { Op } = require("sequelize");

const { staff: Staff, role: Roles, course: Course } = db;

const getTrainerByCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const trainers = await Staff.findAll({
        where: {
            id: {
              [Op.ne]: 1, // not equal to 1
            },
          },
      attributes: ["id", "name", "surname", "email"],
      include: [
        {
          model: Course,
          where: {
            id: id,
          },
          required: true,
        },
      ],
    });
    res.status(200).send(trainers);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getTrainerById = async (req, res) => {
  try {
    const id = req.params.id;

    const staff = await Staff.findOne({
      attributes: ["id", "name", "surname", "email"],
      where: {
        id: id,
      },
      include: [
        {
          model: Course,
          required: false,
          attributes: ["id", "name"],
        },
      ],
    });
    if (!staff) {
      return res.status(404).send({ message: "Trainer not found" });
    }
    res.status(200).send([staff]);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const staff = await Staff.findAll({
      attributes: ["id", "name", "surname", "email"],
      where: {
        id: {
          [Op.ne]: 1, // not equal to 1
        },
      },
    });
    if (!staff) {
      return res.status(409).send("Details are not correct");
    }

    return res.status(201).send(staff);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTrainer = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, surname, email, courseId } = req.body;
    const updateInfo = {
      name,
      surname,
      email,
    };
    const staff = await Staff.findByPk(id)
    const trainer = await Staff.update(updateInfo, {
      where: {
        id: id,
      },
    });
    await staff.setCourses(courseId);

    res.status(200).send({ message: "trainer updated successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTrainer = async (req, res) => {
  try {
    const id = req.params.id;
    await Staff.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).send({ message: "trainer deleted succesfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  updateTrainer,
  deleteTrainer,
  getTrainerById,
  getAllTrainers,
  getTrainerByCourse,
};
