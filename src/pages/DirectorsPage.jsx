import THead from '@components/common/tables/THead.jsx';
import ModalForm from '@components/modals/ModalForm.jsx';
import ModalDelete from '@components/modals/ModalDelete.jsx';
import FormDirector from '@components/forms/FormDirector.jsx';
import directorsServices from '@services/director.js';
import utils from '@/utils/utils.js';
import utilsModels from '@/utils/models.js';
import useCrud from '@/hooks/useCrud.jsx';

const DirectorsPage = () => {
  const {
    entities: directors,
    selectedEntity: selectedDirector,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete } = useCrud(directorsServices);
  const headTable = ['Nombre', 'Estado', 'Fecha Actualizacion', 'Acciones'];

  return (
    <>
      <h1>Directores</h1>
      <button type="button" className='btn btn-primary'
        data-bs-toggle='modal' data-bs-target='#formDirector'
        onClick={() => handleSelect()}><i className="bi bi-plus-square-fill"></i> Nuevo Director</button>
      <table className='table table-striped-columns'>
        <THead list={headTable} />
        <tbody>
          {directors.map(director => (
            <tr key={director.id}>
              <td>{director.name}</td>
              <td>{director.state ? 'Activo' : 'Inactivo'}</td>
              <td>{utils.fecha(director.dateUpdate)}</td>
              <td>
                <button type="button" className='btn btn-primary'
                  data-bs-toggle='modal' data-bs-target='#formDirector'
                  onClick={() => handleSelect(director)}><i className="bi bi-pencil-square"></i></button>
                <button type="button" className='btn btn-danger'
                  data-bs-toggle='modal' data-bs-target='#deleteDirector'
                  onClick={() => handleSelect(director)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalForm id={'formDirector'}
        model={'director'}
        entity={selectedDirector}
        services={directorsServices}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        formComponent={FormDirector}
      />
      <ModalDelete id={'deleteDirector'}
        model='director'
        entity={selectedDirector}
        services={directorsServices}
        onDelete={handleDelete}
      />
    </>
  )

};

export default DirectorsPage;
