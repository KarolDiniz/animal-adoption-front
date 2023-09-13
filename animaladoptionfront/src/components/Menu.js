import React, { Component } from 'react';
import AnimalCreateForm from './AnimalCreateForm.js';
{/*import './style/Menu.css';*/}

class App extends Component {
  constructor() {
    super();
    this.state = {
      showUserCreateForm: true,
      showAnimalCreateForm: false,
      animalsData: [],
    };
  }

  handleAdoptAnimalClick = () => {
    this.setState({
      showUserCreateForm: false,
      showAnimalCreateForm: true,
    });
  };

  handleViewAllAnimalsClick = () => {
    fetch("http://localhost:8080/api/animals") 
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          showUserCreateForm: false,
          showAnimalCreateForm: false,
          animalsData: data, 
        });
      })
      .catch((error) => {
        console.error("Error fetching animal data:", error);
      });
  };

  handleViewAllUsersClick = () => {
    // Adicione a lógica para visualizar todos os usuários aqui
  };

  handleUpdateUserClick = () => {
    // Adicione a lógica para atualizar o usuário aqui
  };

  handleUpdateAnimalClick = () => {
    // Adicione a lógica para atualizar o animal aqui
  };

  handleDeleteUserClick = () => {
    // Adicione a lógica para excluir o usuário aqui
  };

  handleDeleteAnimalClick = () => {
    // Adicione a lógica para excluir o animal aqui
  };

  handleBackToMenuClick = () => {
    this.setState({
      showUserCreateForm: true,
      showAnimalCreateForm: false,
    });
  };

  render() {
    const { showUserCreateForm, showAnimalCreateForm, animalsData } = this.state;
  
    return (
      <div className="App">
        {showUserCreateForm && (
          <div>
            <div className="menu">
              <h2>Menu</h2>
              <button
                className="btn btn-primary"
                onClick={this.handleAdoptAnimalClick}
              >
                Create Animal
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleViewAllAnimalsClick}
              >
                View All Animals
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleViewAllUsersClick}
              >
                View All Users
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleUpdateUserClick}
              >
                Update User
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleUpdateAnimalClick}
              >
                Update Animal
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleDeleteUserClick}
              >
                Delete User
              </button>
              <button
                className="btn btn-primary"
                onClick={this.handleDeleteAnimalClick}
              >
                Delete Animal
              </button>
            </div>
          </div>
        )}
  
        {showAnimalCreateForm && (
          <div>
            <AnimalCreateForm />
          </div>
        )}
  
        {!showUserCreateForm && (
          <div>
            <button
              className="btn btn-primary"
              onClick={this.handleBackToMenuClick}
            >
              Back to Menu
            </button>
  
            {animalsData.length > 0 && (
              <div>
                <h2>View all animals</h2>
                <ul>
                  {animalsData.map(animal => (
                    <li key={animal.id}>{animal.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}  

export default App;
