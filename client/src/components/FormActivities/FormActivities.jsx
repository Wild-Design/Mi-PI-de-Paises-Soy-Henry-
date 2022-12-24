import style from "./FormActivities.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getAllCountries } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function FormActivities() {
  // const RESPUESTA_DE_POST = useSelector((state) => state.activitiesResponse);

  const VALIDADOR = (input) => {
    const validaQueSeanSoloLetras = new RegExp(/^[A-Z]+$/i);
    const validaSoloNumerosEntre1Y5 = /^[1-5]$/;

    if (!input.name) {
      setErrors((errors.name = "Campo requerido"));
    }
    if (!validaQueSeanSoloLetras.test(input.name)) {
      errors.name = "Debe contener solo letras";
    } else {
      setErrors((errors.name = ""));
    }

    if (!input.countriesId.length) {
      setErrors((errors.countriesId = "Elije al menos un pais!"));
    } else {
      setErrors((errors.countriesId = ""));
    }

    if (!input.difficulty) {
      setErrors((errors.difficulty = "Campo requerido"));
    }
    if (!validaSoloNumerosEntre1Y5.test(input.difficulty)) {
      setErrors((errors.difficulty = "Numeros entre 1 y 5"));
    } else {
      setErrors((errors.difficulty = ""));
    }

    if (!input.duration) {
      setErrors((errors.duration = "Elige sus horas"));
    }
    if (input.duration < 1 || input.duration > 168) {
      setErrors((errors.duration = "Minimo de 1 hora, Maximo 168 horas"));
    } else {
      setErrors((errors.duration = ""));
    }

    if (!input.season) {
      setErrors((errors.season = "Campo requerido"));
    }
    if (
      !["invierno", "verano", "otoño", "primavera", "todo el año"].includes(
        input.season
      )
    ) {
      setErrors((errors.season = "Elije una de las opciones disponibles"));
    } else {
      setErrors((errors.season = ""));
    }

    return errors;
  };

  const todosLosPaises = useSelector((state) => state.countries);
  const filtrar = todosLosPaises?.sort((a, b) => a.name.localeCompare(b.name));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const [input, setInput] = useState({
    countriesId: [],
    name: "",
    difficulty: "",
    duration: "",
    season: "",
  });

  const [errors, setErrors] = useState({
    countriesId: "Campo requerido",
    name: "Campo requerido",
    difficulty: "Campo requerido",
    duration: "Campo requerido",
    season: "Campo requerido",
  });

  const [created, setCreated] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    const propiedad = event.target.name;
    if (propiedad === "countriesId") {
      setInput({
        ...input,
        countriesId: [...input.countriesId, value],
      });
      setErrors(VALIDADOR({ countriesId: [...input.countriesId, value] }));
    } else {
      setInput({ ...input, [propiedad]: value });
      setErrors(VALIDADOR({ ...input, [propiedad]: value }));
    }
  };

  const SUBMIT_VALIDATOR = (event) => {
    event.preventDefault();
    if (
      !errors.name &&
      !errors.countriesId.length &&
      !errors.difficulty &&
      !errors.duration &&
      !errors.season
    ) {
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
            name="name"
            id="name"
            placeholder="Escribe aqui..."
            autoComplete="off"
            onChange={handleInputChange}
          />
          <p className={errors.name && style.error}>{errors.name}</p>
        </div>
        <div>
          <label htmlFor="countriesId">Selecciona uno o varios paises:</label>
          <select
            name="countriesId"
            id="countriesId"
            onChange={handleInputChange}
          >
            {filtrar?.map((pais) => {
              return (
                <option key={pais.id} value={pais.id}>
                  {pais.name}
                </option>
              );
            })}
          </select>
          <p className={errors.countriesId && style.error}>
            {errors.countriesId}
          </p>
        </div>
        <div>
          <label htmlFor="difficulty">Elige una dificultad:</label>
          <select
            name="difficulty"
            id="difficulty"
            onChange={handleInputChange}
          >
            <option value={""}></option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <p className={errors.difficulty && style.error}>
            {errors.difficulty}
          </p>
        </div>
        <div>
          <label htmlFor="duration">Duracion:</label>
          <input
            type="number"
            name="duration"
            id="duration"
            min="0"
            placeholder="Elije duración..."
            autoComplete="off"
            onChange={handleInputChange}
          />
          <p className={errors.duration && style.error}>{errors.duration}</p>
        </div>
        <div>
          <label htmlFor="season">Temporada:</label>
          <select name="season" id="season" onChange={handleInputChange}>
            <option value={""}></option>
            <option value="todo el año">Todo el año</option>
            <option value="invierno">Invierno</option>
            <option value="verano">Verano</option>
            <option value="otoño">Otoño</option>
            <option value="primavera">Primavera</option>
          </select>
          <p className={errors.season && style.error}>{errors.season}</p>
        </div>

        <button type="submit">Crear actividad</button>
      </form>
    </>
  );
}

export default FormActivities;
