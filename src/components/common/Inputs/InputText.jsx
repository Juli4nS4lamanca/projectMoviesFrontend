const InputText = ({ name, value, text, onChange, type }) => {
  return (
    <div className="mb-3">
      <label className='form-label' htmlFor={name}>{text}:</label>
      <input type={type} className='form-control' id={name} name={name} value={value} onChange={onChange} required />
    </div>
  )
};

export default InputText;
