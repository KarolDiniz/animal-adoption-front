import React, { Component } from 'react';
import AnimalCreateForm from './AnimalCreateForm.js';
import UserCreateForm from './UserCreateForm';
import UpdateUserForm from './UpdateUserForm'; 
import UpdateAnimalForm from './UpdateAnimalForm'; 
import DeleteUserForm from './DeleteUserForm';
import DeleteAnimalForm from './DeleteAnimalForm';
import './style/standart.css';

class App extends Component {
  state = {
    showUserCreateForm: true, showUser: false,
    showallUser: false, showAnimalCreateForm: false,
    showUpdateUserForm: false, showUpdateAnimalForm: false,
    showDeleteUserForm: false, showDeleteAnimalForm: false,
    animalsData: [], usersData: [],
  };

  handleAdoptAnimalClick = () => {
    this.setState({
      showUserCreateForm: false,
      showAnimalCreateForm: true,
      showallUser: false,
      showUser: false,
    });
  };

  handleCreateUserClick = () => {
    this.setState({
      showUserCreateForm: false,
      showAnimalCreateForm: false,
      showUser: true,
      showallUser: false,
    });
  };

  fetchData(url, successCallback, errorCallback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => successCallback(data))
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
        errorCallback(error);
      });
  }

  handleViewAllAnimalsClick = () => {
    this.fetchData(
      "http://localhost:8080/api/animals",
      (data) => {
        this.setState({
          showUserCreateForm: false,
          showAnimalCreateForm: false,
          showUpdateUserForm: false,
          showallUser: false,
          animalsData: data,
        });
      },
      (error) => {}
    );
  };

  handleViewAllUsersClick = () => {
    this.fetchData(
      "http://localhost:8080/api/users",
      (data) => {
        this.setState({
          showUserCreateForm: false,
          showAnimalCreateForm: false,
          showUpdateUserForm: false,
          showallUser: true,
          usersData: data,
        });
      },
      (error) => {
        // Handle the error here
      }
    );
  };

  handleUpdateUserClick = () => {
    this.setState({
      showUpdateUserForm: true,
      showAnimalCreateForm: false,
      showUser: false,
      showallUser: false,
      showUpdateAnimalForm: false, 
      showUserCreateForm: false,
    });
  };

  handleUpdateAnimalClick = () => {
    this.setState({
      showAnimalCreateForm: false,
      showUser: false,
      showallUser: false,
      showUpdateUserForm: false,
      showUpdateAnimalForm: true, 
      showUserCreateForm: false,
    });
  };

  handleDeleteUserClick = () => {
    this.setState({
      showDeleteUserForm: true,
      showDeleteAnimalForm: false,
      showUserCreateForm: false,
      // ... (defina outros estados como false, se necessário)
    });
  };

  handleDeleteAnimalClick = () => {
    this.setState({
      showDeleteUserForm: false,
      showDeleteAnimalForm: true,
      showUserCreateForm: false,
      // ... (defina outros estados como false, se necessário)
    });
  };

  handleBackToMenuClick = () => {
    this.setState({
      showUserCreateForm: true,
      showAnimalCreateForm: false,
      showUser: false,
      showallUser: false,
      showUpdateAnimalForm: false,
      showUpdateUserForm: false,
      showDeleteUserForm: false,
      showDeleteAnimalForm: false,
    });
  };

  render() {
    const {
      showUserCreateForm,
      showAnimalCreateForm,
      animalsData,
      showUser,
      usersData,
      showallUser,
      showUpdateUserForm,
      showUpdateAnimalForm,
      showDeleteUserForm,
      showDeleteAnimalForm
    } = this.state;

      return (
      <div className="App">
        {showUserCreateForm && (
          <div>
            <div className="menu">
              <h2>Menu</h2>
              <button
                className="btn btn-primary"
                onClick={this.handleCreateUserClick}
              >
                Create User
              </button>
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

        {showAnimalCreateForm && <AnimalCreateForm />}
        {showUpdateUserForm && <UpdateUserForm />}
        {showUpdateAnimalForm && <UpdateAnimalForm />}

        {showUserCreateForm && <menu />}

        {showDeleteUserForm && <DeleteUserForm />}
        {showDeleteAnimalForm && <DeleteAnimalForm />}

        {showUser && <UserCreateForm />}
        {showallUser && (
          <div>
            {usersData.length > 0 && (
              <div>
                <h2>View all users</h2>
                <ul>
                  {usersData.map((user) => (
                    <li key={user.id}>
                      User ID: {user.id}, Username: {user.username}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
                    {animalsData.map((animal) => (
                      <li key={animal.id}>
                        Animal ID: {animal.id}, Name: {animal.name}, Species: {animal.species}
                      </li>
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