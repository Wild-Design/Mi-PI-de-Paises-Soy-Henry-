import style from "./NavBar.module.css";
import Search from "../Search/Search";
import { useDispatch } from "react-redux";
import { filtrarPorLoQueLlegue } from "../../Redux/actions/actions";

const NavBar = () => {
  const dispatch = useDispatch();

  const filtrar = (event) => {
    dispatch(filtrarPorLoQueLlegue(event.target.value));
  };

  return (
    <nav className={style.navBarContainer}>
      <div>
        <select onChange={(event) => filtrar(event)} name="ordenar">
          <option>Ordenar paises por:</option>
          <option value="Mayor Poblacion">Mayor Poblacion</option>
          <option value="Menor Población">Menor Poblacion</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <Search />
      </div>
    </nav>
  );
};

export default NavBar;
