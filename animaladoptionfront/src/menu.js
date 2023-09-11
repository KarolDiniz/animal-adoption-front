import React, { Component } from 'react';
import UserCreateForm from './UserCreateForm';
import AnimalCreateForm from './AnimalCreateForm';

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
  

  handleBackToUserCreateFormClick = () => {
    this.setState({
      showUserCreateForm: true,
      showAnimalCreateForm: false,
    });
  };

  handleBackToCreateUserFormClick = () => {
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
              onClick={this.handleBackToCreateUserFormClick}
            >
              Back to Menu
            </button>
  
            {animalsData.length > 0 && (
              <div>
                <h2>All Animals</h2>
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
