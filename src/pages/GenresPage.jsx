import THead from '@components/common/tables/THead.jsx';
import ModalForm from '@components/modals/ModalForm.jsx';
import ModalDelete from '@components/modals/ModalDelete.jsx';
import FormGenre from '@components/forms/FormGenre.jsx';
import genresServices from '@services/genre.js';
import utils from '@/utils/utils.js';
import utilsModels from '@/utils/models.js';
import useCrud from '@/hooks/useCrud.jsx';

const GenresPage = () => {
  const {
    entities: genres,
    selectedEntity: selectedGenres,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete } = useCrud(genresServices);
  const headTable = ['Nombre', 'Estado', 'Descripcion', 'Fecha Actualizacion', 'Acciones'];

  return (
    <>
      <h1>Generos</h1>
      <button type="button" className='btn btn-primary'
        data-bs-toggle='modal' data-bs-target='#formGenre'
        onClick={() => handleSelect()}><i className="bi bi-plus-square-fill"></i> Nueva Genero</button>
      <table className='table table-striped-columns'>
        <THead list={headTable} />
        <tbody>
          {genres.map(genre => (
            <tr key={genre.id}>
              <td>{genre.name}</td>
              <td>{genre.state ? 'Activo' : 'Inactivo'}</td>
              <td>{genre.description}</td>
              <td>{utils.fecha(genre.dateUpdate)}</td>
              <td>
                <button type="button" className='btn btn-primary'
                  data-bs-toggle='modal' data-bs-target='#formGenre'
                  onClick={() => handleSelect(genre)}><i className="bi bi-pencil-square"></i></button>
                <button type="button" className='btn btn-danger'
                  data-bs-toggle='modal' data-bs-target='#deleteGenre'
                  onClick={() => handleSelect(genre)}><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalForm id={'formGenre'}
        model={'genre'}
        entity={selectedGenres}
        services={genresServices}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        formComponent={FormGenre}
      />
      <ModalDelete id={'deleteGenre'}
        model={'genre'}
        entity={selectedGenres}
        services={genresServices}
        onDelete={handleDelete}
      />
    </>
  )

};

export default GenresPage;
