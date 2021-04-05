const $template = document.createElement('template');
$template.innerHTML = `
    <div id="index-screen">
        <nav-bar></nav-bar>
        <section id="home" style="margin-top: 100px">
            <div class="inner-width">
                <div class="content">
                    <h1 id="tieude">1 click để biết xem gì hôm nay !</h1>
                    <today-film></today-film>
                    <div class="buttons">
                        <a onClick="window.location.reload();">Go !</a>
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
    }
}

window.customElements.define('index-screen', IndexScreen);