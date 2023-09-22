import React, { Component } from 'react';
import UserCreateForm from '../userpage/UserCreateForm.js';
import UpdateUserForm from '../userpage/UpdateUserForm.js';
import DeleteUserForm from '../userpage/DeleteUserForm.js';
import Table from '../../components/Table';
import '../../components/style/bootstrap.min.css';
import adminImage from '../../assets/img/admin-image.jpg';

class UserHome extends Component {
  state = {
    usersData: [],
    showMenu: false,
    showCreateForm: false,
    showUpdateForm: false,
    showDeleteForm: false,
    showTable: true, // Novo estado para controlar a visibilidade da tabela
  };

  componentDidMount() {
    this.fetchData("http://localhost:8080/api/users", "usersData");
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

  handleCreateUserClick = () => {
    this.setState({
      showCreateForm: true,
      showUpdateForm: false,
      showDeleteForm: false,
      showMenu: false,
    });
  };

  handleUpdateUserClick = () => {
    this.setState({
      showCreateForm: false,
      showUpdateForm: true,
      showDeleteForm: false,
      showMenu: false,
    });
  };

  handleDeleteUserClick = () => {
    this.setState({
      showCreateForm: false,
      showUpdateForm: false,
      showDeleteForm: true,
      showMenu: false,
    });
  };

  handleBackToMenuClick = () => {
    this.setState({
      showMenu: true,
      showCreateForm: false,
      showUpdateForm: false,
      showDeleteForm: false,
    });
  };

  handleGoBackClick = () => {
    this.props.goBack();
  };

  // Método para alternar a visibilidade da tabela
  handleToggleTable = () => {
    this.setState((prevState) => ({
      showTable: !prevState.showTable,
    }));
  };

  render() {
    const {
      usersData,
      showCreateForm,
      showUpdateForm,
      showDeleteForm,
      showMenu,
      showTable, // Novo estado para controlar a visibilidade da tabela
    } = this.state;

    return (
      <div className="menu">
        <h1 className="divider">------------------</h1>
        <img src={adminImage} alt="Admin Image" />
        {showCreateForm && <UserCreateForm />}
        {showUpdateForm && <UpdateUserForm />}
        {showDeleteForm && <DeleteUserForm />}

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
              onClick={this.handleCreateUserClick}
            >
              Create User
            </button>
            <button
              className="btn btn-primary"
              onClick={this.handleUpdateUserClick}
            >
              Update User
            </button>
            <button
              className="btn btn-primary"
              onClick={this.handleDeleteUserClick}
            >
              Delete User
            </button>

            <button
              className="btn btn-primary"
              onClick={this.handleGoBackClick}
            >
              Back
            </button>

            {/* Botão para mostrar/ocultar a tabela */}
            <button
              className="btn btn-primary"
              onClick={this.handleToggleTable}
            >
              {showTable ? 'Hide Table' : 'Show Table'}
            </button>
          </div>
        )}

        <h1 className="divider">------------------</h1>

        {showTable && usersData.length > 0 && (
          <div>
            <h2>View all users</h2>
            <Table data={usersData} columns={['id', 'username']} />
          </div>
        )}
      </div>
    );
  }
}

export default UserHome;
