const fecha = string => {
  return new Date(string).toLocaleDateString('es-LA', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
};

const closeModal = id => {
  const modalElement = document.getElementById(id);
  if (modalElement) {
    const modalInstace = bootstrap.Modal.getInstance(modalElement);
    if (modalInstace) {
      modalInstace.hide();
    };
  };
};

const capitalizerFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export default { fecha, closeModal, capitalizerFirstLetter };
