import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRIES_NAME = "GET_COUNTRIES_NAME";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const FILTRAR_POR_LO_QUE_LLEGUE = "FILTRAR_POR_LO_QUE_YEGUE";

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const API = await axios.get("http://localhost:3001/countries/");
      const RESPONSE = API.data;
      return dispatch({
        type: GET_ALL_COUNTRIES,
        payload: RESPONSE,
      });
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

export const filtrarPorLoQueLlegue = (inputValue) => {
  return {
    type: FILTRAR_POR_LO_QUE_LLEGUE,
    payload: inputValue,
  };
};
