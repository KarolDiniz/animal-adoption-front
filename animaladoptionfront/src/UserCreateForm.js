import React, { Component } from 'react';
import './UserCreateForm.css';
import AnimalCreateForm from './AnimalCreateForm'; // Importe o componente AnimalCreateForm

class UserCreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isAdmin: false,
      isPopupVisible: false, // Adicione um estado para controlar a visibilidade do popup
      isAnimalCreateFormVisible: false, // Adicione um estado para controlar a visibilidade do AnimalCreateForm
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
    .then(response => {
      if (response.status === 201) {
        // Usuário criado com sucesso
        return response.json();
      } else {
        throw new Error('Erro ao criar usuário');
      }
    })
    .then(createdUser => {
      console.log('Usuário criado com sucesso:', createdUser);
      this.setState({ isPopupVisible: true });
    })
    .catch(error => {
      console.error('Erro ao criar usuário:', error);
      // Lide com erros aqui, como exibir uma mensagem de erro para o usuário.
    });
  }
  

  handleAnimalCreateClick = () => {
    this.setState({ isAnimalCreateFormVisible: true });
  }

  render() {
    const { username, isAdmin, isPopupVisible, isAnimalCreateFormVisible } = this.state;

    return (
      <div className="user-create-form">
        <h2>Criar Usuário</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome de Usuário:</label>
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
            <label>É Administrador?</label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={isAdmin}
              onChange={this.handleChange}
              className="form-check-input"
            />
          </div>
          <button type="submit" className="btn btn-primary">Criar</button>
        </form>

        {/* Botão "Criar Animal" */}
        <button onClick={this.handleAnimalCreateClick} className="btn btn-secondary">
          Criar Animal
        </button>

        {isPopupVisible && (
          <div className="popup">
            <p>Usuário criado com sucesso!</p>
            <button onClick={() => this.setState({ isPopupVisible: false })}>Fechar</button>
          </div>
        )}

        {/* Renderizar AnimalCreateForm se isAnimalCreateFormVisible for verdadeiro */}
        {isAnimalCreateFormVisible && <AnimalCreateForm />}
      </div>
    );
  }
}

export default UserCreateForm;

