import THead from '@components/common/tables/THead.jsx';
import ModalFormMedia from '@components/modals/ModalFormMedia.jsx';
import ModalDelete from '@components/modals/ModalDelete.jsx';
import FormMedia from '@components/forms/FormMedia.jsx';
import mediasServices from '@services/medias.js';
import utils from '@/utils/utils.js';
import useCrud from '@/hooks/useCrudMedia.jsx';
import { useAuth } from '@/utils/AuthContext.jsx';

const MediasPage = () => {
  const {
    entities: medias,
    selectedEntity: selectedMedia,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete } = useCrud(mediasServices);
  const { hasAnyRole } = useAuth();
  const headTable = ['Nombre', 'Tipo', 'Genero', 'Director', 'Casa Productora', 'Fecha Actualizacion', 'Acciones'];
  const canModify = hasAnyRole(['docente', 'administrador']);

  return (
    <>
      <h1>Peliculas</h1>
      {canModify && (
        <button type="button" className='btn btn-primary'
          data-bs-toggle='modal' data-bs-target='#formMedia'
          onClick={() => handleSelect()}><i className="bi bi-plus-square-fill"></i> Nueva Pelicula</button>
      )}
      <table className='table table-striped-columns'>
        <THead list={headTable} />
        <tbody>
          {medias.map(media => (
            <tr key={media.id}>
              <td>{media.title}</td>
              <td>{media.type.name}</td>
              <td>{media.genre.name}</td>
              <td>{media.director.name}</td>
              <td>{media.producer.name}</td>
              <td>{utils.fecha(media.dateUpdate)}</td>
              <td>
                {canModify && (
                  <>
                    <button type="button" className='btn btn-primary'
                      data-bs-toggle='modal' data-bs-target='#formMedia'
                      onClick={() => handleSelect(media)}><i className="bi bi-pencil-square"></i></button>
                    <button type="button" className='btn btn-danger'
                      data-bs-toggle='modal' data-bs-target='#deleteMedia'
                      onClick={() => handleSelect(media)}><i className="bi bi-trash"></i></button>
                  </>
                )}
                {!canModify && <span className="text-muted">Solo lectura</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalFormMedia id={'formMedia'}
        model={'media'}
        entity={selectedMedia}
        services={mediasServices}
        onUpdate={handleUpdate}
        onCreate={handleCreate}
        formComponent={FormMedia}
      />
      <ModalDelete id={'deleteMedia'}
        model='media'
        entity={selectedMedia}
        services={mediasServices}
        onDelete={handleDelete}
      />
    </>
  )

};

export default MediasPage;
