require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5506;

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

//models
const db = require("./models");
const Role = db.role;
const Staff = db.staff;

// force: true will drop the table if it already exists
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db has been re-sync");
    initial();
  })
  .catch((err) => {
    console.log(err);
    console.log("Error whyle syncing table & model");
  });

//routes
require("./routes/auth.routes")(app);
require("./routes/course.routes")(app);
require("./routes/subject.routes")(app);
require("./routes/student.routes")(app);
require("./routes/trainers.routes")(app);
require("./routes/finalReport.routes")(app);
require("./routes/trainerReport.routes")(app);

app.all("*", (req, res) =>
  res.status(404).send({ error: `URL ${req.url} not found` }),
);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

async function initial() {
  try {
    const password = "Aa!1aaaa";
    const name = "superadmin";
    const surname = "superadmin";
    const email = "superadmin@gmail.com";
    const data = {
      name,
      surname,
      email,
      password: await bcrypt.hash(password, 10),
      status: "ACTIVE",
    };
    const user = await Staff.create(data);
    await Role.create({
      id: 1,
      name: "user",
    });
    await Role.create({
      id: 2,
      name: "admin",
    });
    const setRoles = await user.setRoles([2]);
    if (setRoles) console.log(setRoles, "registered succesfuly....");
  } catch (err) {
    console.log(err.message, "error");
  }
}
