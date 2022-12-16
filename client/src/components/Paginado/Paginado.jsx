import style from "./Paginado.module.css";

const Paginado = ({ paisPorPagina, traerTodo, paginado }) => {
  const numerosDePagina = [];
  for (let i = 0; i < Math.ceil(traerTodo / paisPorPagina); i++) {
    numerosDePagina.push(i + 1);
  }

  return (
    <ul className={style.paginadoContainer}>
      {numerosDePagina &&
        numerosDePagina.map((numero) => {
          return (
            <li className={style.li} key={numero}>
              <button className={style.buttons} onClick={() => paginado(numero)}>{numero}</button>
            </li>
          );
        })}
    </ul>
  );
};

export default Paginado;
