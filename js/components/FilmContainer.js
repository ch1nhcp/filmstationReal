const $template = document.createElement("template");
$template.innerHTML = `
<div class="movie-card">
    <img
        class="img-fluid movie-img"
        src=""
        id="poster"
        onError="this.onerror=null;
            this.src='https://th.bing.com/th/id/R66518456f5e1831c9ff8947a47f6bc47?rik=qwOjUrb%2bKfBYpg&riu=http%3a%2f%2fpiq.codeus.net%2fstatic%2fmedia%2fuserpics%2fpiq_339657_400x400.png&ehk=AxVC3gFUnfbp95PEmJV7Mgp%2bZ7XuHANcl%2b1USmRgqKU%3d&risl=&pid=ImgRaw';"
        alt="Sorry, something went wrong"/>
    
    <div class="movie-description p-2 d-flex justify-content-between align-items-center">
        <h3 class="movie-title" id="title"></h3>
        <h4 class="movie-vote" id="vote"></h4>
    </div>
</div>`;

export default class FilmContainer extends HTMLElement {
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));

    this.$title = this.querySelector("#title");
    this.$poster = this.querySelector("#poster");
    this.$vote = this.querySelector("#vote");
  }

  static get observedAttributes() {
    return ["title", "poster", "vote"]; // json
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "title":
        this.$title.innerHTML = newValue;
        break;
      case "poster":
        this.$poster.src = "https://image.tmdb.org/t/p/w500" + newValue;
        break;
      case "vote":
        this.$vote.innerHTML = newValue;
        break;
    }
  }
}

window.customElements.define("film-container", FilmContainer);
