const myForm = document.getElementById('myForm');
const inpFile = document.getElementById('inpFile');
const showData = document.getElementById('showData');
console.log(axios);
let loader;

myForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (inpFile.value.trim() === '') {
    return (showData.innerHTML =
      '<div class="alert">You did not choose any file! <br> Chose one then click on the button.</div>');
  }
  showData.innerHTML = '<div class="loader"></div>';
  const endPoint =
    'https://custom-ocr.klippa.com/api/v1/parseDocument?X-Auth-Key=sLiopG4bfDH6wcIZxBjZk85Z9DIiUK7G';

  const formData = new FormData();
  formData.append('document', inpFile.files[0]);

  axios
    .post(
      endPoint,
      formData,

      {
        validateStatus: function (status) {
          return status >= 200 && status < 300;
        },
        onUploadProgress: function (progressEvent) {
          console.log(
            `Upload Progress: ${Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )}%`
          );
        },
      }
    )
    .then((result) => {
      showData.innerHTML = '';
      const lineBox = document.createElement('div');
      lineBox.classList.add('line-box');
      lineBox.innerText = result.data.data.raw_text;
      showData.appendChild(lineBox);
      inpFile.value = '';
    })
    .catch((error) => {
      showData.innerHTML = `<div class="alert">${error}</div>`;
    });
});
