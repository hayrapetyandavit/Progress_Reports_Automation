const {
  updateSudent,
  createStudent,
  getSudentById,
  deleteStudent,
  getAllStudents,
  getAllStudentsByCourses,
  getAllStudentsByCourse,
  getStudentsByTrainerId,
} = require("../controllers/student.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/studentby/:id", getSudentById);
  app.post("/student/create", createStudent);
  app.put("/student/update/:id", updateSudent);
  app.get("/student/all", getAllStudents);
  app.get("/student/all/:id", getAllStudentsByCourse);
  app.post("/student/all/bycourses", getAllStudentsByCourses);
  app.get("/student/all/bytrainer/:id", getStudentsByTrainerId);
  app.delete("/student/delete/:id", deleteStudent);
};
