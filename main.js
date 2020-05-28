const myForm = document.getElementById('myForm');
const inpFile = document.getElementById('inpFile');
const showData = document.getElementById('showData');

myForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (inpFile.value.trim() === '') {
    return (showData.innerHTML =
      '<div class="alert">You did not choose any file! <br> Chose one then click on the button.</div>');
  }
  const endPoint =
    'https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=sLiopG4bfDH6wcIZxBjZk85Z9DIiUK7G';

  const formData = new FormData();
  formData.append('document', inpFile.files[0]);
  const myHeaders = new Headers();

  fetch(endPoint, { method: 'post', body: formData, headers: myHeaders })
    .then((response) => {
      if (!response.ok)
        throw Error(`Request rejected with status ${response.status}`);
      return response.json();
    })
    .then((result) => {
      showData.innerHTML = '';
      const lineBox = document.createElement('div');
      lineBox.classList.add('line-box');
      lineBox.innerText = result.data.raw_text;
      showData.appendChild(lineBox);
    })
    .catch((error) => {
      showData.innerHTML = `<div class="alert">${error}</div>`;
    });
});
