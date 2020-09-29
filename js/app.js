$(document).ready(() => {


/*
//View Profile Button
$('#viewProfile').on('click', (e) => {
  axios
  .get('https://api.github.com/users/bradtraversy')
  .then(response => {
  let result = response.data;
  window.open(`${result.html_url}`);
  })
  .catch(error => console.log(error));
})

*/


//Search Event
$('#userSearch').on('keyup', (e) => {

//Clearing Parent Each Time
$('#profile').empty();

//Input Value
let username = e.target.value;
console.log(username);

//AXIOS http request
axios
.get(`https://api.github.com/users/${username}`) //roma
.then(response => {

//User Info
fillContent(response.data);

//Repos Info
fetchRepos(username);


})
//If for some reason error occurs console.log it
.catch(error => console.log(error));
});


//Fill page with content from API data
function fillContent(data) {
let display = `
<div class="container text-muted">
<div class="card mt-4">
<div class="card-header" id="userName">${data.name}</div>
<div class="card-body">
<div class="row">

<div class="col-lg-3">
<img id="userImg" class="w-100 img-fluid" src="${data.avatar_url}">
<a class="btn btn-danger btn-block mt-3" id="viewProfile" href="${data.html_url}" target="_blank">View Profile</a>
</div>

<div class="col-lg-9">

<div class="d-flex flex-row ml-4 mt-3">
<span class="badge badge-secondary mr-1 p-2">Public Repos : <span id="publicRepos">${data.public_repos}</span></span>
<span class="badge badge-danger mr-1 p-2">Public Gists : <span id="publicGists">${data.public_gists}</span></span>
<span class="badge badge-success mr-1 p-2">Followers : <span id="followers">${data.followers}</span></span>
<span class="badge badge-info p-2">Following : <span id="following">${data.following}</span></span>
</div>

<div class="d-flex flex-column ml-4 mt-3">
<ul class="list-group">
  <li class="list-group-item">Company : <span id="company">${data.company}</span></li>
  <li class="list-group-item">Website/Blog : <span id="blog">${data.blog}</span></li>
  <li class="list-group-item">Location : <span id="location">${data.location}</span></li>
  <li class="list-group-item">Member since : <span id="member">${data.created_at}</span></li>
</ul>
</div>

</div>

</div>
</div>
</div>
</div>`;

$('#profile').append(display);
}


//Get User's Repo Info
function fetchRepos(username) {
  axios
  .get(`https://api.github.com/users/${username}/repos`)
  .then(response => {
  createRepos(response.data);
  })
  .catch(error => console.log(error));
}



//Creating Recent Repos
function createRepos(data) {
$('#parent').empty();
let display = '';

for(let i = 0; i < data.length; i++) {

  if(i < 5) {
    display += `<div class="card bg-muted mb-2">
    <div class="card-body">
    <div class="d-flex flex-row justify-content-sm-between">
    <div class="col-lg-4"><span id="repoName" class="font-weight-bold">${data[i].name}</span> : <span id="repoDescription">${data[i].description}</span></div>
    <div class="col-lg-4">
      <span class="badge badge-secondary mr-1 p-2">Forks : <span id="forks">${data[i].forks}</span></span>
      <span class="badge badge-danger mr-1 p-2">Watchers : <span id="watchers">${data[i].watchers}</span></span>
      <span class="badge badge-success mr-1 p-2">Size : <span id="stats">${data[i].size}</span></span>
    </div>
    <div class="col-lg-4">
      <a class="btn btn-dark btn-lg" id="repoPage" href="${data[i].html_url}" target=”_blank”>Repo Page</a>
    </div>
    </div>
    </div>
    </div>`;
  }

}
$('#parent').append(display);
}




























})
