import style from "./CardCountry.module.css";

const CardCountry = ({ img, name, continent }) => {
  return (
    <div className={style.cardContainer}>
      <img className={style.img} src={img} alt={`Imagen de ${name}`} />
      <div>
        <h3>{name}</h3>
        <p>{continent}</p>
      </div>
    </div>
  );
};

export default CardCountry;
