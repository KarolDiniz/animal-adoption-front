import React, { Component } from 'react';
import AnimalCreateForm from '../animalpage/AnimalCreateForm.js';
import Menu from '../home/menu.js'; 


class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isAdmin: false,
      isPopupVisible: false,
      isAnimalCreateFormVisible: false,
      isMenuVisible: false, 
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, isAdmin } = this.state;
    const userDto = { username, isAdmin };

    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDto),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error('Error creating user');
        }
      })
      .then((createdUser) => {
        alert('User created successfully');
        this.setState({ isPopupVisible: true });
        this.setState({ isMenuVisible: true });
        window.location.reload();
      })
      .catch((error) => {
        alert('Error creating user');
      });
  }

  render() {
    const {
      username,
      isAdmin,
      isPopupVisible,
      isAnimalCreateFormVisible,
      isMenuVisible,
    } = this.state;

    return (
      <div className="user-create-form">
        {isMenuVisible ? (
          <Menu />
        ) : (
          <>
            <h2>Create User</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Is Administrator?</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={this.handleChange}
                  className="form-check-input"
                />
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>

            {isPopupVisible && (
              <div className="popup">
                <p>User created successfully!</p>
                <button onClick={() => this.setState({ isPopupVisible: false })}>Close</button>
              </div>
            )}

            {isAnimalCreateFormVisible && <AnimalCreateForm />}
          </>
        )}
      </div>
    );
  }
}

export default UserCreateForm;

