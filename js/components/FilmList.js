import FilmContainer from "./FilmContainer.js";

const $template = document.createElement("template");
$template.innerHTML = `
<div id="film-list" class="container-fluid mt-5 p-8" style="padding:0px 180px;">
    <div id="movie-content" class="row d-flex justify-content-center"></div>
</div>
`;

export default class FilmList extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$content = this.querySelector("#movie-content");
  }

  static get observedAttributes() {
    return ["films"]; // json
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "films") {
      let data = JSON.parse(newValue);
      this.$content.innerHTML = "";
      for (let filmData of data) {
        let $filmContainer = new FilmContainer();
        $filmContainer.setAttribute("title", filmData.title);
        $filmContainer.setAttribute("poster", filmData.poster_path);
        $filmContainer.setAttribute("vote", filmData.vote_average);

        let $div = document.createElement("div");
        $div.className = "col-xs-12 col-sm-6 col-md-6 col-lg-3 p-0";
        $div.appendChild($filmContainer);
        
        this.$content.appendChild($div);
      }
    }
  }
}

window.customElements.define("film-list", FilmList);
