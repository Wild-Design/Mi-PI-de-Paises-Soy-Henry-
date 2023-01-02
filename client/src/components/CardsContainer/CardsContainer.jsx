import style from "./CardsContainer.module.css";
import CardCountry from "../CardCountry/CardCountry";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCountries } from "../../Redux/actions/actions";
import { Link } from "react-router-dom";
import Paginado from "../Paginado/Paginado";
import NotFound2 from "../../images/NotFound2.gif";

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
  useEffect(() => {
    setPaginaActual(1);
  }, [traerTodo]);

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
          if (pais.id === "No encontrado") {
            return (
              <Link key={pais.id} className={style.notFound} to={`/home`}>
                <img src={NotFound2} alt="NotFound" />
                <div>
                  <h3>Pais no encontrado!</h3>
                  <p>No hay coincidencias con ese nombre</p>
                </div>
              </Link>
            );
          }
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
