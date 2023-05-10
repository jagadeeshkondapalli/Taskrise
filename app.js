const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const { connectMongoDb } = require("./mongodb");
const settings = require("./controllers/settings");

const PORT = process.env.PORT || settings.port;
const users = require("./router/users");
const todos = require("./router/todo");

// Register the Handlebars engine and pass in the "or" helper function
connectMongoDb();

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require("./controllers/config")(passport);

app.use(flash());

app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    let title = "TaskRise";
    res.render("index", {
        title: title,
    });
});
app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/features", (req, res) => {
    res.render("features");
});
app.get("/operations", (req, res) => {
    res.render("operations");
});
app.get("/services", (req, res) => {
    res.render("services");
});
app.get("/contact1", (req, res) => {
    res.render("contact1");
});
app.get("/contact2", (req, res) => {
    res.render("contact2");
});
app.use(function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.user = req.user || null;
    next();
});

app.use("/users", users);
app.use("/todo", todos);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
