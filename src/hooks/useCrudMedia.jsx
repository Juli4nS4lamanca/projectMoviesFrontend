import { useState, useEffect } from "react"

const useCrud = (services) => {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState(null);

  const fetchData = async () => {
    try {
      const result = await services.getAll();
      setEntities(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData()
  }, [services]);

  const handleSelect = entity => {
    setSelectedEntity(entity);
  };

  const handleUpdate = async () => {
    await fetchData();
    setSelectedEntity(null);
  };

  const handleCreate = async () => {
    await fetchData();
  };

  const handleDelete = async () => {
    await fetchData();
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
