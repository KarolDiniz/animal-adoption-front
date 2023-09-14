import React, { Component } from 'react';

class DeleteAnimalScreen extends Component {
  constructor() {
    super();
    this.state = {
      deleteAnimalId: '', // Estado para armazenar o ID do animal a ser excluído
    };
  }

  handleDeleteAnimalClick = (e) => {
    e.preventDefault();
    const animalId = this.state.deleteAnimalId;

    // Lógica para excluir o animal aqui
    console.log(`Excluindo animal com ID ${animalId}`);

    // Você pode adicionar sua lógica de exclusão aqui

    // Após a exclusão, você pode redirecionar de volta para o menu principal
    this.props.onBackToMenuClick();
  };

  render() {
    return (
      <div>
        <h2>Delete Animal</h2>
        <form onSubmit={this.handleDeleteAnimalClick}>
          <input
            type="text"
            placeholder="Insira o ID do animal"
            value={this.state.deleteAnimalId}
            onChange={(e) => this.setState({ deleteAnimalId: e.target.value })}
          />
          <button type="submit" className="btn btn-danger">
            Excluir Animal
          </button>
        </form>
      </div>
    );
  }
}