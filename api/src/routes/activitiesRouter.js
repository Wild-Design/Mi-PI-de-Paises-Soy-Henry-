const { Router } = require("express");
const {
  // getAllActivities,
  createActivitie,
} = require("../controllers/activitiesControllers");

const activitiesRouter = Router();

// activitiesRouter.get("/", getAllActivities);

activitiesRouter.post("/", createActivitie);

module.exports = activitiesRouter;
