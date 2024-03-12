
let menuIcon = document.getElementById("menu-icon");
let menuContainer = document.getElementById("menu-container");
let menuNav = document.getElementById("menu-nav");

console.log(menuNav)
function toggleMenu() {
  menuContainer.classList.toggle("active");
}
document.addEventListener("click", function (event) {
  if (!menuIcon.contains(event.target) &&
    menuContainer.contains(event.target) &&
    !menuNav.contains(event.target)
  ) {
    event.stopPropagation();
    menuContainer.classList.remove("active");
  }
});
let profileDiv = document.getElementById("profile-div");
let profileContainer = document.getElementById("profile-container");
let profileNav = document.getElementById("profile-nav");

function toggleAccMenu() {
  profileContainer.classList.toggle("active");
}
document.addEventListener("click", function (event) {
  if (!profileDiv.contains(event.target) &&
    profileContainer.contains(event.target) &&
    !profileNav.contains(event.target)
  ) {
    profileContainer.classList.remove("active");
  }
});