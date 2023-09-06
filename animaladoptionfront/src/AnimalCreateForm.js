import React, { Component } from 'react';
import './AnimalCreateForm.css';

class AnimalCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      species: '',
      description: '',
      ownerId: '', // ID do proprietário (usuário)
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, species, description, ownerId } = this.state;
    const animalDto = { name, species, description, ownerId };
  
    fetch('http://localhost:8080/api/animals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(animalDto),
    })
    .then(response => {
      if (response.status === 201) {
        // Animal criado com sucesso
        return response.json();
      } else {
        throw new Error('Erro ao criar animal');
      }
    })
    .then(createdAnimal => {
      console.log('Animal criado com sucesso:', createdAnimal);
      // Faça algo após a criação bem-sucedida, como redirecionar ou atualizar a interface do usuário.
    })
    .catch(error => {
      console.error('Erro ao criar animal:', error);
      // Lide com erros aqui, como exibir uma mensagem de erro para o usuário.
    });
  }

  render() {
    const { name, species, description, ownerId } = this.state;

    return (
      <div className="animal-create-form">
        <h2>Criar Animal</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome do Animal:</label>
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
            <label htmlFor="species">Espécie:</label>
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
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="ownerId">ID do Proprietário (Usuário):</label>
            <input
              type="text"
              id="ownerId"
              name="ownerId"
              value={ownerId}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>
      </div>
    );
  }
}

export default AnimalCreateForm;
