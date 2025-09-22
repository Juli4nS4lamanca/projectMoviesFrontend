import InputText from "@components/common/Inputs/InputText.jsx";
import InputSelect from "@components/common/Inputs/InputSelect.jsx";
import InputTextArea from "@components/common/Inputs/InputTextArea.jsx";

const FormMedia = ({ formState, handleChange, types, genres, directors, producers }) => {

  return (
    <form>
      <InputText name={"title"} value={formState.title} text={"Titulo"} onChange={handleChange} type={"text"} />
      <InputTextArea name={"synopsis"} value={formState.synopsis} text={"Sinopsis"} onChange={handleChange} />
      <InputText name={"release"} value={formState.release} text={"Año Lanzamiento"} onChange={handleChange} type={"number"} />
      <InputText name={"urlMovie"} value={formState.urlMovie} text={"URL Pelicula"} onChange={handleChange} type={"text"} />
      <InputText name={"img"} value={formState.img} text={"URL Portada"} onChange={handleChange} type={"text"} />
      <InputSelect name={"typeId"} value={formState.typeId} text={"Tipo"} onChange={handleChange} list={types} />
      <InputSelect name={"genreId"} value={formState.genreId} text={"Genero"} onChange={handleChange} list={genres} />
      <InputSelect name={"directorId"} value={formState.directorId} text={"Director"} onChange={handleChange} list={directors} />
      <InputSelect name={"producerId"} value={formState.producerId} text={"Casa Productora"} onChange={handleChange} list={producers} />
    </form>

  )
};

export default FormMedia;
