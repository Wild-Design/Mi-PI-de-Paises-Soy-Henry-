import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCountryId } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

const CountryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountryId(id));
  }, [dispatch, id]);
  const traerDetalle = useSelector((state) => state.countryDetail);

  return Object.entries(traerDetalle).length > 0 ? (
    <div>
      <span>{traerDetalle.id}</span>
      <img src={traerDetalle.img[1]} alt={`Imagen de ${traerDetalle.name}`} />
      <h3>{`Nombre: ${traerDetalle.name}`}</h3>
      <p>{`Capital: ${traerDetalle.capital}`}</p>
      <p>{`Subregion: ${traerDetalle.subregion}`}</p>
      <p>{`Area: ${traerDetalle.area} km/2`}</p>
      <p>{`Poblacion: ${traerDetalle.population} Personas`}</p>
      {traerDetalle.activities?.map((actividad) => {
        return (
          <div key={actividad.id}>
            <h4>Actividades:</h4>
            <h3>{`Nombre: ${actividad.name}`}</h3>
            <p>{`Dificultad: ${actividad.difficulty}`}</p>
            <p>{`Duracion: ${actividad.duration}`}</p>
            <p>{`Temporada: ${actividad.season}`}</p>
          </div>
        );
      })}
    </div>
  ) : (
    <h4>Cargando...</h4>
  );
};

export default CountryDetail;
