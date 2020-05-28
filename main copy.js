// Main Variables
let theInput = document.querySelector('.get-repos input');
let getButton = document.querySelector('.get-repos .get-button');
let reposData = document.querySelector('.show-data');

// document.addEventListener('DOMContentLoaded', (event) => {
//   console.log('DOM fully loaded and parsed');
// });

getButton.addEventListener('click', getRepos);

//Get Repos Function
function getRepos() {
  if (theInput.value.trim() === '') {
    reposData.innerHTML =
      '<div class="alert">Please write GitHub UserName.</div>';
  } else {
    //    https://api.github.com/users/Adham-Elias-Botrous/repos`

    fetch(`https://api.github.com/users/${theInput.value.trim()}/repos`)
      .then((response) => {
        if (!response.ok)
          throw Error(`Request rejected with status ${response.status}`);
        return response.json();
      })
      .then((repos) => {
        //empty the container
        reposData.innerHTML = '';
        //loop on the repos
        repos.forEach((repo) => {
          //   create the main Div Element
          let mainDiv = document.createElement('div');
          //add class on mainDin
          mainDiv.className = 'repo-box';
          //   mainDiv.classList.add('repo-box');
          //The Name: create repo name text
          let repoName = document.createTextNode(repo.name);
          //append the repoName to the mainDiv
          mainDiv.appendChild(repoName);

          //The URL: create repo url
          let repoUrl = document.createElement('a');
          //create url text
          let repoUrlText = document.createTextNode('Visit');
          //append the text to url
          repoUrl.appendChild(repoUrlText);
          //add the href
          repoUrl.href = repo.html_url;
          //to open in new tab
          repoUrl.target = '_blank';
          //   repoUrl.setAttribute('targt', '_blank');
          //append the url to the mainDiv
          mainDiv.appendChild(repoUrl);

          //The stars: create span element for the stars
          let starsSpan = document.createElement('span');
          //create the starsText
          let starsText = document.createTextNode(
            `stars: ${repo.stargazers_count}`
          );
          //append starsTekst to the starsSpan
          starsSpan.appendChild(starsText);
          //append statsSpan to the mainDiv
          mainDiv.appendChild(starsSpan);

          //to the DOM: append the mainDiv to the containter
          reposData.appendChild(mainDiv);
        });
      })
      .catch((error) => {
        reposData.innerHTML = `<div class="alert">${error}</div>`;
      });
  }
}
