import React, { Component } from 'react';

class DeleteAnimalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animalId: '',
    };
  }

  handleAnimalIdChange = (e) => {
    this.setState({ animalId: e.target.value });
  };

  handleDeleteAnimal = () => {
    const { animalId } = this.state;
  
    // Certifique-se de que animalId seja válido antes de fazer a solicitação
    if (!animalId) {
      alert("Por favor, insira um Animal ID válido.");
      return;
    }
  
    // Faça a solicitação DELETE para o endpoint de exclusão de animal
    fetch(`http://localhost:8080/api/animals/${animalId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          // O animal foi excluído com sucesso
          alert("Animal excluído com sucesso.");
          // Você pode adicionar lógica adicional, como atualizar a lista de animais
        } else if (response.status === 404) {
          // Animal não encontrado
          alert("Animal não encontrado.");
        } else {
          // Outro erro
          alert("Ocorreu um erro ao excluir o animal.");
        }
      })
      .catch((error) => {
        console.error("Erro ao excluir o animal:", error);
        alert("Ocorreu um erro ao excluir o animal.");
      });
  };
  

  render() {
    return (
      <div>
        <h2>Delete Animal</h2>
        <form>
          <label>
            Animal ID:
            <input
              type="text"
              value={this.state.animalId}
              onChange={this.handleAnimalIdChange}
            />
          </label>
          <button onClick={this.handleDeleteAnimal}>Delete Animal</button>
        </form>
      </div>
    );
  }
}

export default DeleteAnimalForm;
