import React, { Component } from 'react';

class DeleteUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }

  handleUserIdChange = (e) => {
    this.setState({ userId: e.target.value });
  };
  handleDeleteUser = () => {
    const { userId } = this.state;
  
    // Certifique-se de que userId seja válido antes de fazer a solicitação
    if (!userId) {
      alert("Por favor, insira um User ID válido.");
      return;
    }
  
    // Faça a solicitação DELETE para o endpoint de exclusão de usuário
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // O usuário foi excluído com sucesso
          alert("Usuário excluído com sucesso.");
          // Você pode adicionar lógica adicional, como atualizar a lista de usuários
        } else if (response.status === 404) {
          // Usuário não encontrado
          alert("Usuário não encontrado.");
        } else {
          // Outro erro
          alert("Ocorreu um erro ao excluir o usuário.");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o usuário:", error);
        alert("Ocorreu um erro ao excluir o usuário.");
      });
  };
  

  render() {
    return (
      <div>
        <h2>Delete User</h2>
        <form>
          <label>
            User ID:
            <input
              type="text"
              value={this.state.userId}
              onChange={this.handleUserIdChange}
            />
          </label>
          <button onClick={this.handleDeleteUser}>Delete User</button>
        </form>
      </div>
    );
  }
}

export default DeleteUserForm;
