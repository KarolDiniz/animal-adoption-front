import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AnimalCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      species: '',
      description: '',
      userId: '',
      successMessage: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, species, description, userId } = this.state;

    // Check for empty fields
    if (!name || !species || !description || !userId) {
      toast.error('Please fill in all fields.');
      return;
    }

    const userIdAsNumber = parseInt(userId, 10);

    const animalDto = {
      name,
      species,
      description,
      owner: {
        id: userIdAsNumber,
      },
    };

    fetch('http://localhost:8080/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animalDto),
    })
    .then(response => {
      if (response.status === 201) {
        return response.text(); // Receive the response as text
      } else {
        return response.json().then(errorMessage => {
          throw new Error(errorMessage); // Throw the error message as an Error object
        });
      }
    })
    .then(successMessage => {
      toast.success(successMessage); // Display the success message
    })
    .catch(error => {
      toast.error(error.message); // Display the server's error message
      console.error('Error creating animal:', error);
    });
  }

  render() {
    const { name, species, description, userId, successMessage } = this.state;

    return (
      <div className="animal-create-form">
        <h2>Create Animal</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Animal Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="species">Species:</label>
            <input
              type="text"
              id="species"
              name="species"
              value={species}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Owner's ID (User):</label>
            <input
              type="number"
              id="userId"
              name="userId"
              value={userId}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
        </form>
        {successMessage && <p className="success">{successMessage}</p>}
        <ToastContainer />
      </div>
    );
  }
}

export default AnimalCreateForm;
