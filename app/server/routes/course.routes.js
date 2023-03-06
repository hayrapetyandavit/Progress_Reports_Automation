const {
    updateCourse,
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourseById,
    getCourseByTrainerId
} = require("../controllers/course.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
    });

    app.get("/course/:id", getCourseById);
    app.get("/course/trainer/:id", getCourseByTrainerId);
    app.get("/courses/all", getAllCourses);
    app.post("/courses/create", createCourse);
    app.put("/courses/update/:id", updateCourse);
    app.delete("/courses/delete/:id", deleteCourse);
};
