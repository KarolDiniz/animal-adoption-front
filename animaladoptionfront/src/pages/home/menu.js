import React, { Component } from 'react';
import AnimalHome from './AnimalHome.js';
import UserHome from './UserHome.js';
import About from './About.js'; // Novo componente de informações "About"
import adminImage from '../../assets/img/admin-image.jpg';

class App extends Component {
  state = {
    showAnimalHome: false,
    showUserHome: false,
    showAbout: false, // Novo estado para controlar "About"
  };

  handleAnimalHomeClick = () => {
    this.setState({
      showAnimalHome: true,
      showUserHome: false,
      showAbout: false, // Certifique-se de definir showAbout como falso
    });
  };

  handleUserHomeClick = () => {
    this.setState({
      showAnimalHome: false,
      showUserHome: true,
      showAbout: false, // Certifique-se de definir showAbout como falso
    });
  };

  handleAboutClick = () => {
    this.setState({
      showAnimalHome: false,
      showUserHome: false,
      showAbout: true, // Ativa a exibição de "About"
    });
  };

  handleBackToMenuClick = () => {
    this.setState({
      showAnimalHome: false,
      showUserHome: false,
      showAbout: false,
    });
  };

  render() {
    const { showAnimalHome, showUserHome, showAbout } = this.state;

    return (
      <div className="App">
        <div>
          {showAnimalHome || showUserHome || showAbout ? null : (
            <div className="menu">
              <img src={adminImage} alt="Admin Image" />
              <h2>Menu</h2>
              <button
                className="btn btn-primary"
                onClick={this.handleUserHomeClick}
              >
                CRUD User
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleAnimalHomeClick}
              >
                CRUD Animal
              </button>
              {/* Adicione o botão "About" */}
              <button
                className="btn btn-primary"
                onClick={this.handleAboutClick}
              >
                About
              </button>
            </div>
          )}
        </div>

        {/* Renderiza o componente "About" condicionalmente */}
        {showAnimalHome && <AnimalHome goBack={this.handleBackToMenuClick} />}
        {showUserHome && <UserHome goBack={this.handleBackToMenuClick} />}
        {showAbout && <About onBackClick={this.handleBackToMenuClick} />}
      </div>
    );
  }
}

export default App;
