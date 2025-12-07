import { useEffect, useState } from "react";
import { useMessage } from "@/utils/MessageContext.jsx";
import utilsModels from '@/utils/models.js';
import utils from "@/utils/utils.js";

const ModalForm = ({ id, model, entity, services, onUpdate, onCreate, formComponent: FormComponent }) => {
  const [formState, setFormState] = useState(utilsModels[model]);
  const { showMessage } = useMessage();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (entity) {
      setFormState({ ...entity });
    } else {
      setFormState(utilsModels[model]);
    }
  }, [entity, model]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSuccess = `${formState.name} guardado`;
  const updateSucces = `${formState.name} actualizado`;

  const onClickSave = async () => {
    try {
      // Preparar datos para usuarios (rol debe ser array)
      let dataToSave = { ...formState };
      if (model === 'user' && dataToSave.rol && !Array.isArray(dataToSave.rol)) {
        dataToSave.rol = [dataToSave.rol];
      }

      if (formState.id) {
        setIsLoading(true);
        const updatedEntity = await services.update(dataToSave);
        showMessage(utils.capitalizerFirstLetter(updateSucces), 'success');
        onUpdate(updatedEntity);
      } else {
        setIsLoading(true);
        const newEntity = await services.create(dataToSave);
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
            <h1 className="modal-title fs-5" id={`${model}ModalLabel`}>{entity ? 'Editar' : 'Nuevo'} {model}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <FormComponent formState={formState} handleChange={handleChange} />
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

export default ModalForm;
