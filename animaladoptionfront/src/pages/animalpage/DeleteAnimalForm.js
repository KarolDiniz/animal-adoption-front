import React, { Component } from 'react';

class DeleteAnimalForm extends Component {
  handleDeleteAnimal = () => {
    // Vamos assumir que você já possui o ID do animal armazenado no estado ou em algum lugar acessível.
    const { animalId } = this.props;

    if (!animalId) {
      alert('O ID do animal não foi fornecido.');
      return;
    }

    fetch(`http://localhost:8080/api/animals/${animalId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          alert('Animal excluído com sucesso.');
          // Você pode adicionar uma função para recarregar a lista de animais aqui, se necessário.
        } else if (response.status === 404) {
          alert('Animal não encontrado.');
        } else {
          alert('Ocorreu um erro ao excluir o animal.');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir o animal:', error);
        alert('Ocorreu um erro ao excluir o animal.');
      });
  };

  render() {
    return (
      <div>
        <h2>Delete Animal</h2>
        <p>Tem certeza que deseja excluir este animal?</p>
        <button onClick={this.handleDeleteAnimal}>Sim</button>
      </div>
    );
  }
}

export default DeleteAnimalForm;
