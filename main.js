const myForm = document.getElementById('myForm');
const inpFile = document.getElementById('inpFile');
const showData = document.getElementById('showData');

const progressFunc = (progressValue) => {
  const progressElm = `<div class="progressContainer">
<div class="progressBar" style="width:${progressValue}%">Uploading ${progressValue}%</div>
</div>`;
  return progressElm;
};

myForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  if (inpFile.value.trim() === '') {
    return (showData.innerHTML =
      '<div class="alert">You did not choose any file! <br> Chose one then click on the button.</div>');
  }
  let progressValue = 0;
  showData.innerHTML = progressFunc(progressValue);

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
          progressValue = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          if (progressValue === 100) {
            showData.innerHTML =
              '<p class="loaderTitle">Getting the Data</p><div class="loader"></div>';
            return;
          }
          showData.innerHTML = progressFunc(progressValue);
        },
      }
    )
    .then((result) => {
      const lineBox = document.createElement('div');
      lineBox.classList.add('line-box');
      lineBox.innerText = result.data.data.raw_text;
      showData.innerHTML = '';
      showData.appendChild(lineBox);
      inpFile.value = '';
    })
    .catch((error) => {
      showData.innerHTML = `<div class="alert">${error}</div>`;
    });
});
