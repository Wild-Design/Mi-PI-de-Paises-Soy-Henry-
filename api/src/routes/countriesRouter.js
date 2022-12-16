const { Router } = require("express");
const {
  getAllCountries,
  getCountrieDetail,
} = require("../controllers/countriesControllers.js");

const countriesRouter = Router();

countriesRouter.get("/", getAllCountries);
countriesRouter.get("/:id", getCountrieDetail);

module.exports = countriesRouter;
