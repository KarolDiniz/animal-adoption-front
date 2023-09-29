import React, { Component } from 'react';
import UserCreateForm from '../userpage/UserCreateForm.js';
import UpdateUserForm from '../userpage/UpdateUserForm.js';
import Table from '../../components/Table';
import '../../components/style/standart.css';
import '../../components/style/bootstrap.min.css';
import adminImage from '../../assets/img/admin-image.jpg';
import DeleteUserForm from '../userpage/DeleteUserForm.js';

import editarIcon from '../../assets/img/icons8-editar.svg';
import removerIcon from '../../assets/img/icons8-remover.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import '../../components/style/action.css';
class UserHome extends Component {
  state = {
    usersData: [],
    showCreateForm: false,
    showUpdateForm: false,
    showDeleteForm: false,
    showTable: true, 
    userToDeleteId: null,
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

  handleToggleTable = () => {
    this.setState((prevState) => ({
      showTable: !prevState.showTable,
    }));
  };


handleEditUser = (userId) => {
  this.setState({
    showCreateForm: false,
    showUpdateForm: true,
    showDeleteForm: false,
    showMenu: false,
    selectedUserId: userId, 
  });
};

handleDeleteUser = (userId) => {
  console.log("Delete user with ID:", userId);
  this.setState({
    showCreateForm: false,
    showUpdateForm: false,
    showDeleteForm: true,
    showMenu: false,
    userToDeleteId: userId,
    selectedUserId: userId,
  });
};

mapUserDataWithActions = (usersData) => {
  return usersData.map((user) => ({
    ...user,
    actions: (
      <div className="action"> {/* Use a classe .action aqui */}
        <button onClick={() => this.handleEditUser(user.id)}>
          <img src={editarIcon} alt="Edit" />
        </button>
        <button onClick={() => this.handleDeleteUser(user.id)}>
          <img src={removerIcon} alt="Delete" />
        </button>
      </div>
    ),
  }));
};



handleConfirmDelete = () => {
  const { userToDeleteId } = this.state;
  console.log("UserToDeleteId:", userToDeleteId);
  if (!userToDeleteId) {
    alert("Por favor, insira um User ID válido.");
    return;
  }

  fetch(`http://localhost:8080/api/users/${userToDeleteId}`, {
    method: "DELETE",
  })
  .then((response) => {
    if (response.status === 200) {
      toast.success("Usuário excluído com sucesso.");
    } else if (response.status === 404) {
      toast.error("Usuário não encontrado.");
    } else {
      toast.error("Ocorreu um erro ao excluir o usuário.");
    }
  })
  .catch((error) => {
    console.error("Erro ao excluir o usuário:", error);
    toast.error("Ocorreu um erro ao excluir o usuário.");
  });
};


render() {
  const {
    usersData,
    showCreateForm,
    showUpdateForm,
    showDeleteForm,
    showTable,
    selectedUserId,
  } = this.state;
  return (
    <div className="menu">
      <h1 className="divider">------------------</h1>
      <img src={adminImage} alt="Admin Image" />
      
      {showCreateForm && (<UserCreateForm />)}
      {showUpdateForm && ( <UpdateUserForm selectedUserId={selectedUserId} />)}
      {showDeleteForm && ( <DeleteUserForm onDeleteUser={this.handleConfirmDelete} userId={selectedUserId} />)} 
      
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
            onClick={this.handleToggleTable}
          >
            {showTable ? 'Hide Table' : 'Show Table'}
          </button>

          <button
            className="btn btn-primary"
            onClick={this.handleGoBackClick}
          >
            Back
          </button>
        </div>
      )}
  
      <h1 className="divider">------------------</h1>
  
      {showTable && usersData.length > 0 && (
  <div>
    <h2>View all users</h2>
    <Table
      data={this.mapUserDataWithActions(usersData)}
      columns={['id', 'username', 'actions']}
      onDeleteUser={this.handleConfirmDelete} 
    />
  </div>
    )}
    <ToastContainer />
    </div>
  );
 }  
}

export default UserHome; 