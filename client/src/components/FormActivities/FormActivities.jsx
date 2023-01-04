import style from "./FormActivities.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postActivity,
  getAllCountries,
  mostrarPaisesDelForm,
} from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import imagen from "../../images/backgroundFormulario.jpg";

function FormActivities() {
  const VALIDADOR = (input) => {
    const validaQueSeanSoloLetras = new RegExp("[a-zA-Z ]{2,254}");
    const validaSoloNumerosEntre1Y5 = /^[1-5]$/;

    if (!input.name) {
      setErrors((errors.name = "Campo requerido"));
    }
    if (!validaQueSeanSoloLetras.test(input.name)) {
      setErrors((errors.name = "Debe contener solo letras"));
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
      setErrors((errors.difficulty = "Completa con opciones disponibles"));
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
      setErrors((errors.season = "Completa con opciones disponibles"));
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
    countriesId: "Requerido",
    name: "Requerido",
    difficulty: "Requerido",
    duration: "Requerido",
    season: "Requerido",
  });

  const [created, setCreated] = useState("");

  const [nombresDePaises, setNombresDePaises] = useState([]);

  const pushearNombres = (name) => {
    if (name !== undefined) {
      setNombresDePaises([...nombresDePaises, name]);
    }
  }; /*Con esta función agrego al costadito los paises */

  const limpiarPaises = () => {
    setInput({ ...input, countriesId: [] });
    setNombresDePaises([]);
  }; /*Con esta funcion receteo los paises que se van agregando al costadito y el input de ids tambien */

  const handleInputChange = (event) => {
    const value = event.target.value.split(",")[0];
    pushearNombres(event.target.value.split(",")[1]);
    const propiedad = event.target.name;
    if (propiedad === "countriesId") {
      setInput({
        ...input,
        countriesId: [...input.countriesId, value],
      });
      setErrors(VALIDADOR({ countriesId: [...input.countriesId, value] }));

      dispatch(mostrarPaisesDelForm(value));
    } else {
      setInput({ ...input, [propiedad]: value });
      setErrors(VALIDADOR({ ...input, [propiedad]: value }));
    }
  };

  const SUBMIT_VALIDATOR = (event) => {
    event.preventDefault();
    if (
      input.countriesId.length >= 1 &&
      input.name.length >= 2 &&
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
      <div className={style.created}>
        <h3>Actividad creada correctamente :)</h3>
        <span>😁</span>
        <div>
          <p>Puedes buscarla aquí ⬇️</p>
          <Link to="/activities">
            <button>Ver actividades</button>
          </Link>
        </div>
        <div>
          <p>O puedes regresar al home</p>
          <Link to="/home">
            <button className={style.ultimoBoton}>Regresar al Home</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Link to="/home">
        <button className={style.btn}>⬅️Atrás</button>
      </Link>
      <img src={imagen} alt="imagen" className={style.imagen} />
      <div className={style.container}>
        <div className={style.coso}>
          <h2 className={style.h2}>Crea una activiadad turística{created}</h2>
          <form onSubmit={SUBMIT_VALIDATOR} className={style.formContainer}>
            <div>
              <div className={style.nameContainer}>
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
            </div>
            <div className={style.idsContainer}>
              <label htmlFor="countriesId">
                Selecciona uno o varios paises:
              </label>
              <select
                name="countriesId"
                id="countriesId"
                onChange={handleInputChange}
              >
                {filtrar?.map((pais) => {
                  return (
                    <option
                      key={pais.id}
                      name={pais.name}
                      value={[pais.id, pais.name]}
                    >
                      {pais.name}
                    </option>
                  );
                })}
              </select>
              <p className={errors.countriesId && style.error}>
                {errors.countriesId}
              </p>
            </div>

            <div className={style.pequeñosContainer}>
              <div className={style.difficultyContainer}>
                <label htmlFor="difficulty">Elige una dificultad:</label>
                <select
                  name="difficulty"
                  id="difficulty"
                  onChange={handleInputChange}
                >
                  <option value={""}></option>
                  <option value={1}>Muy Facil</option>
                  <option value={2}>Facil</option>
                  <option value={3}>Normal</option>
                  <option value={4}>Dificil</option>
                  <option value={5}>Muy Dificil</option>
                </select>
                <p className={errors.difficulty && style.error}>
                  {errors.difficulty}
                </p>
              </div>
              <div>
                <div className={style.seasonContainer}>
                  <label htmlFor="season">Temporada:</label>
                  <select
                    name="season"
                    id="season"
                    onChange={handleInputChange}
                  >
                    <option value={""}></option>
                    <option value="todo el año">Todo el año</option>
                    <option value="invierno">Invierno</option>
                    <option value="verano">Verano</option>
                    <option value="otoño">Otoño</option>
                    <option value="primavera">Primavera</option>
                  </select>
                  <p className={errors.season && style.error}>
                    {errors.season}
                  </p>
                </div>
              </div>
            </div>
            <div className={style.durationContainer}>
              <div className={style.labelDuration}>
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
                <p className={errors.duration && style.error}>
                  {errors.duration}
                </p>
              </div>
            </div>
            <div className={style.submitContainer}>
              <button className={style.submit} type="submit">
                Crear actividad
              </button>
            </div>
          </form>
        </div>

        {nombresDePaises.length ? (
          <div className={style.ulContainer}>
            <ul className={style.nombresDePaises}>
              {nombresDePaises?.map((nombre, index) => (
                <li key={index}>{nombre}</li>
              ))}
            </ul>
            <button className={style.resetear} onClick={limpiarPaises}>
              Resetear
            </button>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}

export default FormActivities;
