const myForm = document.getElementById('myForm');
const inpFile = document.getElementById('inpFile');
const showData = document.getElementById('showData');

myForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const endPoint = 'https://api.ocr.space/parse/image';

  const formData = new FormData();
  formData.append('inpFile', inpFile.files[0]);
  formData.append('language', 'dut');
  formData.append('isTable', 'true');
  const myHeaders = new Headers();
  myHeaders.append('apikey', 'd0bef30f5388957');
  fetch(endPoint, { method: 'post', body: formData, headers: myHeaders })
    .then((response) => response.json())
    .then((result) => {
      showData.innerHTML = '';
      result.ParsedResults[0].TextOverlay.Lines.forEach((line) => {
        const lineBox = document.createElement('div');
        lineBox.classList.add('line-box');
        lineBox.innerText = line.LineText;
        showData.appendChild(lineBox);
      });
    })
    .catch((error) => console.log('error', error));
});
