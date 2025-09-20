import InputText from '@components/common/Inputs/InputText.jsx';
import InputTextArea from '@components/common/Inputs/InputTextArea';

const FormType = ({ formState, handleChange }) => {
  return (
    <form>
      <InputText value={formState.name} name={"name"} type={"text"} onChange={handleChange} text={"Nombre"} />
      <InputTextArea value={formState.description} name={"description"} onChange={handleChange} text={"Descripción"} />
    </form>
  );
};

export default FormType;
