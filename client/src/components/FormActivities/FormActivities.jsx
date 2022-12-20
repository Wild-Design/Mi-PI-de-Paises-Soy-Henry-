import style from "./FormActivities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getAllCountries } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const nameValidator = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Nombre obligatorio";
  }
  return errors;
};

function FormActivities() {
  const todosLosPaises = useSelector((state) => state.countries);
  const filtrar = todosLosPaises?.sort((a, b) => a.name.localeCompare(b.name));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [input, setInput] = useState({
    countriesId: [],
    name: "",
    difficulty: 1,
    duration: "",
    season: "todo el año",
  });
  console.log(input);
  const [errors, setErrors] = useState({
    countriesId: [],
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postActivity(input));
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const propiedad = event.target.name;
    setInput({ ...input, [propiedad]: value });
  };
  const handleCountriesId = (event) => {
    const value = event.target.value;
    setInput({
      ...input,
      countriesId: [...input.countriesId, value],
    });
  };

  return (
    <>
      <Link to="/home">
        <button>⬅️Atrás</button>
      </Link>

      <h2>Crea actividades!</h2>
      <form
        onSubmit={(event) => handleSubmit(event)}
        className={style.formContainer}
      >
        <div>
          <label htmlFor="name">Nombre de la actividad:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            id="name"
            placeholder="Escribe aqui..."
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="img">Añade una imagen si deseas:</label>
          <input
            type="url"
            name="img"
            placeholder="Añade una url..."
            id="img"
          />
        </div>
        <div>
          <label htmlFor="difficulty">Elige una dificultad:</label>
          <select
            name="difficulty"
            id="difficulty"
            onChange={handleInputChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <div>
          <label htmlFor="duration">Duracion:</label>
          <input
            type="number"
            name="duration"
            id="duration"
            min="0"
            placeholder="Escribe aquí..."
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="season">Temporada:</label>
          <select name="season" id="season" onChange={handleInputChange}>
            <option value="todo el año">Todo el año</option>
            <option value="invierno">Invierno</option>
            <option value="verano">Verano</option>
            <option value="otoño">Otoño</option>
            <option value="primavera">Primavera</option>
          </select>
        </div>
        <div>
          <label htmlFor="countriesId">Selecciona uno o varios paises:</label>
          <select
            name="countriesId"
            id="countriesId"
            onChange={handleCountriesId}
          >
            {filtrar?.map((pais) => {
              return (
                <option key={pais.id} value={pais.id}>
                  {pais.name}
                </option>
              );
            })}
          </select>
        </div>

        <button type="submit">Crear actividad</button>
      </form>
    </>
  );
}

export default FormActivities;
