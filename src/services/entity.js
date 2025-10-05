import axios from "axios";

const urlBackend = 'https://projectmoviesbackend.onrender.com';

const serviceEntity = (baseUrl) => {

  const getAll = async () => {
    const response = await axios.get(`${urlBackend}${baseUrl}`);
    return response.data;
  };

  const getActives = async () => {
    const response = await axios.get(`${urlBackend}${baseUrl}/actives`)
    return response.data;
  };

  const create = async newEntity => {
    const response = await axios.post(`${urlBackend}${baseUrl}`, newEntity);
    return response.data;
  };

  const update = async entity => {
    const response = await axios.put(`${urlBackend}${baseUrl}/${entity.id}`, entity);
    return response.data;
  };

  const deleteEntity = async entity => {
    await axios.delete(`${urlBackend}${baseUrl}/${entity.id}`);
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
