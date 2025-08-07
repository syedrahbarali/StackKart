const { login, createUser } = require("../controllers/auth.controller");

const routes = require("express").Router();

// routes.get("/", (req, res) => res.send("Auth Routes"))

routes.post("/login", login);
routes.post("/createAccount", createUser);

module.exports = routes