import axios from "axios";
import { useRef, useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const INITIAL_LIMIT = 28;
const INCREASE_LIMIT = 20;

const Pokemons = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [types, setTypes] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedAbility, setSelectedAbility] = useState(""); 

  const targetObserver = useRef(null);
  const entry = useIntersectionObserver(targetObserver, {});
  const isVisible = !!entry?.isIntersecting;

  const pokemonsByName = allPokemons.filter((pokemon) =>
    pokemon.name.includes(pokemonName)
  );

  const handleChangePokemonName = (e) => {
    const { value } = e.target;
    setPokemonName(value.toLowerCase());
    if (value.trim() !== "") {
      const filteredSuggestions = allPokemons.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
      if (filteredSuggestions.length === 0) {
        const randomPokemons = getRandomPokemons(allPokemons, 2);
        setErrorMessage(
          `Your character doesn't exist. Maybe you want to see: ${randomPokemons.join(
            ", "
          )}`
        );
      } else {
        setErrorMessage("");
      }
    } else {
      setSuggestions([]);
      setErrorMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      e.preventDefault();
      const selected = suggestions[highlightedIndex];
      setSelectedPokemon(selected);
      setPokemonName(selected.name);
      setSuggestions([]);
      setHighlightedIndex(-1);
    }
  };

  const handleSuggestionClick = (index) => {
    const selected = suggestions[index];
    setSelectedPokemon(selected);
    setPokemonName(selected.name);
    setSuggestions([]);
    setHighlightedIndex(-1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedType(selectedType);
    setSelectedAbility(""); 
    setPokemonName(""); 
    
    axios
      .get(`https://pokeapi.co/api/v2/type/${selectedType}`)
      .then(({ data }) => setAllPokemons(data.pokemon.map(p => p.pokemon)))
      .catch((err) => console.log(err));
  };

  const handleAbilityChange = (e) => {
    const selectedAbility = e.target.value;
    setSelectedAbility(selectedAbility);
    setSelectedType(""); 
    setPokemonName(""); 
    
    axios
      .get(`https://pokeapi.co/api/v2/ability/${selectedAbility}`)
      .then(({ data }) => setAllPokemons(data.pokemon.map(p => p.pokemon)))
      .catch((err) => console.log(err));
  };

  const getRandomPokemons = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((pokemon) => pokemon.name);
  };

  useEffect(() => {
    
    axios
      .get(`https://pokeapi.co/api/v2/type`)
      .then(({ data }) => setTypes(data.results))
      .catch((err) => console.log(err));

   
    axios
      .get(`https://pokeapi.co/api/v2/ability`)
      .then(({ data }) => setAbilities(data.results))
      .catch((err) => console.log(err));

    
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${INITIAL_LIMIT}&offset=${(currentPage - 1) * INITIAL_LIMIT}`)
      .then(({ data }) => setAllPokemons(data.results))
      .catch((err) => console.log(err));
  }, [currentPage]);

  useEffect(() => {
    const maxPokemons = allPokemons.length;
    if (isVisible && maxPokemons !== 0) {
      const newLimit = limit + INCREASE_LIMIT;
      newLimit > maxPokemons ? setLimit(maxPokemons) : setLimit(newLimit);
    }
  }, [isVisible, limit, allPokemons]);

  useEffect(() => {
    setLimit(INITIAL_LIMIT);
  }, [pokemonName]);

  useEffect(() => {
    if (selectedPokemon) {
      setPokemonName(selectedPokemon.name);
    }
  }, [selectedPokemon]);

  return (
    <section className="search">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="search-input">
          <input
            className="search-writter
"
            type="text"
            autoComplete="off"
            placeholder="Search your Pokemon"
            name="pokemonName"
            value={pokemonName}
            onChange={handleChangePokemonName}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="search-btn bg-red-500 shadow-lg shadow-red-500/50 hover:bg-red-400 transition-colors"
          >
            <box-icon name='search' color='white'></box-icon>
          </button>
        </div>
      </form>
      {errorMessage && suggestions.length === 0 && (
        <div className="error-message">
          <p>{
errorMessage}</p>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="suggestions">
          <ul>
            {suggestions.map((pokemon, index) => (
              <li
                key={pokemon.url}
                className={highlightedIndex === index ? "highlighted" : ""}
                onClick={() => handleSuggestionClick(index)}
              >
                {pokemon.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="pagination-buttons">
      <div className="categories">
        <div className="category">
          <h3>Types:</h3>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">Select a type </option>
            {types.map((type) => (
              <option key={type.name} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
    
      
      <div className="category">
          <h3>Abilities:</h3>
          <select value={selectedAbility} onChange={handleAbilityChange}>
            <option value="">Select an ability</option>
            {abilities.map((ability) => (
              <option key={ability.name} value={ability.name}>
                {ability.name}
              </option>
            ))}
          </select>
        </div>
      </div>
        <div className="page-btn">
        <button className="pagination-button activate" onClick={handlePrevPage} disabled={currentPage === 1}><box-icon name='left-arrow-alt' color='white' ></box-icon></button>
        <button className="pagination-button " onClick={handleNextPage}><box-icon name='right-arrow-alt' color='white'></box-icon></button>
        </div>
        </div>
      <PokemonList pokemons={pokemonsByName.slice(0, limit)} selectedType={selectedType} />

      {/* Target Observer */}
      <span ref={targetObserver}></span>
    </section>
  );
};

export default Pokemons;
