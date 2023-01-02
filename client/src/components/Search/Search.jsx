import style from "./Search.module.css";
import { useDispatch } from "react-redux";
import { getCountriesName } from "../../Redux/actions/actions";

const Search = () => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    dispatch(getCountriesName(event.target.value));
  };

  return (
    <div className={style.searchContainer}>
      <label htmlFor="search">Busca paises:🔍</label>
      <input
        onChange={(event) => handleInputChange(event)}
        type="text"
        id="search"
        autoComplete="off"
        placeholder="Busca aquí..."
      />
    </div>
  );
};

export default Search;
