const { Activity, Country } = require("../db");

const createActivitie = async (req, res) => {
  const { countriesId, name, difficulty, duration, season } = req.body;
  try {
    if (!name)
      return res.status(400).send("El nombre de la actividad es obligatorio ");

    if (!countriesId)
      return res.status(400).send("El campo countriesId es obligatorio");

    if (difficulty < 1 || difficulty > 5)
      return res.status(400).send("La dificultad debe ser entre 1 y 5");
    if (countriesId.length) {
      countriesId.forEach((id) => {
        if (id.length !== 3)
          return res
            .status(400)
            .send("Los ID de paises deben contener solo 3 letras");
      });

      const limpiarDuplicados = countriesId.filter((id, index) => {
        return countriesId.indexOf(id) === index;
      });

      const activity = await Activity.create({
        countriesId: limpiarDuplicados,
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
      });
      await activity.addCountries(limpiarDuplicados);
      res.status(201).send("Actividad creada correctamente");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllActivities = async (req, res) => {
  try {
    const ACTIVITIES = await Activity.findAll({
      include: {
        model: Country,
      },
    });
    if (!ACTIVITIES.length)
      return res.status(404).send("No hay actividades creadas");
    return res.status(200).send(ACTIVITIES);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteActivity = async (req, res) => {
  const { id } = req.body;
  try {
    const DELETE_ACTIVITY = await Activity.destroy({
      where: { id: id },
    });
    if (DELETE_ACTIVITY === 1) {
      return res.status(200).send("Actividad borrada correctamente!");
    } else {
      return res.status(400).send("Posible id invalido, no se a borrado nada!");
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  createActivitie,
  getAllActivities,
  deleteActivity,
};
