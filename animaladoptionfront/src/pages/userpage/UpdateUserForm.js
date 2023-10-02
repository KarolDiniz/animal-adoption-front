import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UpdateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { username } = this.state;
    const { selectedUserId } = this.props;

    if (!username || username.length < 3 || /\d/.test(username) || /\s/.test(username)) {
      toast.error('Username must be at least 3 characters long and contain no numbers or spaces.');
      return;
    }

    const updateUser = {
      username,
    };

    fetch(`http://localhost:8080/api/users/${selectedUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateUser),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success('User updated successfully.');
      })
      .catch((error) => {
        toast.error('Error updating user:', error);
      });
  };

  render() {
    const { username } = this.state;

    return (
      <div>
        <h2>Update User</h2>
        <form>
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
        <ToastContainer />
      </div>
    );
  }
}

export default UpdateUserForm;
