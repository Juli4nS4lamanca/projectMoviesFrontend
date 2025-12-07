import InputText from "@components/common/Inputs/InputText.jsx";
import InputSelect from "@components/common/Inputs/InputSelect.jsx";

const FormUser = ({ formState, handleChange }) => {
  const rolesOptions = [
    { id: 'administrador', name: 'Administrador' },
    { id: 'docente', name: 'Docente' }
  ];

  return (
    <form>
      <InputText 
        name="email" 
        value={formState.email} 
        text="Email" 
        onChange={handleChange} 
        type="email" 
      />
      <InputText 
        name="name" 
        value={formState.name} 
        text="Nombre" 
        onChange={handleChange} 
        type="text" 
      />
      <InputText 
        name="password" 
        value={formState.password} 
        text="Contraseña" 
        onChange={handleChange} 
        type="password" 
      />
      <InputSelect 
        name="rol" 
        value={formState.rol} 
        text="Rol" 
        onChange={handleChange} 
        list={rolesOptions} 
      />
    </form>
  );
};

export default FormUser;
