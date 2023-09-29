import React, { Component } from 'react';
import AnimalCreateForm from '../animalpage/AnimalCreateForm.js';
import Menu from '../home/menu.js'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isAdmin: false,
      isPopupVisible: false,
      isAnimalCreateFormVisible: false,
      isMenuVisible: false,
      usernameError: '', // Error message for username validation
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({ [name]: type === 'checkbox' ? checked : value });

    // Validate username
    if (name === 'username') {
      const usernamePattern = /^[a-zA-Z]+$/; // Only allows letters
      if (value.length < 3) {
        this.setState({ usernameError: 'Username should have at least 3 characters' });
      } else if (!usernamePattern.test(value)) {
        this.setState({ usernameError: 'Username should only contain letters' });
      } else {
        this.setState({ usernameError: '' });
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, isAdmin } = this.state;

    // Check if the username is empty
    if (username.trim() === '') {
      toast.error('Username cannot be empty.');
      return;
    }

    // Check if the username meets the minimum length requirement
    if (username.length < 3) {
      toast.error('Username should have at least 3 characters.');
      return;
    }

    const userDto = { username, isAdmin };

    // Check for username validation error before submitting
    if (this.state.usernameError) {
      toast.error('Username is not valid. Please correct the errors.');
      return;
    }

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
        toast.success('User created successfully');
        this.setState({ isPopupVisible: true });
        this.setState({ isMenuVisible: true });
      })
      .catch((error) => {
        toast.error('Error creating user');
      });
  }

  render() {
    const {
      username,
      isAdmin,
      isPopupVisible,
      isAnimalCreateFormVisible,
      isMenuVisible,
      usernameError,
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
                {usernameError && (
                  <p className="error">{usernameError}</p>
                )}
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
        <ToastContainer /> {/* Add the ToastContainer here */}
      </div>
    );
  }
}

export default UserCreateForm;
