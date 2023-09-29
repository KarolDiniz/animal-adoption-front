import React, { Component } from 'react';
import AnimalCreateForm from '../animalpage/AnimalCreateForm.js';
import UpdateAnimalForm from '../animalpage/UpdateAnimalForm.js';
import DeleteAnimalForm from '../animalpage/DeleteAnimalForm.js';
import Table from '../../components/Table';
import '../../components/style/standart.css';
import '../../components/style/bootstrap.min.css';
import adminImage from '../../assets/img/admin-image.jpg';

import editarIcon from '../../assets/img/icons8-editar.svg';
import removerIcon from '../../assets/img/icons8-remover.svg';

import '../../components/style/action.css';

class AnimalHome extends Component {
  state = {
    animalsData: [],
    showMenu: false,
    showCreateForm: false,
    showUpdateForm: false,
    showDeleteForm: false,
    showTable: true,
  };

  componentDidMount() {
    this.fetchData("http://localhost:8080/api/animals", "animalsData");
  }

  fetchData(url, stateKey) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ [stateKey]: data });
      })
      .catch((error) => {
        console.error(`Error fetching data from ${url}:`, error);
      });
  }

  handleCreateAnimalClick = () => {
    this.setState({
      showCreateForm: true,
      showUpdateForm: false,
      showDeleteForm: false,
      showMenu: false,
    });
  };

  handleUpdateAnimalClick = () => {
    this.setState({
      showCreateForm: false,
      showUpdateForm: true,
      showDeleteForm: false,
      showMenu: false,
    });
  };

  handleDeleteAnimalClick = () => {
    this.setState({
      showCreateForm: false,
      showUpdateForm: false,
      showDeleteForm: true,
      showMenu: false,
    });
  };

  handleGoBackClick = () => {
    this.props.goBack();
  };

  handleBackToMenuClick = () => {
    this.setState({
      showMenu: true,
      showCreateForm: false,
      showUpdateForm: false,
      showDeleteForm: false,
    });
  };

  handleToggleTable = () => {
    this.setState((prevState) => ({
      showTable: !prevState.showTable,
    }));
  };

  mapAnimalDataWithActions = (animalsData) => {
    return animalsData.map((animal) => ({
      ...animal,actions: (
        <div className="action">
        <button onClick={() => this.handleEditAnimal(animal.id)}>
              <img src={editarIcon} alt="Edit" />
            </button>
            <button onClick={() => this.handleShowDeleteConfirmationModal(animal.id)}>
              <img src={removerIcon} alt="Delete" />
            </button>
      </div>
      ),
    }));
  };

  handleEditAnimal = (animalId) => {
    console.log('Edit animal with ID:', animalId); // Adicione este console.log
    this.setState({
      showCreateForm: false,
      showUpdateForm: true,
      showDeleteForm: false,
      showMenu: false,
      selectedAnimalId: animalId,
    });
  };
  
  handleShowDeleteConfirmationModal = (animalId) => {
    console.log('Delete animal with ID:', animalId); // Adicione este console.log
    this.setState({
      showCreateForm: false,
      showUpdateForm: false,
      showDeleteForm: true,
      showMenu: false,
      selectedAnimalId: animalId,
    });
  };
  
  
  

  render() {
    const {
      animalsData,
      showCreateForm,
      showUpdateForm,
      showDeleteForm,
      showMenu,
      showTable, 
    } = this.state;

    return (
      <div className="menu">
      <h1 className="divider">------------------</h1>

        <img src={adminImage} alt="Admin Image" />

        {showCreateForm && <AnimalCreateForm />}
        {showUpdateForm && <UpdateAnimalForm animalId={this.state.selectedAnimalId} />}
        {showDeleteForm && <DeleteAnimalForm animalId={this.state.selectedAnimalId} />}


        {showCreateForm || showUpdateForm || showDeleteForm ? (
          <button
            className="btn btn-primary"
            onClick={this.handleBackToMenuClick}
          >
            Back to Menu
          </button>
        ) : (
          <div>
            <button
              className="btn btn-primary"
              onClick={this.handleCreateAnimalClick}
            >
              Create Animal
            </button>  
            
            <button
              className="btn btn-primary"
              onClick={this.handleToggleTable}
            >
              {showTable ? 'Hide Table' : 'Show Table'}
            </button>

            <button className="btn btn-primary" onClick={this.handleGoBackClick}>
              Back
            </button>
          </div>
        )}

        <h1 className="divider">------------------</h1>

        {showTable && animalsData.length > 0 && (
          <div>
            <h2>View all animals</h2>
            <Table
              data={this.mapAnimalDataWithActions(animalsData)}
              columns={['id', 'name', 'species', 'actions']} // Adicione 'actions' às colunas
              onDelete={this.handleShowDeleteConfirmationModal} // Chame a função ao clicar em "Delete"
            />
          </div>
        )}

      </div>
    );
  }
}

export default AnimalHome;
