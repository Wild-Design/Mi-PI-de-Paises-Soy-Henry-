import style from "./FormActivities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getAllCountries } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const VALIDADOR = (input) => {
  const validaQueSeanSoloLetras = new RegExp(/^[A-Z]+$/i);
  const validaSoloNumerosEntre1Y5 = /^[1-5]$/;
  let errors = {};

  if (!input.name) {
    errors.name = "Nombre obligatorio";
  } else if (!validaQueSeanSoloLetras.test(input.name)) {
    errors.name = "Debe contener solo letras";
  }

  if (!input.difficulty) {
    errors.difficulty = "Campo obligatorio";
  } else if (!validaSoloNumerosEntre1Y5.test(input.difficulty)) {
    errors.difficulty = "Error, Solo se permiten usar las opciones disponibles";
  }

  if (!input.duration) {
    errors.duration = "Campo obligatorio";
  } else if (!parseInt(input.duration)) {
    errors.duration = "Solo se permiten numeros mayores a 0";
  }

  if (!input.season) {
    errors.season = "Campo obligatorio";
  } else if (
    !["invierno", "verano", "otoño", "primavera", "todo el año"].includes(
      input.season
    )
  ) {
    errors.season = "Error, Solo se permiten usar las opciones disponibles";
  }

  return errors;
};

function FormActivities() {
  // const RESPUESTA_DE_POST = useSelector((state) => state.activitiesResponse);

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

  const [created, setCreated] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    const propiedad = event.target.name;
    setInput({ ...input, [propiedad]: value });
    setErrors(VALIDADOR({ ...input, [propiedad]: value }));
  };

  const handleCountriesId = (event) => {
    const value = event.target.value;
    setInput({
      ...input,
      countriesId: [...input.countriesId, value],
    });
  };

  const SUBMIT_VALIDATOR = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(postActivity(input));
      setCreated(true);
    } else {
      return alert("Debes completar todos los campos del formulario!");
    }
  };

  return created ? (
    <div className={style.createdContainer}>
      <h3>ACTIVIDAD CREADA</h3>
      <Link to="/home">
        <button>Volver al Home</button>
      </Link>
    </div>
  ) : (
    <>
      <Link to="/home">
        <button>⬅️Atrás</button>
      </Link>

      <h2>Crea actividades!{created}</h2>
      <form onSubmit={SUBMIT_VALIDATOR} className={style.formContainer}>
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
          <p className={style.error}>{errors.name}</p>
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
          <p className={style.error}>{errors.difficulty}</p>
        </div>
        <div>
          <label htmlFor="duration">Duracion:</label>
          <input
            type="number"
            name="duration"
            id="duration"
            min="0"
            placeholder="Elije duración..."
            onChange={handleInputChange}
          />
          <p className={style.error}>{errors.duration}</p>
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
          <p className={style.error}>{errors.season}</p>
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
          <p className={style.error}>{errors.countriesId}</p>
        </div>
        <button type="submit">Crear actividad</button>
      </form>
    </>
  );
}

export default FormActivities;
