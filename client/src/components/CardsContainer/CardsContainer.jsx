import style from "./CardsContainer.module.css";
import CardCountry from "../CardCountry/CardCountry";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCountries } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import Paginado from "../Paginado/Paginado";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const traerTodo = useSelector((state) => state.countries);
  const [paginaActual, setPaginaActual] = useState(1);
  const [paisPorPagina] = useState(10);
  const indiceDelUltimoPais = paginaActual * paisPorPagina;
  const indiceDelPrimerPais = indiceDelUltimoPais - paisPorPagina;
  const paisesActuales = traerTodo.slice(
    indiceDelPrimerPais,
    indiceDelUltimoPais
  );

  const paginado = (numeroDePagina) => {
    setPaginaActual(numeroDePagina);
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div>
      <section>
        <Paginado
          paisPorPagina={paisPorPagina}
          traerTodo={traerTodo.length}
          paginado={paginado}
        />
      </section>
      <section className={style.cardsContainer}>
        {paisesActuales?.map((pais) => {
          return (
            <Link
              key={pais.id}
              className={style.link}
              to={`/detail/${pais.id}`}
            >
              <CardCountry
                id={pais.id}
                name={pais.name}
                img={pais.img[1]}
                continent={pais.continent}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default CardsContainer;
