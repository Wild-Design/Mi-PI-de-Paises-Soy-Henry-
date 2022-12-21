import style from "./NavBar.module.css";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCountries, filterContinent } from "../../Redux/actions/actions";

const NavBar = () => {
  // const ORDENAR = (event) => {
  //   const value = event.target.value;
  //   dispatch(ordenarPorLoQueLlegue(value));
  // };

  // const FILTRAR_ACTIVIDADES = (event) => {
  //   const value = event.target.checked;
  //   value ? dispatch(getActivities()) : dispatch(getAllCountries());
  // };
  const dispatch = useDispatch();

  const ORDENAMIENTOS = (event) => {
    const value = event.target.value;
    dispatch(getAllCountries(value));
  };

  const FILTRAR_POR_CONTINENTE = (event) => {
    const value = event.target.value;
    dispatch(filterContinent(value));
  };
  return (
    <nav className={style.navBarContainer}>
      <div>
        <select onChange={ORDENAMIENTOS}>
          <option value={""}>Ordenar paises por:</option>
          <option value="MAYOR-P">Mayor Poblacion</option>
          <option value="MENOR-P">Menor Poblacion</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        {/* <div>
          <label htmlFor="activities">Actividades creadas</label>
          <input
            type="checkbox"
            name="activities"
            id="activities"
            value="Actividades"
            onChange={FILTRAR_ACTIVIDADES}
          />
        </div> */}
        <select onChange={FILTRAR_POR_CONTINENTE}>
          <option value={""}>Filtrar por continente:</option>
          <option value="North America">North America</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="South America">South America</option>
        </select>

        <Link to="/activities">
          <button>Ver Actividades Creadas</button>
        </Link>

        <Search />
        <Link to="/formActivities">
          <button>Crear Actividad</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
