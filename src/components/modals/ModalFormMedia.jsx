import { useEffect, useState } from "react";
import { useMessage } from "@/utils/MessageContext.jsx";
import utilsModels from '@/utils/models.js';
import utils from "@/utils/utils.js";
import typeService from "@services/type.js";
import directorService from "@services/director.js";
import genreService from "@services/genre.js";
import producerService from "@services/producer.js";

const ModalFormMedia = ({ id, model, entity, services, onUpdate, onCreate, formComponent: FormComponent }) => {
  const [formState, setFormState] = useState(utilsModels[model]);
  const { showMessage } = useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [producers, setProducers] = useState([]);

  useEffect(() => {
    if (entity) {
      const formatteEntity = {
        ...entity,
        directorId: entity.director.id,
        producerId: entity.producer?.id,
        genreId: entity.genre?.id,
        typeId: entity.type?.id
      };

      if (formatteEntity.release) {
        const date = new Date(formatteEntity.release);
        formatteEntity.release = date.getFullYear();
      };

      setFormState(formatteEntity);
    } else {
      setFormState(utilsModels[model]);
    }
  }, [entity, model]);

  useEffect(() => {
    const fetchSelects = async () => {
      const [typesData, directorsData, genresData, producersData] = await Promise.all([
        typeService.getAll(),
        directorService.getActives(),
        genreService.getActives(),
        producerService.getActives()
      ]);

      setTypes(typesData);
      setGenres(genresData);
      setProducers(producersData);
      setDirectors(directorsData);
    };
    fetchSelects();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSuccess = `${formState.title} guardado`;
  const updateSucces = `${formState.title} actualizado`;

  const onClickSave = async () => {
    try {
      if (formState.id) {
        setIsLoading(true);
        const updatedEntity = await services.update(formState);
        showMessage(utils.capitalizerFirstLetter(updateSucces), 'success');
        onUpdate(updatedEntity);
      } else {
        setIsLoading(true);
        const newEntity = await services.create(formState);
        showMessage(utils.capitalizerFirstLetter(saveSuccess), 'success');
        onCreate(newEntity);
      }
      utils.closeModal(id);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        (error.response?.status === 403 ? 'No tienes permisos para realizar esta acción' : 
         error.response?.status === 401 ? 'Sesión expirada. Por favor, inicia sesión nuevamente' :
         'Error al guardar. Intente de nuevo');
      showMessage(errorMessage, 'error');
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${model}ModalLabel`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${model}ModalLabel`}>{entity ? 'Editar' : 'Nueva'} {model}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <FormComponent formState={formState} handleChange={handleChange} types={types} producers={producers} genres={genres} directors={directors} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            {isLoading ?
              <button type="submit" className="btn btn-primary" disabled>Guardando...</button>
              :
              <button type="submit" className="btn btn-success" onClick={onClickSave}>Guardar</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default ModalFormMedia;
