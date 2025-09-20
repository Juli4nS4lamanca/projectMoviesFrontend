import InputText from '@components/common/Inputs/InputText.jsx';
import InputCheckbox from '@components/common/Inputs/InputCheckbox';

const FormDirector = ({ formState, handleChange }) => {
  return (
    <form>
      <InputText value={formState.name} name={"name"} type={"text"} onChange={handleChange} text={"Nombre"} />
      <InputCheckbox value={formState.state} name={"state"} onChange={handleChange} />
    </form>
  );
};

export default FormDirector;
