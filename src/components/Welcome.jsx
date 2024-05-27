import { useState, useRef } from 'react';

function Welcome({ onNameSubmit }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const audioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Please enter your name to continue.');
    } else if (!isValidName(name)) {
      setError('The name entered does not seem to be valid. Please enter a real name.');
    } else {
      setError('');
      setShowWelcomeMessage(true);
      playSound();
      setTimeout(() => {
        stopSound();
        onNameSubmit(name);
      }, 1700);
    }
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedValue = inputValue
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    setName(capitalizedValue);
  };

  const playSound = () => {
    audioRef.current = new Audio('/click-sound.mp3');
    audioRef.current.play();
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const isValidName = (name) => {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(name);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <div className='welcome-input'>
          <h1>Pokedex</h1>
          <p>Welcome, Pokémon Trainer! Please enter your name to start your adventure.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input-field"
            />
            <button type="submit" className="submit-button">Go!</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
        <div>
          <img src="/public/pokemon.gif" alt="" />
        </div>
      </div>
      {showWelcomeMessage && (
        <div className="welcome-message">
          Welcome, {name}!
        </div>
      )}
    </div>
  );
}

export default Welcome;
