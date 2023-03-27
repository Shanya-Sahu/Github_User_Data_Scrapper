//Scrape Github User Data
const api_url = "https://api.github.com/users/{user}";
let searchUser = document.querySelector("#search");
let loader = document.querySelector(".loader");
let githubProfileData = document.querySelector(".github-profile-data");
let notFound = document.querySelector("[data-notFound]");
let print = document.querySelector("[data-print]");

githubProfileData.classList.add("hidden");
loader.classList.remove("hidden");

//theme-mode   ---> switch in dark or light
let themeMode = document.querySelector("[data-themeMode]");
let dataLightmode = document.querySelector("[data-lightmode]");

themeMode.addEventListener("click", () => {
  //toggle dark-mode
  let darkMode = document.querySelectorAll(".dark-bg");
  darkMode.forEach((value) => {
    value.classList.toggle("dark-mode");
  });
});

// let user_name = searchUser.value;
let user_name = "Shanya-Sahu";

function getData() {
  let getUserName = searchUser.value;
  fetchData(getUserName.replaceAll(" ", ""));
}

async function fetchData(username) {
  let user_name = username;
  let response = await fetch(`https://api.github.com/users/${user_name}`);
  let result = await response.json();
  loader.classList.add("hidden");
  githubProfileData.classList.remove("hidden");
  print.classList.remove("hidden");
  showUserData(result);
  console.log(result);
}

function showUserData(info) {
  let data = info;

  if (data?.message === "Not Found") {
    githubProfileData.classList.add("hidden");
    notFound.classList.remove("hidden");
    print.classList.add("hidden");
  } else {
    notFound.classList.add("hidden");

    let profileImg = document.querySelector("[data-profile]");
    let login = document.querySelector("[data-login]");
    let loginLink = document.querySelector("[data-login-link]");
    let username = document.querySelector("[data-username]");
    let joined = document.querySelector("[data-joined]");
    let bio = document.querySelector("[data-bio]");
    let repos = document.querySelector("[data-repos]");
    let followers = document.querySelector("[data-followers]");
    let following = document.querySelector("[data-following]");
    let location = document.querySelector("[data-location]");
    let link = document.querySelector("[data-link]");
    let twitterLink = document.querySelector("[data-twitter-link]");
    let userId = document.querySelector("[data-id]");

    // Optional Chainning operator ->  ?.
    profileImg.src = data?.avatar_url + `.png`;
    username.innerText = data?.name;

    //substring
    let joinedAt = (joined.innerText = data?.created_at);
    let joinedDate = joinedAt.slice(0, 10);
    joined.innerText = joinedDate;
    bio.innerText = data?.bio;
    repos.innerText = data?.public_repos;
    followers.innerText = data?.followers;
    following.innerText = data?.following;
    link.innerText = data?.html_url;
    link.href = data?.html_url;

    if (data?.twitter_username == null) {
      twitterLink.innerText = "Not Available";
      twitterLink.href = "#";
    } else {
      twitterLink.innerText = "https://twitter.com/" + data?.twitter_username;
      twitterLink.href = "https://twitter.com/" + data?.twitter_username;
    }

    if (data?.location == null) {
      location.innerText = "Not Available";
    } else {
      location.innerText = data?.location;
    }

    userId.innerText = "@" + data?.login;
    userId.href = data?.login;
    login.innerText = "@" + data?.login;
    loginLink.href = data?.html_url;
  }
}

fetchData(user_name);
