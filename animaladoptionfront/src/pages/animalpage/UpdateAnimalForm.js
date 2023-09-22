import React, { Component } from 'react';

class UpdateAnimalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalId: '', // Campo para inserir o ID do animal
      name: '',
      species: '',
      description: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { animalId, name, species, description } = this.state;
    const updatedAnimal = {
      name,
      species,
      description,
    };

    fetch(`http://localhost:8080/api/animals/${animalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAnimal),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Animal updated:', data);
      })
      .catch((error) => {
        console.error('Error updating animal:', error);
      });
  };

  render() {
    const { animalId, name, species, description } = this.state;

    return (
      <div>
        <h2>Update Animal</h2>
        <form>
          <div>
            <label htmlFor="animalId">Animal ID:</label>
            <input
              type="text"
              id="animalId"
              name="animalId"
              value={animalId}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="species">Species:</label>
            <input
              type="text"
              id="species"
              name="species"
              value={species}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="button" onClick={this.handleSubmit}>
            Update Animal
          </button>
        </form>
      </div>
    );
  }
}

export default UpdateAnimalForm;
