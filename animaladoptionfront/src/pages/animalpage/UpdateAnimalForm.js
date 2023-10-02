import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UpdateAnimalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { name, species, description } = this.state;
    const { animalId } = this.props;

    if (name.length < 3 || species.length < 3 || description.length < 10) {
      toast.error('Name and species must have at least 3 characters. Description must have at least 10 characters.');
      return;
    }

    const updatedAnimal = {
      name,
      species,
      description,
    };

    console.log('Received animalId:', animalId); 

    fetch(`http://localhost:8080/api/animals/${animalId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAnimal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        toast.success('Animal updated successfully.');
      })
      .catch((error) => {
        toast.error('Error updating animal:', error);
        console.error('Error updating animal:', error);
      });
  };

  render() {
    const { name, species, description } = this.state;

    return (
      <div>
        <h2>Update Animal</h2>
        <form>
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
        <ToastContainer />
      </div>
    );
  }
}

export default UpdateAnimalForm;
