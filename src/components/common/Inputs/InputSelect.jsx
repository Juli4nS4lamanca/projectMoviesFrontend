const InputSelect = ({ name, value, onChange, text, list }) => {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={name}>{text}:</label>
      <select name={name} value={value} onChange={onChange} className="form-select" id={name} required>
        <option value={""}>Seleccionar {text}</option>
        {list.map(l => (
          <option value={l.id} key={l.id}>{l.name}</option>
        ))}
      </select>
    </div>
  )
};

export default InputSelect;
