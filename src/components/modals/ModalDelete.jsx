import { useState, useEffect } from "react";
import { useMessage } from "@/utils/MessageContext.jsx";
import utilsModels from "@/utils/models.js";
import utils from "@/utils/utils.js";

const ModalDelete = ({ id, model, entity, services, onDelete }) => {
  const [formState, setFormState] = useState(utilsModels[model]);
  const { showMessage } = useMessage();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (entity) {
      setFormState({ ...entity });
    }
  }, [entity]);

  const getDeleteSuccessMessage = () => {
    const name = formState.name || formState.title || formState.email || 'Elemento';
    return `${name} eliminado`;
  };

  const onClickDelete = async () => {
    try {
      setIsLoading(true);
      const deletedEntity = formState;
      await services.deleteEntity(formState);
      showMessage(utils.capitalizerFirstLetter(getDeleteSuccessMessage()), 'delete');
      onDelete(deletedEntity);
      utils.closeModal(id);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
        (error.response?.status === 403 ? 'No tienes permisos para eliminar' : 
         error.response?.status === 401 ? 'Sesión expirada. Por favor, inicia sesión nuevamente' :
         'Error al eliminar');
      showMessage(errorMessage, 'error');
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    };
  }
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${model}ModalLabel`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${model}ModalLabel`}>Esta seguro de eliminar?</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
            {isLoading ?
              <button type="button" className="btn btn-danger" disabled>Si</button>
              :
              <button type="button" className="btn btn-danger" onClick={onClickDelete}>Si</button>

            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default ModalDelete
