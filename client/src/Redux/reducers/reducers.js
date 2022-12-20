import {
  GET_ALL_COUNTRIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRY_ID,
  GET_ACTIVITIES,
  POST_ACTIVITY,
  // ORDENAR_POR_LO_QUE_LLEGUE,
} from "../actions/actions.js";

const initialState = {
  countries: [],
  countriesCopy: [],
  countryDetail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesCopy: action.payload,
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
    case GET_ACTIVITIES:
      return {
        ...state,
        countries: action.payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    // case ORDENAR_POR_LO_QUE_LLEGUE:
    //   const countries = state.countries;
    //   if (action.payload === "A-Z") {
    //     const AZ = countries.sort((a, b) => a.name.localeCompare(b.name));
    //     console.log(AZ);
    //     return {
    //       ...state,
    //       countries: AZ,
    //     };
    //   }
    //   if (action.payload === "Z-A") {
    //     const ZA = countries.sort((a, b) => b.name.localeCompare(a.name));
    //     console.log(ZA);
    //     return {
    //       ...state,
    //       countries: ZA,
    //     };
    //   }
    //   break;

    default:
      return { ...state };
  }
};

export default rootReducer;
