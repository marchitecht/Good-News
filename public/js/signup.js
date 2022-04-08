  const checkbox = document.querySelector('.form-check-input');
  const submitButton = document.querySelector('.btn-success');
  // eslint-disable-next-line no-return-assign
  checkbox.addEventListener('click', () => submitButton.disabled = !submitButton.disabled);
