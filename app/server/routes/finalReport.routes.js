const {
  getFinalReport,
  sendFinalReport,
} = require("../controllers/finalReport.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept",
    );
    next();
  });

  app.post("/final_report/", getFinalReport);
  app.post("/final_report/send", sendFinalReport);
};
