import { useState, useEffect } from "react"

const useCrud = (services) => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await services.getAll();
        setEntities(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData()
  }, [services]);

  const handleSelect = entity => {
    setSelectedEntity(entity);
  };

  const handleUpdate = updatedEntity => {
    setEntities(
      entities.map(entity => entity.id === updatedEntity.id ? updatedEntity : entity)
    );
    setSelectedEntity(null);
  };

  const handleCreate = newEntity => {
    setEntities(
      entities.concat(newEntity)
    );
  };

  const handleDelete = deletedEntity => {
    setEntities(
      entities.filter(entity => entity.id !== deletedEntity.id)
    );
  };

  return {
    entities,
    selectedEntity,
    handleSelect,
    handleCreate,
    handleUpdate,
    handleDelete
  };
};

export default useCrud;
