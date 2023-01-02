import CardActivity from "../CardActivity/CardActivity";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {
  getActivities,
  filtrarActividadPorNombre,
  deleteActivity,
} from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import style from "./CardsActivitiesContainer.module.css";

const CardsActivitiesContainer = () => {
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);
  const copyActivities = useSelector((state) => state.activitiesCopy);

  let nombresDeActividades = [];
  for (let i = 0; i < copyActivities.length; i++) {
    if (!nombresDeActividades.includes(copyActivities[i].name)) {
      nombresDeActividades.push(copyActivities[i].name);
    }
  } /* En este for mapeo la copia de actividades para solo traer los nombres en el input select
      si lo hago desde allActivities se me pierden los nombres de las actividades en el select*/

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleSelect = (event) => {
    const value = event.target.value;
    dispatch(filtrarActividadPorNombre(value));
  };

  const delete_activity = (id) => {
    dispatch(deleteActivity(id));
  };
  return (
    <div>
      {allActivities.length === 0 ? (
        <div className={style.createdContainer}>
          <div className={style.created}>
            <h3>Aun no hay actividades creadas</h3>
            <span>🙄</span>
            <div>
              <p>Puedes crearlas aquí ⬇️</p>
              <Link to="/formActivities">
                <button>Crear Actividad</button>
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
        <div className={style.container}>
          <div className={style.btnH2Container}>
            <Link to="/home">
              <button className={style.btn}>⬅️Atras</button>
            </Link>
            <h2 className={style.h2}>Actividades</h2>
            <div className={style.selectContainer}>
              <label htmlFor="activities">Filtrar por nombre:</label>
              <select
                className={style.select}
                id="activities"
                onChange={handleSelect}
              >
                <option value={""}>Todas</option>
                {nombresDeActividades?.map((actividad) => {
                  return (
                    <option key={actividad} value={actividad}>
                      {actividad}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <section className={style.activitiesContainer}>
            {allActivities?.map((actividad) => {
              return (
                <CardActivity
                  funcionBorradora={() => delete_activity(actividad.id)}
                  key={actividad.id}
                  img={actividad.img}
                  name={actividad.name}
                  difficulty={actividad.difficulty}
                  duration={actividad.duration}
                  season={actividad.season}
                />
              );
            })}
          </section>
        </div>
      )}
    </div>
  );
};

export default CardsActivitiesContainer;
