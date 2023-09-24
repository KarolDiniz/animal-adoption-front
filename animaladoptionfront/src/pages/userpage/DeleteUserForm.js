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
  
    if (!userId) {
      alert("Por favor, insira um User ID válido.");
      return;
    }
  
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Usuário excluído com sucesso.");
        } else if (response.status === 404) {
          alert("Usuário não encontrado.");
        } else {
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
