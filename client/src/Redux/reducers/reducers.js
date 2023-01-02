import {
  GET_ALL_COUNTRIES,
  GET_COUNTRIES_NAME,
  GET_COUNTRY_ID,
  GET_ACTIVITIES,
  DELETE_ACTIVITY,
  FILTER_CONTINENT,
  POST_ACTIVITY,
  FILTRAR_ACTIVIDAD_POR_NOMBRE,
  MOSTRAR_PAISES_DEL_FORM,
  // ORDENAR_POR_LO_QUE_LLEGUE,
} from "../actions/actions.js";

const initialState = {
  countries: [],
  countriesCopy: [],
  countryDetail: {},
  activities: [],
  activitiesCopy: [],
  activitiesResponse: "", //La idea era usar este estado para responder de la respuesta del back
  paisesDelForm: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesCopy: action.payload, //Me guardo una copia de todos los paises para que no se pisen los filtrados
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
        activities: action.payload,
        activitiesCopy: action.payload,
      };
    case DELETE_ACTIVITY:
      return {
        ...state,
      };
    case FILTER_CONTINENT:
      if (action.payload === "") {
        return {
          ...state,
        };
      } else {
        const filtrar = state.countriesCopy.filter(
          (pais) => pais.continent === action.payload
        );
        return {
          ...state,
          countries: filtrar,
        };
      }

    case POST_ACTIVITY:
      return {
        ...state,
        activitiesResponse: action.payload,
      };

    case FILTRAR_ACTIVIDAD_POR_NOMBRE:
      const filtrar = state.activitiesCopy.filter((actividades) => {
        return actividades.name === action.payload;
      });
      if (action.payload === "") {
        return {
          ...state,
          activities: state.activitiesCopy, //Esto lo hago para reestablecer las actividades
        };
      } else {
        return {
          ...state,
          activities: filtrar,
        };
      }

    case MOSTRAR_PAISES_DEL_FORM:
      return {
        ...state,
        paisesDelForm: [...state.paisesDelForm, action.payload],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
