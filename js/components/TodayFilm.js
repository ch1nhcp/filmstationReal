const $template = document.createElement("template");
$template.innerHTML = `
<div id="today-film">
    <div class="example-2 card">
        <div class="wrapper" id="poster">
            <div class="header">
                <!-- Date -->
                <div class="date">
                    <span id="date">22</span>
                </div>
                <ul class="menu-content">
                    <li>
                        <a href="#" class="fa fa-heart-o"><span id="favorite">18</span></a>
                    </li>
                </ul>
            </div>
            <div class="data">
                <div class="content">
                    <!-- director -->
                    <span class="author" id="author">Jane Doe</span>

                    <!-- Film name -->
                    <h1 class="title" id="title">
                        <a href="#">Stranger Things</a>
                    </h1>

                    <!-- Brief -->
                    <p class="brief" id="brief">
                    The antsy bingers of Netflix will eagerly anticipate the
                    digital release of the Survive soundtrack, out today.
                    </p>

                    <!-- Links to book ticket -->
                    <a href="#" class="button">Book Tickets</a>
                </div>
            </div>
        </div>
    </div>
</div>
`;

export default class TodayFilm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
        this.$date = this.querySelector("#date");
        this.$favorite = this.querySelector("#favorite");
        this.$author = this.querySelector("#author");
        this.$title = this.querySelector("#title");
        this.$poster = this.querySelector("#poster");
        this.$brief = this.querySelector("#brief");

    }

    static get observedAttributes() {
        return ["date", "author", "title", "poster", "brief", "favorite"];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
         switch(attrName){
            case 'date':
                this.$date.innerHTML = newValue;
                break;
            case 'title':
                this.$title.innerHTML = newValue;
                break;
            case 'author':
                this.$author.innerHTML = newValue;
                break;
            case 'poster':
                this.$poster.style.background = "url('" + newValue + "')";
                break;
            case 'brief':
                this.$brief.innerHTML = newValue;
                break;
            case 'favorite':
                this.$favorite.innerHTML = (newValue != 'undefined') ? newValue : 28;
                break;
        }
    }
}

window.customElements.define("today-film", TodayFilm);
