import Welcome from "./components/Welcome/Welcome.jsx";
import Home from "./components/Home/Home.jsx";
import FormActivities from "./components/FormActivities/FormActivities.jsx";
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx";
import CardsActivitiesContainer from "./components/CardsActivitiesContainer/CardsActivitiesContainer.jsx";
import style from "./App.module.css";

import { Routes, Route } from "react-router-dom";

function App(props) {
  return (
    <div className={style.appContainer}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/formActivities" element={<FormActivities />} />
        <Route path="/detail/:id" element={<CountryDetail />} />
        <Route path="/activities" element={<CardsActivitiesContainer />} />
      </Routes>
    </div>
  );
}

export default App;
