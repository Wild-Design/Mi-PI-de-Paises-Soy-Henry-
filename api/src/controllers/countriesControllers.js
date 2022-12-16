const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const REMOVE_ACENTS = (string) => {
  return string.normalize("NFD").replace(/[\u0300-\u036fÅ]/g, "");
}; //Con esta función media rara quito los acentos de lo que me trae la api externa...
// Si no, no puedo consultar la tabla en SQL porque sale un error de codificación

const getAllCountries = async (req, res) => {
  const { name } = req.query;
  try {
    const DB_COUNTRIES = await Country.findAll();
    if (!DB_COUNTRIES.length) {
      const API = await axios.get("https://restcountries.com/v3/all");
      const RESPONSE = API.data;
      const COUNTRIES = RESPONSE.map((countrie) => {
        return {
          id: countrie.cca3,
          name: REMOVE_ACENTS(countrie.name.common),
          img: countrie.flags,
          continent: countrie.continents[0],
          capital: countrie.capital
            ? REMOVE_ACENTS(countrie.capital[0])
            : "No existe capital",
          subregion: countrie.subregion,
          area: countrie.area,
          population: countrie.population,
        };
      });
      await Country.bulkCreate(COUNTRIES);
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
  if (name) {
    try {
      const DB_NAME = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: "%" + name + "%",
          },
        },
      });
      if (DB_NAME.length) {
        return res.status(200).send(DB_NAME);
      } else {
        return res.status(200).send([
          {
            id: "NotFound",
            name: "No encontrado!",
            img: "https://pbs.twimg.com/profile_images/1162926462170804224/rAO9Rm0N_400x400.jpg",
            continent: "Not Found",
          },
        ]);
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } else {
    try {
      const ALL_COUNTRIES = await Country.findAll();
      return res.status(200).send(ALL_COUNTRIES);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
};

const getCountrieDetail = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const GET_BY_PK = await Country.findByPk(id, {
        include: {
          model: Activity,
        },
      });
      if (GET_BY_PK) {
        res.status(200).send(GET_BY_PK);
      } else {
        res.status(200).send({ error: "No se encontro pais con ese id" });
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getAllCountries,
  getCountrieDetail,
};
