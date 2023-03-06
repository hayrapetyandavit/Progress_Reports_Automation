const {
    updateSubject,
    createSubject,
    getAllSubject,
    deleteSubject,
    getSubjectbyTrainer,
    getSubjectById,
    getSubjectByCourse,
    getSubjectsByTrainerId,
} = require("../controllers/subject.controller");

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept",
        );
        next();
    });

    app.get("/subject/all", getAllSubject);
    app.get("/subject/course/:id", getSubjectByCourse);
    app.get("/subjectby/:id", getSubjectById);
    app.post("/subject/create", createSubject);
    app.put("/subject/update/:id", updateSubject);
    app.delete("/subject/delete/:id", deleteSubject);
    app.get("/subject/trainers/:id", getSubjectbyTrainer);
    app.get("/subject/trainer/:id", getSubjectsByTrainerId);//
};
