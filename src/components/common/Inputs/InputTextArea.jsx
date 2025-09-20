const InputTextArea = ({ name, text, onChange, value }) => {
  return (
    <div className="mb-3">
      <label className='form-label' htmlFor={name}>{text}:</label>
      <textarea className='form-control' id={name} rows={3} name={name} value={value} onChange={onChange} required />
    </div>
  )
};

export default InputTextArea;
