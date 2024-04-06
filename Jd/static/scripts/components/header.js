import { Cart } from "./cart.js"

export class Header {

    menuIcon = document.querySelector("[menu-icon]");
    menuContainer = document.getElementById("menu-container");
    menuNav = document.getElementById("menu-nav");

    profileDiv = document.querySelector("[profile-div]")
    profileContainer = document.getElementById("profile-container");
    profileNav = document.getElementById("profile-nav");

    #toggleMenu() {
        this.menuContainer.classList.toggle("active");
        
        this.menuContainer.addEventListener("click", (event) => {
            if (!this.menuNav.contains(event.target)) {
                event.stopPropagation();
                this.menuContainer.classList.remove("active");
            }
        })
      }

    #toggleAccMenu() {
        this.profileContainer.classList.toggle("active");
    
        this.profileContainer.addEventListener("click", (event) => {
            if (!this.profileNav.contains(event.target)) {
                event.stopPropagation();
                this.profileContainer.classList.remove("active");
            }            
        })
    }

    activate() {
        this.menuIcon.addEventListener("click", () => {
            this.#toggleMenu();
        });
        
        this.profileDiv.addEventListener("click", () => {
            this.#toggleAccMenu();
        });
    }

}
