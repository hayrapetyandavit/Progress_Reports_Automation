const db = require("../models");
const { trainerReport: TrainerReport, students: Student } = db;

const createTrainerReport = async (req, res) => {
  try {
    const { subjectId, studentId, attendance, comment, graduate, staffId } =
      req.body;
    const reportInfo = {
      subjectId,
      studentId,
      attendance,
      comment,
      graduate,
      staffId,
    };

    const report = TrainerReport.create(reportInfo);
    return res.status(200).send({ message: "Report created successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const updateTrainerReport = async (req, res) => {
  try {
    const { attendance, comment = "", graduate, staffId } = req.body;
    const id = req.params.id;
    const reportInfo = {
      attendance,
      comment,
      graduate,
      staffId,
    };

    const report = TrainerReport.update(reportInfo, {
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: "Report updated successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};
//TODO
const updateTrainerReportByAdmin = async (req, res) => {
  try {
    const { edited_comment } = req.body;
    const id = req.params.id;
    const reportInfo = {
      edited_comment,
    };

    const report = TrainerReport.update(reportInfo, {
      where: {
        id: id,
      },
    });
    return res.status(200).send({ message: "Report updated successfully" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getTrainerReport = async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const courseId = req.params.courseId;
    const trainerReport = await Student.findAll({
      where: {
        courseId: courseId,
      },
      include: [
        {
          model: TrainerReport,
          where: {
            subjectId: subjectId,
          },
          required: false,
        },
      ],
    });
    res.status(200).send(trainerReport);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getTrainerReport,
  createTrainerReport,
  updateTrainerReport,
  updateTrainerReportByAdmin,
};
