const { Router } = require("express");
const {
  // getAllActivities,
  createActivitie,
  getAllActivities,
} = require("../controllers/activitiesControllers");

const activitiesRouter = Router();

// activitiesRouter.get("/", getAllActivities);

activitiesRouter.post("/", createActivitie);
activitiesRouter.get("/", getAllActivities);

module.exports = activitiesRouter;
