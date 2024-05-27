import usePokemonContext from "../hooks/usePokemonContext";

const Evolutions = ({ evolutions }) => {
  const { showPokemon } = usePokemonContext();

  return (
    <div className="content-lv flex justify-center items-center gap-2 flex-wrap">
      {evolutions.map((evolution, index) => (
        <article key={evolution.name} className="flex gap-2 items-center">
          {index !== 0 && (
            <div className=" bg-[rgba(255,255,255,0.5)] p-2 rounded-full text-sm font-bold">
              <span>Lv. {evolution.min_level} </span>
            </div>
          )}
          <button
            onClick={() => showPokemon(evolution.pokemonInfo)}
            className="hover:bg-[rgba(255,255,255,0.5)] transition-colors rounded-3xl"
          >
            <img src={evolution.image} alt="" />
          </button>
          
        </article>
      ))}
    </div>
  );
};
export default Evolutions;