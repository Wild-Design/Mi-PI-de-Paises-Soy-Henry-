import style from "./NavBar.module.css";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCountries, getActivities } from "../../Redux/actions/actions";

const NavBar = () => {
  const dispatch = useDispatch();

  // const ORDENAR = (event) => {
  //   const value = event.target.value;
  //   dispatch(ordenarPorLoQueLlegue(value));
  // };

  const ORDENAMIENTOS = (event) => {
    const value = event.target.value;
    dispatch(getAllCountries(value));
  };

  const FILTRAR_ACTIVIDADES = () => {
    dispatch(getActivities());
  };
  return (
    <nav className={style.navBarContainer}>
      <div>
        <select onChange={ORDENAMIENTOS}>
          <option>Ordenar paises por:</option>
          <option value="MAYOR-P">Mayor Poblacion</option>
          <option value="MENOR-P">Menor Poblacion</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <div>
          <label htmlFor="activities">Actividades creadas</label>
          <input
            type="checkbox"
            name="activities"
            id="activities"
            value="Actividades"
            onChange={FILTRAR_ACTIVIDADES}
          />
        </div>

        <Search />
        <Link to="/activities">
          <button>Crear Actividad</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
