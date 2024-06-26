import PokemonDetail from "./PokemonDetail";

const Aside = ({ pokemon, isLoading }) => {
  return (
    <section className="aside">
      <article
        className={`aside-info ${
          pokemon && !isLoading ? "left-0" : "left-[50vw]"
        }`}
      >
        <PokemonDetail pokemon={pokemon} />
      </article>
      <article
        className={`aside-select absolute z-20  w-full h-[85%] text-center grid place-content-center transition-all duration-500 ${
          pokemon ? "left-[50vw]" : "left-0"
        }`}
      >
        <header className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[70%] scale-90">
          <img src="./images/no-pokemon-selected.png" alt="" />
        </header>

        <span className="aside-text ext-lg px-20">
          Select a Pokemon to display here.
        </span>
      </article>

      {/* Loader */}
      <div className="w-[60px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <img
          className="contrast-100 animate-spin-slow"
          src="./images/pokeball.png"
          alt=""
        />
      </div>
    </section>
  );
};
export default Aside;