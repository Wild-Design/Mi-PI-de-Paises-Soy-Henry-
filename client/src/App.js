import Welcome from "./components/Welcome/Welcome.jsx";
import Home from "./components/Home/Home.jsx";
import FormActivities from "./components/FormActivities/FormActivities.jsx";
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx";
import { Routes, Route } from "react-router-dom";

function App(props) {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/activities" element={<FormActivities />} />
        <Route exact path="/detail/:id" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
