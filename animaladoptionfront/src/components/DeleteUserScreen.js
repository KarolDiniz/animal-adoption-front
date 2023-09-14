import React, { Component } from 'react';

// Componente para a tela de exclusão de usuário
class DeleteUserScreen extends Component {
  constructor() {
    super();
    this.state = {
      deleteUserId: '', // Estado para armazenar o ID do usuário a ser excluído
    };
  }

  handleDeleteUserClick = (e) => {
    e.preventDefault();
    const userId = this.state.deleteUserId;

    // Lógica para excluir o usuário aqui
    console.log(`Excluindo usuário com ID ${userId}`);

    // Você pode adicionar sua lógica de exclusão aqui

    // Após a exclusão, você pode redirecionar de volta para o menu principal
    this.props.onBackToMenuClick();
  };

  render() {
    return (
      <div>
        <h2>Delete User</h2>
        <form onSubmit={this.handleDeleteUserClick}>
          <input
            type="text"
            placeholder="Insira o ID do usuário"
            value={this.state.deleteUserId}
            onChange={(e) => this.setState({ deleteUserId: e.target.value })}
          />
          <button type="submit" className="btn btn-danger">
            Excluir Usuário
          </button>
        </form>
      </div>
    );
  }
}
