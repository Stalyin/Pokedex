import { colorByStat, colorByType } from "../constants/pokemon";
import Evolutions from "./Evolutions";

const PokemonDetail = ({ pokemon }) => {
  return (
    <>
      <header className="absolute left-1/2 -translate-x-1/2 -translate-y-[92%] scale-[180%]">
        <img className="pixelated" src={pokemon?.image} alt="" />
      </header>
      <div className="poke-id overflow-y-auto px-4 pt-12 grid gap-2 content-start h-full hidden-scroll">
        <span className=" text-slate-100  text-sm font-semibold">
          N° {pokemon?.id}
        </span>
        <h2 className="font-bold text-2xl capitalize">{pokemon?.name}</h2>
        <ul className="flex gap-2 justify-center">
          {pokemon?.types.map((type) => (
            <li
              className={`text-white p-1 rounded-lg px-2 text-sm ${colorByType[type]}`}
              key={type}
            >
              {type}
            </li>
          ))}
        </ul>
        <div className="poke-description">
          <h4 className="font-semibold capitalize">Pokedex Entry</h4>
          <p className="text-white">{pokemon?.description}</p>
        </div>
        {/* Altura y peso */}
        <section className="content-info grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <h4 className="font-semibold capitalize">Height</h4>
            <span className="bg-[rgba(255,255,255,0.5)] block rounded-full p-1">0.7m</span>
          </div>
          <div className="grid gap-2">
            <h4 className="font-semibold capitalize">Weight</h4>
            <span className="bg-[rgba(255,255,255,0.5)] block rounded-full p-1">6.9kg</span>
          </div>
        </section>
        {/* Habilidades */}
        <section className="content-abilities grid gap-2">
          <h4 className="font-semibold capitalize">Abilities</h4>
          <ul className="grid grid-cols-2 gap-4">
            {pokemon?.abilities.map((ability) => (
              <li
                key={ability}
                className="bg-[rgba(255,255,255,0.5)] block rounded-full p-1 capitalize"
              >
                <span>{ability}</span>
              </li>
            ))}
          </ul>
        </section>
        {/* Stats */}
        <section className="content-stats grid gap-2">
          <h4 className=" font-semibold capitalize">Stats</h4>
          <ul className="flex justify-center gap-3 flex-wrap">
            {pokemon?.stats.map((stat) => (
              <li
                className={`bg-[rgba(255,255,255,0.5)] p-1 rounded-full ${colorByStat[stat.name]}`}
                key={stat.name}
              >
                <div className="stats-text bg-green-500 rounded-full w-[26px] aspect-square grid place-content-center">
                  <span className="text-[10px] text-white font-medium">
                    {stat.name}
                  </span>
                </div>
                <span className="font-bold text-xs">{stat.base_stat}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="grid gap-2">
          <h4 className="font-semibold capitalize">Select the evolution</h4>
          <Evolutions evolutions={pokemon?.evolutions ?? []} />
        </section>
      </div>
    </>
  );
};
export default PokemonDetail;
