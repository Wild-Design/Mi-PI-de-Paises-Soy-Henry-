import {
  GET_ALL_COUNTRIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRY_ID,
  FILTRAR_POR_LO_QUE_LLEGUE,
} from "../actions/actions.js";

const initialState = {
  countries: [],
  countryDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRIES_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY_ID:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case FILTRAR_POR_LO_QUE_LLEGUE:
      if (action.payload === "A-Z") {
        const AZ = initialState.countries.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        return {
          ...state,
          countries: AZ,
        };
      }
      break;

    default:
      return { ...state };
  }
};

export default rootReducer;
