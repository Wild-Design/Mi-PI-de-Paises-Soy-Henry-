const { Activity } = require("../db");

const createActivitie = async (req, res) => {
  const { name, countriesId, difficulty } = req.body;
  try {
    if (!name)
      return res.status(400).send("El nombre de la actividad es obligatorio ");

    if (!countriesId)
      return res.status(400).send("El campo countriesId es obligatorio");

    if (difficulty < 0 || difficulty > 5)
      return res.status(400).send("La dificultad debe ser entre 1 y 5");
    if (countriesId) {
      countriesId.forEach((id) => {
        if (id.length !== 3)
          return res
            .status(400)
            .send("Los ID de paises deben contener solo 3 letras");
      });
      const activity = await Activity.create(req.body);
      await activity.addCountries(countriesId);
      res.status(201).send("Actividad creada correctamente");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllActivities = async (req, res) => {
  try {
    const ACTIVITIES = await Activity.findAll();
    if (!ACTIVITIES.length)
      return res.status(404).send("No hay actividades creadas");
    return res.status(200).send(ACTIVITIES);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  createActivitie,
  getAllActivities,
};
