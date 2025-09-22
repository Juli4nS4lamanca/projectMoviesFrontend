import THead from '@components/common/tables/THead.jsx';
import ModalForm from '@components/modals/ModalForm.jsx';
import ModalDelete from '@components/modals/ModalDelete.jsx';
import FormProducer from '@components/forms/FormProducer.jsx';
import producersServices from '@services/producer.js';
import utils from '@/utils/utils.js';
import utilsModels from '@/utils/models.js';
import useCrud from '@/hooks/useCrud.jsx';

const ProducersPage = () => {
  const {
    entities: producers,
    selectedEntity: selectedProducers,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete } = useCrud(producersServices);
  const headTable = ['Nombre', 'Estado', 'Eslogan', 'Descripcion', 'Fecha Actualizacion', 'Acciones'];

  return (
    <>
      <h1>Productores</h1>
      <button type="button" className='btn btn-primary'
        data-bs-toggle='modal' data-bs-target='#formProducer'
        onClick={() => handleSelect()}><i className="bi bi-plus-square-fill"></i> Nueva Productora</button>
      <table className='table table-striped-columns'>
        <THead list={headTable} />
        <tbody>
          {producers.map(producer => (
            <tr key={producer.id}>
              <td>{producer.name}</td>
              <td>{producer.state ? 'Activo' : 'Inactivo'}</td>
              <td>{producer.slogan}</td>
              <td>{producer.description}</td>
              <td>{utils.fecha(producer.dateUpdate)}</td>
              <td>
                <button type="button" className='btn btn-primary'
                  data-bs-toggle='modal' data-bs-target='#formProducer'
                  onClick={() => handleSelect(producer)}><i className="bi bi-pencil-square"></i></button>
                <button type="button" className='btn btn-danger'
                  data-bs-toggle='modal' data-bs-target='#deleteProducer'
                  onClick={() => handleSelect(producer)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalForm id={'formProducer'}
        model={'producer'}
        entity={selectedProducers}
        services={producersServices}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        formComponent={FormProducer}
      />
      <ModalDelete id={'deleteProducer'}
        model={'producer'}
        entity={selectedProducers}
        services={producersServices}
        onDelete={handleDelete}
      />
    </>
  )

};

export default ProducersPage;
