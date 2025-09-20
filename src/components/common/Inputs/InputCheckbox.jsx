const InputCheckbox = ({ name, value, onChange }) => {
  return (
    <div className="form-check form-switch">
      <input type="checkbox"
        role="switch" name={name} id={name}
        checked={value}
        onChange={onChange} className="form-check-input" />
      <label htmlFor={name} className="form-check-label">{value ? 'Activo' : 'Inactivo'}</label>
    </div>
  )

};

export default InputCheckbox;
