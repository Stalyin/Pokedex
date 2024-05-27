import { useState } from 'react';
import 'boxicons';
import Aside from "./components/Aside";
import ModalPokemon from "./components/ModalPokemon";
import Pokemons from "./components/Pokemons";
import Welcome from "./components/Welcome";
import usePokemonContext from "./hooks/usePokemonContext";
import './App.css';

function App() {
  const { showDetailPokemon, closePokemonDetail, pokemonDetail, isLoading } = usePokemonContext();
  const [isWelcomeComplete, setIsWelcomeComplete] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNameSubmit = (name) => {
    if (name.trim() !== '') {
      setUserName(name);
      setShowWelcomeMessage(true);
      setTimeout(() => {
        setIsWelcomeComplete(true);
      }, 1000);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <section className="container-ft">
      <header className='banner'>
        <div className='banner-logo'>
          <img className='logo' src="./images/logo.png" alt="Logo" />
          <div className='hamburger-menu' onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        </div>
        <div className={`banner-list ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="https://pokemongolive.com/?hl=es" target='blank'>Games</a></li>
            <li><a href="https://pokemon-project.com/episodios/" target='blank'>Movies</a></li>
            <li><a href="https://es.wikipedia.org/wiki/Pok%C3%A9mon" target='blank'>History</a></li>
            <li><a href="https://pokeapi.co/" target='blank'>API</a></li>
          </ul>
        </div>
      
        <div className='banner-img2'>
          <img className='banner-img' src="./images/banner.png" alt="Banner" />
        </div>
      </header>

      {!isWelcomeComplete ? (
        <>
          <Welcome onNameSubmit={handleNameSubmit} />

        </>
      ) : (
        <main className="cards-container">
          <Pokemons />
          <Aside pokemon={pokemonDetail} isLoading={isLoading} />
          <ModalPokemon
            showModal={showDetailPokemon}
            onCloseModal={closePokemonDetail}
            pokemon={pokemonDetail}
          />
        </main>
      )}

      <footer className="footer">
        <div className='footer-logo'>
          <img src="./images/pokemons.png" alt="Pokemons" />
        </div>
        <div className='footer-info'>
          <ul>
            <h2>InfoPokemon</h2>
            <li><a href="#https://pokemongolive.com/?hl=es" target='blank'>Games</a></li>
            <li><a href="https://pokemon-project.com/episodios/" target='blank'>Movies</a></li>
            <li><a href="https://es.wikipedia.org/wiki/Pok%C3%A9mon" target='blank'>History</a></li>
          </ul>
          <ul>
            <h2>Downloads</h2>
            <li><a href="https://www.pngwing.com/es/search?q=pokemon#google_vignette" target='blank'>Images</a></li>
            <li><a href="https://youtube.com/playlist?list=PL30D67EFE67E8D7BE&si=Ho-S3tjmnFRBUDVf" target='blank'>Music</a></li>
          </ul>
          <ul>
            <h2>Docs</h2>
            <li><a href="https://pokeapi.co/" target='blank'>API</a></li>
            <li><a href="https://boxicons.com/" target='blank'>Box-Icon</a></li>
          </ul>
          <ul className='delete'>
            <h2>Contact me</h2>
            <div className='contactme'>
              <div className='contact'>
                <h3>Call me it's Free</h3>
                <li><a href="tel:+593963313195" target='blank'><box-icon name='phone' color='rgb(255, 255, 255, 0.6)'></box-icon>+593 96 3313 195</a></li>
              </div>
              <div className='contact actived'>
                <h3 className='txt'>Support</h3>
                <li><a href="mailto:destinatario@correo.com?subject=Asunto del Correo&body=Hola!%20vengo%20de%20Pokedex" target='blank'><box-icon name='mail-send' color='rgb(255, 255, 255, 0.6)' ></box-icon>stalyin16@gmail.com</a></li>
              </div>
              <div className='contact active'>
                <h3>Chat send</h3>
                <li><a href="https://wa.me/+593963313195?text=Hola%21%20vengo%20de%20Pokedex" target='blank'><box-icon name='message-rounded-dots' color='rgb(255, 255, 255, 0.6)'></box-icon>chat now!</a></li>
              </div>
            </div>
          </ul>
        </div>
        <div className='social-icons'>
          <a href="https://www.facebook.com/Stalyin" target='blank'><box-icon type='logo' name='facebook' color='white'></box-icon></a>
          <a href="https://www.linkedin.com/in/Stalyin" target='blank'><box-icon type='logo' name='linkedin'  color="white"></box-icon></a>
          <a href="https://github.com/Stalyin" target='blank'><box-icon type='logo' name='github' color="white"></box-icon></a>
          <a href="https://wa.me/+593963313195?text=Hola%21%20vengo%20de%20Pokedex" target='blank'><box-icon type='logo' name='whatsapp'  color="white"></box-icon></a>
        </div>
        <img className='mobile-footer' src="./images/banner.png" alt="Mobile Footer" />
      </footer>
    </section>
  );
}

export default App;
