// Main Variables
let theInputElm = document.querySelector('.upload-data input');
let sendButtonElm = document.querySelector('.upload-data .send-button');
let showDataElm = document.querySelector('.show-data');

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');
// });

sendButtonElm.addEventListener('click', sendRequest);

//Get Repos Function
function sendRequest() {
  let fileClintPath = theInputElm.value;
  console.log(fileClintPath);
  console.log(theInputElm.files[0].type);
  let url = URL.createObjectURL(theInputElm.files[0]);

  console.log(url);

  // ------------------ key= d0bef30f5388957
  let myHeaders = new Headers();
  myHeaders.append('apikey', 'helloworld');

  let formdata = new FormData();
  formdata.append('language', 'eng');
  formdata.append('isOverlayRequired', 'false');
  // formdata.append('url', url);
  formdata.append('url', 'http://dl.a9t9.com/ocrbenchmark/eng.png');
  formdata.append('iscreatesearchablepdf', 'false');
  formdata.append('issearchablepdfhidetextlayer', 'false');

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://api.ocr.space/parse/image', requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log('error', error));
  // -----------------
  // fetch(
  //   'https://custom-ocr.klippa.com/api/v1?X-Auth-Key=sLiopG4bfDH6wcIZxBjZk85Z9DIiUK7G'
  // )
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
}

// {
//   if (theInputElm.value.trim() === '') {
//     showDataElm.innerHTML =
//       '<div class="alert">Please write GitHub UserName.</div>';
//   } else {
//     //    https://api.github.com/users/Adham-Elias-Botrous/repos`

//     fetch(`https://api.github.com/users/${theInputElm.value.trim()}/repos`)
//       .then((response) => {
//         if (!response.ok)
//           throw Error(`Request rejected with status ${response.status}`);
//         return response.json();
//       })
//       .then((repos) => {
//         //empty the container
//         showDataElm.innerHTML = '';
//         //loop on the repos
//         repos.forEach((repo) => {
//           //   create the main Div Element
//           let mainDiv = document.createElement('div');
//           //add class on mainDin
//           mainDiv.className = 'repo-box';
//           //   mainDiv.classList.add('repo-box');
//           //The Name: create repo name text
//           let repoName = document.createTextNode(repo.name);
//           //append the repoName to the mainDiv
//           mainDiv.appendChild(repoName);

//           //The URL: create repo url
//           let repoUrl = document.createElement('a');
//           //create url text
//           let repoUrlText = document.createTextNode('Visit');
//           //append the text to url
//           repoUrl.appendChild(repoUrlText);
//           //add the href
//           repoUrl.href = repo.html_url;
//           //to open in new tab
//           repoUrl.target = '_blank';
//           //   repoUrl.setAttribute('targt', '_blank');
//           //append the url to the mainDiv
//           mainDiv.appendChild(repoUrl);

//           //The stars: create span element for the stars
//           let starsSpan = document.createElement('span');
//           //create the starsText
//           let starsText = document.createTextNode(
//             `stars: ${repo.stargazers_count}`
//           );
//           //append starsTekst to the starsSpan
//           starsSpan.appendChild(starsText);
//           //append statsSpan to the mainDiv
//           mainDiv.appendChild(starsSpan);

//           //to the DOM: append the mainDiv to the containter
//           showDataElm.appendChild(mainDiv);
//         });
//       })
//       .catch((error) => {
//         showDataElm.innerHTML = `<div class="alert">${error}</div>`;
//       });
//   }
// }
