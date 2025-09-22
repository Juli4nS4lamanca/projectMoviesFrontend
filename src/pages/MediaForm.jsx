import { useEffect, useState } from "react";
import InputText from "@components/common/Inputs/InputText.jsx";
import InputSelect from "@components/common/Inputs/InputSelect.jsx";
import InputTextArea from "@components/common/Inputs/InputTextArea.jsx";
import { useMessage } from "@/utils/MessageContext.jsx";
import mediaService from "@services/medias.js";
import typeService from "@services/type.js";
import directorService from "@services/director.js";
import genreService from "@services/genre.js";
import producerService from "@services/producer.js";
import utilsModels from '@/utils/models.js';

const MediaForm = () => {
  const clearMedia = utilsModels.media;
  const { showMessage } = useMessage();
  const [newMedia, setNewMedia] = useState(clearMedia);
  const [types, setTypes] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [producers, setProducers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const { name, value } = e.target;
    setNewMedia(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addMedia = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const savedMedia = {
        ...newMedia,
        directorId: newMedia.directorId,
        typeId: newMedia.typeId,
        genreId: newMedia.genreId,
        producerId: newMedia.producerId
      };

      await mediaService.create(savedMedia);
      setNewMedia(clearMedia);
      showMessage('Pelicula guardada', 'success');
    } catch (error) {
      showMessage('Error a guardar la pelicula. Intentelo de nuevo', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <>
      <form onSubmit={addMedia} id="mediaForm">
        <InputText name={"title"} value={newMedia.title} text={"Titulo"} onChange={handleChange} type={"text"} />
        <InputTextArea name={"synopsis"} value={newMedia.synopsis} text={"Sinopsis"} onChange={handleChange} />
        <InputText name={"release"} value={newMedia.release} text={"Año Lanzamiento"} onChange={handleChange} type={"number"} />
        <InputText name={"urlMovie"} value={newMedia.urlMovie} text={"URL Pelicula"} onChange={handleChange} type={"text"} />
        <InputText name={"img"} value={newMedia.img} text={"URL Portada"} onChange={handleChange} type={"text"} />
        <InputSelect name={"typeId"} value={newMedia.typeId} text={"Tipo"} onChange={handleChange} list={types} />
        <InputSelect name={"genreId"} value={newMedia.genreId} text={"Genero"} onChange={handleChange} list={genres} />
        <InputSelect name={"directorId"} value={newMedia.directorId} text={"Director"} onChange={handleChange} list={directors} />
        <InputSelect name={"producerId"} value={newMedia.producerId} text={"Casa Productora"} onChange={handleChange} list={producers} />
        {isLoading ?
          <button type="submit" className="btn btn-success" disabled>Guardando...</button>
          :
          <button type="submit" className="btn btn-success">Guardar</button>
        }
      </form>
    </>

  )

};

export default MediaForm;
