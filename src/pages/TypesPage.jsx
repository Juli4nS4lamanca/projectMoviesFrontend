import THead from '@components/common/tables/THead.jsx';
import ModalForm from '@components/modals/ModalForm.jsx';
import ModalDelete from '@components/modals/ModalDelete.jsx';
import FormType from '@components/forms/FormType.jsx';
import typesServices from '@services/type.js';
import utils from '@/utils/utils.js';
import utilsModels from '@/utils/models.js';
import useCrud from '@/hooks/useCrud.jsx';

const TypesPage = () => {
  const {
    entities: types,
    selectedEntity: selectedTypes,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete } = useCrud(typesServices);
  const headTable = ['Nombre', 'Descripcion', 'Fecha Actualizacion', 'Acciones'];

  return (
    <>
      <h1>Tipos</h1>
      <button type="button" className='btn btn-primary'
        data-bs-toggle='modal' data-bs-target='#formType'
        onClick={() => handleSelect(utilsModels.type)}><i className="bi bi-plus-square-fill"></i> Nueva Tipo</button>
      <table className='table table-striped-columns'>
        <THead list={headTable} />
        <tbody>
          {types.map(type => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.description}</td>
              <td>{utils.fecha(type.dateUpdate)}</td>
              <td>
                <button type="button" className='btn btn-primary'
                  data-bs-toggle='modal' data-bs-target='#formType'
                  onClick={() => handleSelect(type)}><i className="bi bi-pencil-square"></i></button>
                <button type="button" className='btn btn-danger'
                  data-bs-toggle='modal' data-bs-target='#deleteType'
                  onClick={() => handleSelect(type)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalForm id={'formType'}
        model={'type'}
        entity={selectedTypes}
        services={typesServices}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        formComponent={FormType}
      />
      <ModalDelete id={'deleteType'}
        model={'type'}
        entity={selectedTypes}
        services={typesServices}
        onDelete={handleDelete}
      />
    </>
  )

};

export default TypesPage;
