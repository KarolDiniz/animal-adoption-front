import React, { Component } from 'react';
import AnimalCreateForm from '../animalpage/AnimalCreateForm.js';
import UpdateAnimalForm from '../animalpage/UpdateAnimalForm.js';
import DeleteAnimalForm from '../animalpage/DeleteAnimalForm.js';
import Table from '../../components/Table';
import '../../components/style/standart.css';
import '../../components/style/bootstrap.min.css';
import adminImage from '../../assets/img/admin-image.jpg';

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
        {showUpdateForm && <UpdateAnimalForm />}
        {showDeleteForm && <DeleteAnimalForm />}

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
              onClick={this.handleUpdateAnimalClick}
            >
              Update Animal
            </button>
            <button
              className="btn btn-primary"
              onClick={this.handleDeleteAnimalClick}
            >
              Delete Animal
            </button>

            <button className="btn btn-primary" onClick={this.handleGoBackClick}>
              Back
            </button>
            
            <button
              className="btn btn-primary"
              onClick={this.handleToggleTable}
            >
              {showTable ? 'Hide Table' : 'Show Table'}
            </button>
          </div>
        )}

        <h1 className="divider">------------------</h1>

        {showTable && animalsData.length > 0 && (
          <div>
            <h2>View all animals</h2>
            <Table data={animalsData} columns={['id', 'name', 'species']} />
          </div>
        )}
      </div>
    );
  }
}

export default AnimalHome;
