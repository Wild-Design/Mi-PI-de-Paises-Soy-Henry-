const CardActivity = ({ img, name, difficulty, duration, season }) => {
  return (
    <div>
      <img src={img} alt={name} />
      <h3>{`Nombre: ${name}`}</h3>
      <p>{`Dificultad: ${difficulty}`}</p>
      <p>{`Duracion: ${duration}`}</p>
      <p>{`Temporada: ${season}`}</p>
    </div>
  );
};

export default CardActivity;
