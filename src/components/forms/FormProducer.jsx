import InputText from '@components/common/Inputs/InputText.jsx';
import InputCheckbox from '@components/common/Inputs/InputCheckbox';
import InputTextArea from '@components/common/Inputs/InputTextArea';

const FormProducer = ({ formState, handleChange }) => {
  return (
    <form>
      <InputText value={formState.name} name={"name"} type={"text"} onChange={handleChange} text={"Nombre"} />
      <InputText value={formState.slogan} name={"slogan"} type={"text"} onChange={handleChange} text={"Eslogan"} />
      <InputTextArea value={formState.description} name={"description"} onChange={handleChange} text={"Descripción"} />
      <InputCheckbox value={formState.state} name={"state"} onChange={handleChange} />
    </form>
  );
};

export default FormProducer;
