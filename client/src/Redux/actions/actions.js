import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRIES_NAME = "GET_COUNTRIES_NAME";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const ORDENAR_POR_LO_QUE_LLEGUE = "ORDENAR_POR_LO_QUE_LLEGUE";

export const getAllCountries = (inputValue) => {
  return async (dispatch) => {
    try {
      const API = await axios.get("http://localhost:3001/countries/");
      const RESPONSE = API.data;

      if (inputValue === "MAYOR-P") {
        const mayorP = RESPONSE.sort((a, b) => {
          return b.population - a.population;
        });
        return dispatch({
          type: GET_ALL_COUNTRIES,
          payload: mayorP,
        });
      }
      if (inputValue === "MENOR-P") {
        const menorP = RESPONSE.sort((a, b) => {
          return a.population - b.population;
        });
        return dispatch({
          type: GET_ALL_COUNTRIES,
          payload: menorP,
        });
      }
      if (inputValue === "A-Z") {
        const AZ = RESPONSE.sort((a, b) => a.name.localeCompare(b.name));
        return dispatch({
          type: GET_ALL_COUNTRIES,
          payload: AZ,
        });
      }
      if (inputValue === "Z-A") {
        const ZA = RESPONSE.sort((a, b) => b.name.localeCompare(a.name));
        return dispatch({
          type: GET_ALL_COUNTRIES,
          payload: ZA,
        });
      } else {
        return dispatch({
          type: GET_ALL_COUNTRIES,
          payload: RESPONSE,
        });
      }
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getCountriesName = (name) => {
  return async (dispatch) => {
    try {
      const API = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      const RESPONSE = API.data;
      return dispatch({
        type: GET_COUNTRIES_NAME,
        payload: RESPONSE,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getCountryId = (id) => {
  return async (dispatch) => {
    try {
      const API = await axios.get(`http://localhost:3001/countries/${id}`);
      const RESPONSE = API.data;
      return dispatch({
        type: GET_COUNTRY_ID,
        payload: RESPONSE,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const API = await axios.get("http://localhost:3001/activities");
      const RESPONSE = API.data;
      return dispatch({
        type: GET_ACTIVITIES,
        payload: RESPONSE,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const postActivity = (body) => {
  return async (dispatch) => {
    try {
      const POST = await axios.post(`http://localhost:3001/activities`, body);
      const RESPONSE = POST.data;
      return dispatch({
        type: POST_ACTIVITY,
        payload: RESPONSE,
      });
    } catch (error) {
      return { error: error.message };
    }
  };
};

export const ordenarPorLoQueLlegue = (inputValue) => {
  return {
    type: ORDENAR_POR_LO_QUE_LLEGUE,
    payload: inputValue,
  };
};
