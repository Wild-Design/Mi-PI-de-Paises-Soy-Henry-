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
      <input
        onChange={(event) => handleInputChange(event)}
        type="text"
        placeholder="Busca un pais aquí..."
      />
    </div>
  );
};

export default Search;
