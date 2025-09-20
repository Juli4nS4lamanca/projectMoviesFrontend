import axios from "axios";

const serviceEntity = (baseUrl) => {

  const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
  };

  const getActives = async () => {
    const response = await axios.get(`${baseUrl}/actives`)
    return response.data;
  };

  const create = async newEntity => {
    const response = await axios.post(baseUrl, newEntity);
    return response.data;
  };

  const update = async entity => {
    const response = await axios.put(`${baseUrl}/${entity.id}`, entity);
    return response.data;
  };

  const deleteEntity = async entity => {
    await axios.delete(`${baseUrl}/${entity.id}`);
  };

  return {
    getAll,
    getActives,
    create,
    update,
    deleteEntity
  };
};

export default serviceEntity;
