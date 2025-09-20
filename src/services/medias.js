import axios from "axios";
const baseUrl = '/api/medias';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newMedia => {
  const response = await axios.post(baseUrl, newMedia);
  return response.data;
};

export default {
  getAll, create
};
