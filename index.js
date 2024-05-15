const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const LoginRoutes = require('./src/routes/login.route');
const EmployeeRoute = require('./src/routes/employee.route');
const EmployeeProfile = require('./src/routes/profile.route');
const Department = require('./src/routes/department.route');

dotenv.config();

var cors = require("cors");
const app = express();
const port = process.env.PORT || 4000

const { checkToken } = require('./src/auth/token.validation');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.options("*", cors());
app.use(
    cors({
        origin: "*",
    })
);


app.use('/api/v1/employee', checkToken, EmployeeRoute);

app.use('/api/v1/profile',checkToken, EmployeeProfile);

app.use('/api/v1/department', checkToken, Department);

app.use('/api/v1/login', LoginRoutes);


app.get('/', (req, res) => {
    res.status(200).send("api running \u{1F973}")
})

app.listen(port, () => {
    console.log(`server started running \u{1F3C3} \u{1F3C3} ${port}`)
})