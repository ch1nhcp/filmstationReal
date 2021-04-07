import { getRandomFilm } from "../models/film.js";

const $template = document.createElement("template");
$template.innerHTML = `
    <div id="index-screen">
        <nav-bar></nav-bar>
        <section id="home" style="margin-top: 100px; backdrop-filter: blur(10px);">
            
            <div class="inner-width">
                <div class="content">
                    <h1 id="tieude">1 click để biết xem gì hôm nay !</h1>
                    <today-film></today-film>
                    <div class="buttons">
                        <button id="random-film-btn">Go!</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
`;

export default class IndexScreen extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$randomFilmBtn = this.querySelector("#random-film-btn");
    this.$todayFilm = this.querySelector("today-film");
    this.$home = this.querySelector("#home");
  }

  connectedCallback() {
    this.showRandomFilm();

    this.$randomFilmBtn.onclick = () => {
      this.showRandomFilm();
    };
  }

  async showRandomFilm() {
    let film = await getRandomFilm();
    console.log(film);
    this.$todayFilm.id = film.id;
    this.$todayFilm.setAttribute("title", film.title);
    this.$todayFilm.setAttribute("date", film.release_date);
    this.$todayFilm.setAttribute("author", "Tom Raider");
    this.$todayFilm.setAttribute("poster", film.poster_path);
    this.$todayFilm.setAttribute("brief", film.overview);
    this.$todayFilm.setAttribute("favorite", film.vote_count);

    // this.$home.style.background = "url(" + film.poster_path + ")";
    document.getElementById("app").style.backgroundImage =
      "url(" + film.poster_path + ")";
    // body.style.background.src = "url(" + film.poster_path + ")";
  }
}

window.customElements.define("index-screen", IndexScreen);
