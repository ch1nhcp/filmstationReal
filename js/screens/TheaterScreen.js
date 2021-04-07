import {getAllFilms} from '../models/film.js';

const $template = document.createElement('template');
$template.innerHTML = `
    <div id="theater-screen">
        <nav-bar></nav-bar>
        <film-list></film-list>
    </div>
`;

export default class TheaterScreen extends HTMLElement {

    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$filmList = this.querySelector("film-list");
    }

    connectedCallback() {
        this.showFilms();
    }

    async loadFilms() {
        let data = await getAllFilms();
        return data;
    }

    async showFilms() {
        let films = await this.loadFilms();
        console.log(films);
        this.$filmList.setAttribute('films', JSON.stringify(films));
    }
}

window.customElements.define('theater-screen', TheaterScreen);