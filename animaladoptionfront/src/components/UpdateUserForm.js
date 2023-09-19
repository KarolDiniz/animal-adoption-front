import React, { Component } from 'react';

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '', // Add a new state property for user ID
      username: '', // Only allow updating username
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { userId, username } = this.state;
    const updateUser = {
      username,
    };

    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateUser),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Animal updated');
      })
      .catch((error) => {
        alert('Error updating user:', error);
      });
  };

  render() {
    const { userId, username } = this.state;

    return (
      <div>
        <h2>Update User</h2>
        <form>
          <div>
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="username">New Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="button" onClick={this.handleSubmit}>
            Update User
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateUserForm;
