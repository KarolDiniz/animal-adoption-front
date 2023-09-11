import React, { Component } from 'react';
import './AnimalCreateForm.css';

class AnimalCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      species: '',
      description: '',
      userId: '',
      showSuccessMessage: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, species, description, userId } = this.state;

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
        return response.json();
      } else {
        throw new Error('Error creating animal');
      }
    })
    .then(createdAnimal => {
      console.log('Animal created successfully:', createdAnimal);

      this.setState({ successMessage: 'Animal created successfully' });
    })
    .catch(error => {
      console.error('Error creating animal:', error);
    });
  }

  render() {
    const { name, species, description, userId } = this.state;

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
      </div>
    );
  }
}

export default AnimalCreateForm;
