const fs = require("fs");
const pug = require("pug");
const pdf = require("html-pdf");
const { Op } = require("sequelize");
const transporter = require("../config/mail.config");

const db = require("../models");

const {
  staff: Staff,
  course: Course,
  subject: Subject,
  students: Student,
  trainerReport: TrainerReport,
} = db;

const getFinalReport = async (req, res) => {
  try {
    const { subject, student, staff } = req.body;
    const report = await getData(subject, student, staff);
    if (!report) {
      res.status(404).send({ message: "final reports not found" });
    }
    res.status(200).send(report);
  } catch (error) {
    res.status(500).send(error);
  }
};

//TODO this function is responsible for sending the final report to the student
const sendFinalReport = async (req, res) => {
  try {
    const { subject, student, staff } = req.body;
    const finalInfo = await getData(subject, student, staff);
    console.log(finalInfo);
    const report = await reportGenerator(finalInfo);
    res.status(200).send({ message: "report send successfuly" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getFinalAssessmentScore = async (data) => {
  try {
    let finalAssessmentPass = 0;
    [...data[2]].forEach((el, i) => {
      finalAssessmentPass += el.subjects.reduce((acc, el) => {
        return (
          acc +
          (el.weightage *
            ((el.trainer_reports[0].graduate * 100) / el.max_score)) /
            100
        );
      }, 0);
    });
    return finalAssessmentPass;
  } catch (error) {
    return 0;
  }
};

const getFinalAttendance = async (data) => {
  try {
    let count = 0;
    let sum = 0;
    const attendance = [...data[1]]
      .map((el, i) => {
        let sum = el.subjects.reduce((acc, el) => {
          return acc + el.trainer_reports[0].attendance;
        }, 0);
        return [sum, el.subjects.length];
      })
      .forEach((el, i) => {
        count += el[1];
        sum += el[0];
      });
    return [sum, count];
  } catch (error) {}
};

const getFeedback = async (data) => {
  try {
    return data[2].reduce((acc, el) => {
      el.subjects.forEach((el, i) => {
        if (el.trainer_reports[0].edited_comment !== null) {
          acc.push(el.trainer_reports[0].edited_comment);
        } else {
          acc.push(el.trainer_reports[0].comment);
        }
      });
      return acc;
    }, []);
  } catch (error) {}
};
const reportGenerator = async (finalInfo) => {
  //TODO this function is responsible for generating the final report
  try {
    console.log(finalInfo);
    const date = new Date();
    const dataOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const data = {
      title: `${finalInfo[0].name} ${finalInfo[0].surname}`,
      finalAssessment: await getFinalAssessmentScore(finalInfo),
      attendance: await getFinalAttendance(finalInfo),
      report: finalInfo[1],
      data: date.toLocaleDateString("en-US", dataOptions),
      feedback: await getFeedback(finalInfo),
      image: `<svg xmlns="http://www.w3.org/2000/svg" width="154.27" height="30.631" viewBox="0 0 154.27 30.631"><defs><style>.a{fill:#242f6b;}.b{fill:#f90170;stroke:rgba(0,0,0,0);stroke-miterlimit:10;}</style></defs><g transform="translate(0.5 0.5)"><path class="a" d="M7.035-7.392a2.909,2.909,0,0,0-.924-.766A2.6,2.6,0,0,0,4.83-8.484a2.454,2.454,0,0,0-1.113.252.868.868,0,0,0-.5.84.843.843,0,0,0,.557.83A10.183,10.183,0,0,0,5.4-6.069a9.17,9.17,0,0,1,1.145.336,4.18,4.18,0,0,1,1.05.556,2.742,2.742,0,0,1,.766.861,2.481,2.481,0,0,1,.294,1.25A3.25,3.25,0,0,1,8.306-1.5a2.945,2.945,0,0,1-.924,1.04A3.891,3.891,0,0,1,6.037.116,6.968,6.968,0,0,1,4.452.294,6.294,6.294,0,0,1,2.163-.137,4.84,4.84,0,0,1,.315-1.365L1.974-2.919a3.314,3.314,0,0,0,1.092.9,3.128,3.128,0,0,0,1.491.357,2.561,2.561,0,0,0,.556-.063,1.9,1.9,0,0,0,.525-.2,1.087,1.087,0,0,0,.388-.368,1.035,1.035,0,0,0,.147-.567.931.931,0,0,0-.577-.9A9.309,9.309,0,0,0,3.864-4.3a8.33,8.33,0,0,1-1.1-.326,3.6,3.6,0,0,1-.956-.525,2.433,2.433,0,0,1-.672-.809,2.567,2.567,0,0,1-.252-1.2A2.883,2.883,0,0,1,1.229-8.61a2.975,2.975,0,0,1,.913-1,4.1,4.1,0,0,1,1.281-.578,5.72,5.72,0,0,1,1.47-.189A6.192,6.192,0,0,1,7.025-10,3.6,3.6,0,0,1,8.673-8.841Zm3.213,2.31a5.331,5.331,0,0,1,.431-2.174,5.082,5.082,0,0,1,1.165-1.67A5.138,5.138,0,0,1,13.587-10a6.05,6.05,0,0,1,2.142-.378A6.05,6.05,0,0,1,17.871-10a5.138,5.138,0,0,1,1.743,1.071,5.082,5.082,0,0,1,1.165,1.67,5.331,5.331,0,0,1,.431,2.174A5.405,5.405,0,0,1,20.779-2.9a5.172,5.172,0,0,1-1.165,1.691A5.323,5.323,0,0,1,17.871-.1a5.766,5.766,0,0,1-2.142.4,5.766,5.766,0,0,1-2.142-.4,5.323,5.323,0,0,1-1.743-1.1A5.172,5.172,0,0,1,10.679-2.9,5.405,5.405,0,0,1,10.248-5.082Zm2.562,0a4.03,4.03,0,0,0,.179,1.176,3.238,3.238,0,0,0,.535,1.05,2.8,2.8,0,0,0,.9.756,2.709,2.709,0,0,0,1.3.294,2.709,2.709,0,0,0,1.3-.294,2.8,2.8,0,0,0,.9-.756,3.239,3.239,0,0,0,.536-1.05,4.03,4.03,0,0,0,.178-1.176,3.927,3.927,0,0,0-.178-1.166,3.257,3.257,0,0,0-.536-1.039,2.689,2.689,0,0,0-.9-.746,2.792,2.792,0,0,0-1.3-.283,2.792,2.792,0,0,0-1.3.283,2.689,2.689,0,0,0-.9.746,3.257,3.257,0,0,0-.535,1.039A3.927,3.927,0,0,0,12.81-5.082ZM32.844,0H30.45V-1.617h-.042A3.259,3.259,0,0,1,29.243-.284a3.35,3.35,0,0,1-1.963.578,3.793,3.793,0,0,1-1.691-.346,3.333,3.333,0,0,1-1.155-.914,3.7,3.7,0,0,1-.661-1.3,5.477,5.477,0,0,1-.21-1.512v-6.3h2.52v5.586a7.151,7.151,0,0,0,.063.924,2.494,2.494,0,0,0,.273.872A1.811,1.811,0,0,0,27-2.058a1.7,1.7,0,0,0,.976.252,2.17,2.17,0,0,0,1.04-.241,2.2,2.2,0,0,0,.735-.62,2.743,2.743,0,0,0,.43-.872,3.477,3.477,0,0,0,.147-1V-10.08h2.52Zm3.024-10.08h2.415V-8.4h.042A3.676,3.676,0,0,1,39.5-9.828a2.933,2.933,0,0,1,1.764-.546q.147,0,.315.01a1.162,1.162,0,0,1,.294.052V-8a3.517,3.517,0,0,0-.431-.084,2.966,2.966,0,0,0-.347-.021,2.674,2.674,0,0,0-1.386.315,2.52,2.52,0,0,0-.819.756,2.707,2.707,0,0,0-.4.9,3.514,3.514,0,0,0-.1.735V0h-2.52ZM50.022-7.287a2.222,2.222,0,0,0-.882-.7,2.73,2.73,0,0,0-1.2-.284,2.524,2.524,0,0,0-1.218.284,2.644,2.644,0,0,0-.872.746,3.211,3.211,0,0,0-.514,1.039,4.153,4.153,0,0,0-.168,1.166,3.927,3.927,0,0,0,.179,1.166,3.257,3.257,0,0,0,.535,1.039,2.72,2.72,0,0,0,.892.746,2.633,2.633,0,0,0,1.25.283A3.2,3.2,0,0,0,49.2-2.037a2.241,2.241,0,0,0,.945-.672l1.575,1.6a4.175,4.175,0,0,1-1.606,1.04,5.944,5.944,0,0,1-2.111.367A6.216,6.216,0,0,1,45.9-.063a5.006,5.006,0,0,1-1.743-1.05,4.981,4.981,0,0,1-1.176-1.68,5.57,5.57,0,0,1-.431-2.247,5.459,5.459,0,0,1,.431-2.2,5.055,5.055,0,0,1,1.166-1.68A5.207,5.207,0,0,1,45.854-10a5.737,5.737,0,0,1,2.09-.378,5.694,5.694,0,0,1,2.153.42A4.067,4.067,0,0,1,51.744-8.8ZM60.48-6.048a3.107,3.107,0,0,0-.137-.924,2.115,2.115,0,0,0-.431-.777,2.1,2.1,0,0,0-.745-.536,2.606,2.606,0,0,0-1.061-.2,2.832,2.832,0,0,0-1.921.683,2.488,2.488,0,0,0-.872,1.753ZM63-4.914v.336a2.706,2.706,0,0,1-.021.336H55.314a2.5,2.5,0,0,0,.284,1,2.539,2.539,0,0,0,.64.777,3.187,3.187,0,0,0,.9.514,2.966,2.966,0,0,0,1.05.189,3.362,3.362,0,0,0,1.6-.347,2.989,2.989,0,0,0,1.071-.955l1.68,1.344A5.049,5.049,0,0,1,58.212.294a6.154,6.154,0,0,1-2.163-.367,5.1,5.1,0,0,1-1.712-1.04A4.685,4.685,0,0,1,53.2-2.762a5.682,5.682,0,0,1-.41-2.216,5.782,5.782,0,0,1,.41-2.215,5.044,5.044,0,0,1,1.124-1.7,5.026,5.026,0,0,1,1.69-1.092,5.657,5.657,0,0,1,2.111-.389,5.322,5.322,0,0,1,1.943.346A4.212,4.212,0,0,1,61.614-9a4.772,4.772,0,0,1,1.019,1.7A7.018,7.018,0,0,1,63-4.914Zm14.469-5.46a3.793,3.793,0,0,1,1.69.346,3.333,3.333,0,0,1,1.155.914,3.7,3.7,0,0,1,.661,1.3,5.476,5.476,0,0,1,.21,1.512V0h-2.52V-5.586A7.151,7.151,0,0,0,78.6-6.51a2.494,2.494,0,0,0-.273-.872,1.811,1.811,0,0,0-.577-.641,1.7,1.7,0,0,0-.977-.252,1.924,1.924,0,0,0-1.008.252,2.2,2.2,0,0,0-.693.651,2.787,2.787,0,0,0-.4.893,3.936,3.936,0,0,0-.126.977V0H72.03V-6.09a2.587,2.587,0,0,0-.451-1.564,1.636,1.636,0,0,0-1.417-.62,1.946,1.946,0,0,0-.987.241,2.078,2.078,0,0,0-.682.62,2.842,2.842,0,0,0-.4.871,3.726,3.726,0,0,0-.136,1V0h-2.52V-10.08H67.83v1.617h.042a2.986,2.986,0,0,1,.451-.714A3.523,3.523,0,0,1,69-9.786a3.2,3.2,0,0,1,.893-.431A3.719,3.719,0,0,1,71-10.374a3.413,3.413,0,0,1,1.953.525,3.485,3.485,0,0,1,1.2,1.386A3.6,3.6,0,0,1,75.5-9.88,3.826,3.826,0,0,1,77.469-10.374Zm6.7.294h2.52V0h-2.52ZM83.811-13.5a1.452,1.452,0,0,1,.451-1.06,1.551,1.551,0,0,1,1.145-.451,1.667,1.667,0,0,1,1.166.43,1.4,1.4,0,0,1,.472,1.082,1.4,1.4,0,0,1-.472,1.082,1.667,1.667,0,0,1-1.166.431,1.551,1.551,0,0,1-1.145-.451A1.452,1.452,0,0,1,83.811-13.5Zm5.943,3.423h2.394v1.617h.042A3.259,3.259,0,0,1,93.355-9.8a3.35,3.35,0,0,1,1.964-.577,3.793,3.793,0,0,1,1.69.346,3.333,3.333,0,0,1,1.155.914,3.7,3.7,0,0,1,.661,1.3,5.477,5.477,0,0,1,.21,1.512V0h-2.52V-5.586a7.151,7.151,0,0,0-.063-.924,2.494,2.494,0,0,0-.273-.872,1.811,1.811,0,0,0-.577-.641,1.7,1.7,0,0,0-.976-.252,2.155,2.155,0,0,0-1.05.241,2.23,2.23,0,0,0-.725.62,2.743,2.743,0,0,0-.43.871,3.477,3.477,0,0,0-.147,1V0h-2.52ZM112.224,0H109.83V-1.512h-.042a3.43,3.43,0,0,1-1.459,1.344,4.464,4.464,0,0,1-2.006.462,4.8,4.8,0,0,1-2.069-.431A4.749,4.749,0,0,1,102.7-1.292a5.125,5.125,0,0,1-.987-1.7,6.2,6.2,0,0,1-.346-2.089,5.95,5.95,0,0,1,.357-2.079,5.074,5.074,0,0,1,1.008-1.68,4.711,4.711,0,0,1,1.554-1.124,4.723,4.723,0,0,1,1.974-.409,4.473,4.473,0,0,1,1.239.157,4.456,4.456,0,0,1,.955.389,3.7,3.7,0,0,1,.7.5,4.029,4.029,0,0,1,.483.525h.063v-7.077h2.52Zm-8.295-5.082a4.03,4.03,0,0,0,.178,1.176,3.238,3.238,0,0,0,.535,1.05,2.8,2.8,0,0,0,.9.756,2.663,2.663,0,0,0,1.281.294,2.649,2.649,0,0,0,1.239-.283A3.035,3.035,0,0,0,109-2.835a3.249,3.249,0,0,0,.588-1.039,3.548,3.548,0,0,0,.2-1.166,3.641,3.641,0,0,0-.2-1.176A3.226,3.226,0,0,0,109-7.266a3.174,3.174,0,0,0-.935-.756,2.572,2.572,0,0,0-1.239-.294,2.743,2.743,0,0,0-1.281.283,2.689,2.689,0,0,0-.9.746,3.257,3.257,0,0,0-.535,1.039A3.927,3.927,0,0,0,103.929-5.082Z" transform="translate(41.546 21.494)"/><path class="b" d="M8.612,13.432a2.8,2.8,0,0,1,0-3.77L13.442,4.8a2.824,2.824,0,0,0,0-3.974A2.776,2.776,0,0,0,9.5.823L.876,9.5c-.019.018-.041.031-.06.049a2.839,2.839,0,0,0,0,3.985c.019.019.041.031.06.049L9.5,22.27a2.776,2.776,0,0,0,3.945,0,2.824,2.824,0,0,0,0-3.974Z" transform="translate(29.549 29.631) rotate(180)"/><path class="b" d="M8.612,13.432a2.8,2.8,0,0,1,0-3.77L13.442,4.8a2.824,2.824,0,0,0,0-3.974A2.776,2.776,0,0,0,9.5.823L.876,9.5c-.019.018-.041.031-.06.049a2.839,2.839,0,0,0,0,3.985c.019.019.041.031.06.049L9.5,22.27a2.776,2.776,0,0,0,3.945,0,2.824,2.824,0,0,0,0-3.974Z" transform="translate(0 0)"/></g></svg>`,
    };
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    console.log(data, "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
    console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");

    const source = fs.readFileSync("templateReport/reportTemplate.pug", "utf8");
    const template = pug.compile(source);
    const html = template(data);

    pdf.create(html, { format: "Letter" }).toBuffer(function (err, buffer) {
      if (err) return console.log(err);
      console.log("PDF created in memory (buffer)");
      sendMail(buffer, finalInfo);
    });
  } catch (error) {}
};

const sendMail = (data, finalInfo) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: `${finalInfo[0].email}`,
      subject: "Sourcemind",
      html: `<div style="padding: 20px 20px; color:#000;">
                      <h2>Sourcemind</h2>
                      <h3>Dear ${finalInfo[0].name} ${finalInfo[0].surname},</h3>
                      <p>Attached is your progress report to view your assessment results.</p>
                      <p>Best, Yulia</p>
                      <a href="tel:+37433655620" >mobile +374 33 655 620</a><br/>
                      <a href="https://sourcemind.com/" style="margin-top: 20px">www.sourcemind.com</a>
                  </div>`,
      text: ``,
      attachments: [
        {
          filename: `${finalInfo[0].name} ${finalInfo[0].surname} - Progress Report.pdf`,
          content: data,
          contentType: "application/pdf",
        },
      ],
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        buffer = null;
      }
    });
  } catch (error) {}
};

const getData = async (subjectsId, studentId, staffsId) => {
  try {
    const student = await Student.findByPk(studentId);
    const finalSubjects = await Staff.findAll({
      attributes: ["id", "name", "surname"],
      where: {
        id: staffsId,
      },
      include: [
        {
          model: Subject,
          where: {
            id: subjectsId,
            weightage: null,
          },
          include: [
            {
              model: TrainerReport,
              where: {
                studentId: studentId,
              },
            },
          ],
          required: false,
        },
      ],
      required: false,
    });
    const finalAssessments = await Staff.findAll({
      attributes: ["id", "name", "surname"],
      where: {
        id: staffsId,
      },
      include: [
        {
          model: Subject,
          where: {
            id: subjectsId,
            weightage: {
              [Op.ne]: null,
            },
          },
          include: [
            {
              model: TrainerReport,
              where: {
                studentId: studentId,
              },
            },
          ],
          required: false,
        },
      ],
      required: false,
    });
    return [student, finalSubjects, finalAssessments];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getFinalReport,
  sendFinalReport,
};
