import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountryId } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import style from "./CountryDetail.module.css";
import Loading from "../../images/loadingHome.gif";

const CountryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryId(id));
  }, [dispatch, id]);
  const traerDetalle = useSelector((state) => state.countryDetail);

  return Object.entries(traerDetalle).length > 0 ? (
    <div>
      <Link to="/home">
        <button className={style.boton}>⬅️Home</button>
      </Link>
      <div className={style.allContainer}>
        <div className={style.detailContainer}>
          <div>
            <div className={style.idContainer}>
              <span className={style.id}>{traerDetalle.id}</span>
            </div>

            <img
              className={style.imgDetail}
              src={traerDetalle.img[0]}
              alt={`Imagen de ${traerDetalle.name}`}
            />
          </div>
          <div className={style.parrafosDetail}>
            <h3>{`Nombre: ${traerDetalle.name}`}</h3>
            <p>{`Capital: ${traerDetalle.capital}`}</p>
            <p>{`Subregion: ${traerDetalle.subregion}`}</p>
            <p>{`Area: ${traerDetalle.area} km/2`}</p>
            <p>{`Poblacion: ${traerDetalle.population} Personas`}</p>
          </div>
        </div>
        <div className={style.activitiesContainer}>
          {traerDetalle.activities?.map((actividad) => {
            return (
              <div className={style.activities} key={actividad.id}>
                <img
                  className={style.imgActivity}
                  src={actividad.img}
                  alt={actividad.name}
                />
                <div className={style.activitiesParrafos}>
                  <p>
                    Actividad: <strong>{`${actividad.name}`}</strong>
                  </p>
                  <p>{`Dificultad: ${actividad.difficulty}`}</p>
                  <p>{`Duracion: ${actividad.duration}`}</p>
                  <p>{`Temporada: ${actividad.season}`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h4>Cargando...</h4>
      <img src={Loading} alt="Loading" />
    </div>
  );
};

export default CountryDetail;
