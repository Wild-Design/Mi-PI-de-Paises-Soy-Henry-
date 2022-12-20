import CardActivity from "../CardActivity/CardActivity";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getActivities } from "../../Redux/actions/actions";
import { useSelector, useDispatch } from "react-redux";

const CardsActivitiesContainer = () => {
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>⬅️Atras</button>
      </Link>

      <h2>Actividades</h2>
      {allActivities?.map((actividad) => {
        return (
          <CardActivity
            key={actividad.id}
            img={actividad.img}
            name={actividad.name}
            difficulty={actividad.difficulty}
            duration={actividad.duration}
            season={actividad.season}
          />
        );
      })}
    </div>
  );
};

export default CardsActivitiesContainer;
