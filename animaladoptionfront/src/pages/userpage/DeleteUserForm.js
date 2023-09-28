import React, { Component } from 'react';

class DeleteUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDelete: false,
    };
  }

  handleConfirmDelete = () => {
    this.setState({ confirmDelete: true });
  };

  handleCancelDelete = () => {
    this.setState({ confirmDelete: false });
  };

  handleDeleteUser = () => {
    const { userId, onDeleteUser } = this.props;
    onDeleteUser(userId);
  };

  render() {
    const { confirmDelete } = this.state;

    return (
      <div>
        <h2>Delete User</h2>
        {confirmDelete ? (
          <div>
            <p>Tem certeza que deseja excluir este usuário?</p>
            <button onClick={this.handleDeleteUser}>Sim</button>
            <button onClick={this.handleCancelDelete}>Cancelar</button>
          </div>
        ) : (
          <div>
            <p>Clique em "Sim" para confirmar a exclusão do usuário.</p>
            <button onClick={this.handleConfirmDelete}>Sim</button>
            <button onClick={this.handleCancelDelete}>Cancelar</button>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteUserForm;
