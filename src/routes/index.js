const express = require('express');

const FormAgendController = require("../controllers/formagend.controller");

const Routes = express.Router();


Routes.delete("/agendamento/:id", FormAgendController.remove);
Routes.get("/agendamento", FormAgendController.index);
Routes.post("/agendamento", FormAgendController.store);

module.exports = Routes;