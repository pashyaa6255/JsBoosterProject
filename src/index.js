const api = `https://randomuser.me/api`;
const addUser = document.getElementById("add-user-btn");

const sortBtnDesc = document.getElementById("sortDesc");
const sortBtnAsc = document.getElementById("sortAsc");
const appState = [];
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");

class User {
  constructor(title, firstname, lastname, gender, email) {
    this.title = `${title}`;
    this.name = `${firstname} ${lastname}`;
    this.email = email;
    this.gender = gender;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  const classUser = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );
  appState.push(user);
  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEl = document.createElement("div");
    userEl.innerHTML = `<div>
  <ol>
    Name:-${userObj.name.title} ${userObj.name.first} ${userObj.name.last} 
    <li>Gender- ${userObj.gender}</li>
    <li>EmailId-${userObj.email}</li>
  </ol>
  </div>`;
    userList.appendChild(userEl);
  });
};

searchInput.addEventListener("keyup", (e) => {
  //console.log(e, searchInput.value);
  const filteredAppState = appState.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});
sortBtnDesc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first > b.name.first ? -1 : 1));
  domRenderer(appStateCopy);
});
sortBtnAsc.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first > b.name.first ? 1 : -1));
  domRenderer(appStateCopy);
});
