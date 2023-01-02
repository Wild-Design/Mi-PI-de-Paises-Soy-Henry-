const { Router } = require("express");
const {
  createActivitie,
  getAllActivities,
  deleteActivity,
} = require("../controllers/activitiesControllers");

const activitiesRouter = Router();

activitiesRouter.post("/", createActivitie);
activitiesRouter.get("/", getAllActivities);
activitiesRouter.delete("/", deleteActivity);

module.exports = activitiesRouter;
