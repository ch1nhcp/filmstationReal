import { getcurrentUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = /*html*/ `
    <nav class="navbar">
        <div class="inner-width">
            <a href="#" class="logo"></a>
            <button class="menu-toggler">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="navbar-menu">
                <a href="#/trending">Trending</a>
                <a href="#/theater">Theater</a>
                <a href="/Our Team/index.html">About Us</a>
                <a id="sign-in-link" href="#/auth">Sign In</a>
                <a id="profile-link" href="#"></a>
            </div>
        </div>
    </nav>
`;

export default class Navbar extends HTMLElement {
    currentUser;

    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$signInLink = this.querySelector("#sign-in-link");
        this.$profileLink = this.querySelector("#profile-link");
    }

    async connectedCallback() {
        try {
            this.currentUser = await getcurrentUser();
            this.$signInLink.style.display = "none";
            this.$profileLink.innerHTML = this.currentUser.name;
        } catch (error) {
            this.$profileLink.style.display = "none";
        }
    }
}

window.customElements.define('nav-bar', Navbar);