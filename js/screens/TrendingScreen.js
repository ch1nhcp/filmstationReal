import config from '../config.js';

const $template = document.createElement('template');
$template.innerHTML = `
    <div id="trending-screen">
        <nav-bar></nav-bar>
        <film-list></film-list>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center pb-4">
                <li class="page-item">
                    <button id="previous-btn" class="btn page-link" tabindex="-1">Previous</button>
                </li>
                <li class="page-item">
                    <button id="next-btn" class="btn page-link">Next</button>
                </li>
            </ul>
        </nav>
    </div>
`;

export default class TrendingScreen extends HTMLElement {
    currentPage = 1;

    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$filmList = this.querySelector("film-list");
        this.$previousBtn = this.querySelector("#previous-btn");
        this.$nextBtn = this.querySelector("#next-btn");
    }

    connectedCallback() {

        this.$nextBtn.onclick = () => {
            this.currentPage++;
            this.showFilms();
        }

        this.$previousBtn.onclick = () => {
            if(this.currentPage == 0) return;
            this.currentPage--;
            this.showFilms();
        }

        this.showFilms();
    }

    async loadFilms(page = 1) {
        let response = await fetch(config['api-url'] + page);
        let data = await response.json();
        return data;
    }

    async showFilms() {
        let data = await this.loadFilms(this.currentPage);
        console.log(data.results);
        this.$filmList.setAttribute('films', JSON.stringify(data.results));
    }
}

window.customElements.define('trending-screen', TrendingScreen);