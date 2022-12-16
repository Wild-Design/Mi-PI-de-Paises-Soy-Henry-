const { Activity } = require("../db");

const createActivitie = async (req, res) => {
  const { name, countriesId } = req.body;
  try {
    if (!name)
      return res.status(400).send("El nombre de la actividad es obligatorio ");

    if (!countriesId)
      return res.status(400).send("El campo countriesId es obligatorio");

    if (countriesId) {
      const activity = await Activity.create(req.body);
      await activity.addCountries(countriesId);
      res.status(201).send("Actividad creada correctamente");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createActivitie,
};
