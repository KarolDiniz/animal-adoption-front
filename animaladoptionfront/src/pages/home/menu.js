import React, { Component } from 'react';
import AnimalHome from './AnimalHome.js';
import UserHome from './UserHome.js';
import About from './About.js'; 
import adminImage from '../../assets/img/admin-image.jpg';

class App extends Component {
  state = {
    showAnimalHome: false,
    showUserHome: false,
    showAbout: false, 
  };

  handleAnimalHomeClick = () => {
    this.setState({
      showAnimalHome: true,
      showUserHome: false,
      showAbout: false,
    });
  };

  handleUserHomeClick = () => {
    this.setState({
      showAnimalHome: false,
      showUserHome: true,
      showAbout: false,
    });
  };

  handleAboutClick = () => {
    this.setState({
      showAnimalHome: false,
      showUserHome: false,
      showAbout: true, 
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
              <button
                className="btn btn-primary"
                onClick={this.handleAboutClick}
              >
                About
              </button>
            </div>
          )}
        </div>

        {showAnimalHome && <AnimalHome goBack={this.handleBackToMenuClick} />}
        {showUserHome && <UserHome goBack={this.handleBackToMenuClick} />}
        {showAbout && <About onBackClick={this.handleBackToMenuClick} />}
      </div>
    );
  }
}

export default App;
