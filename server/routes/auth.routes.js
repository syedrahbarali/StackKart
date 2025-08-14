const { login, createUser, findUser, logout } = require("../controllers/auth.controller");
const authentication = require("../middlewares/authentication");

const routes = require("express").Router();

routes.post("/login", login);
routes.get("/findUser", authentication, findUser);
routes.post("/createAccount", createUser);
routes.post("/logout", authentication, logout);

module.exports = routes