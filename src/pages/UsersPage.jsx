import THead from '@components/common/tables/THead.jsx';
import ModalForm from '@components/modals/ModalForm.jsx';
import ModalDelete from '@components/modals/ModalDelete.jsx';
import FormUser from '@components/forms/FormUser.jsx';
import userServices from '@services/user.js';
import utils from '@/utils/utils.js';
import useCrud from '@/hooks/useCrud.jsx';
import { useState, useEffect } from 'react';

const UsersPage = () => {
  const {
    entities: users,
    selectedEntity: selectedUser,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete
  } = useCrud(userServices);
  
  const headTable = ['Email', 'Nombre', 'Roles', 'Fecha Actualizacion', 'Acciones'];

  // Transformar usuarios para mostrar roles como string
  const formatUser = (user) => {
    return {
      ...user,
      rol: Array.isArray(user.rol) ? user.rol[0] : user.rol || ''
    };
  };

  return (
    <>
      <h1>Usuarios</h1>
      <button 
        type="button" 
        className='btn btn-primary'
        data-bs-toggle='modal' 
        data-bs-target='#formUser'
        onClick={() => handleSelect()}
      >
        <i className="bi bi-plus-square-fill"></i> Nuevo Usuario
      </button>
      <table className='table table-striped-columns'>
        <THead list={headTable} />
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{Array.isArray(user.rol) ? user.rol.join(', ') : user.rol || 'Sin rol'}</td>
              <td>{utils.fecha(user.dateUpdate)}</td>
              <td>
                <button 
                  type="button" 
                  className='btn btn-primary'
                  data-bs-toggle='modal' 
                  data-bs-target='#formUser'
                  onClick={() => {
                    const formattedUser = formatUser(user);
                    handleSelect(formattedUser);
                  }}
                >
                  <i className="bi bi-pencil-square"></i>
                </button>
                <button 
                  type="button" 
                  className='btn btn-danger'
                  data-bs-toggle='modal' 
                  data-bs-target='#deleteUser'
                  onClick={() => handleSelect(user)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalForm 
        id={'formUser'}
        model={'user'}
        entity={selectedUser ? formatUser(selectedUser) : null}
        services={userServices}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        formComponent={FormUser}
      />
      <ModalDelete 
        id={'deleteUser'}
        model='user'
        entity={selectedUser}
        services={userServices}
        onDelete={handleDelete}
      />
    </>
  );
};

export default UsersPage;
