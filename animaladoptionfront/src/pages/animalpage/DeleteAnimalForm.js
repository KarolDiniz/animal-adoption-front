import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DeleteAnimalForm extends Component {
  handleDeleteAnimal = () => {
    const { animalId } = this.props;

    if (!animalId) {
      toast.error('O ID do animal não foi fornecido.');
      return;
    }

    fetch(`http://localhost:8080/api/animals/${animalId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Animal excluído com sucesso.');
        } else if (response.status === 404) {
          toast.error('Animal não encontrado.');
        } else {
          toast.error('Ocorreu um erro ao excluir o animal.');
        }
      })
      .catch((error) => {
        console.error('Erro ao excluir o animal:', error);
        toast.error('Ocorreu um erro ao excluir o animal.');
      });
  };

  render() {
    return (
      <div>
        <h2>Delete Animal</h2>
        <p>Tem certeza que deseja excluir este animal?</p>
        <button onClick={this.handleDeleteAnimal}>Sim</button>
        <ToastContainer />
      </div>
    );
  }
}

export default DeleteAnimalForm;
