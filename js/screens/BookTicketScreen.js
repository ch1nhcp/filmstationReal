import { getFilmById, updateTickets } from "../models/film.js";
import { getcurrentUser } from "../models/user.js";

const $template = document.createElement("template");
$template.innerHTML = `
<div id="book-ticket-screen">
    <div class="film-name">Tên phim</div>
    
    <div class="monitor"></div>
    <div class="seat-list">
    
    </div>
    <div id ="total-price"><span>Giá vé: 45000 vnđ.</span>
    Tong thanh toan: </div>
    <button id= "confirm-btn">Book</button>
</div>
`;

export default class BookTicketScreen extends HTMLElement {
  $seats = [];
  currentFilm = null;
  currentUser = null;
  tickets = [];
  constructor() {
    super();
    this.appendChild($template.content.cloneNode(true));
    this.$filmName = this.querySelector(".film-name");
    this.$seatList = this.querySelector(".seat-list");
    this.$confirmBtn = this.querySelector("#confirm-btn");
    this.$totalPrice = this.querySelector("#total-price");
  }

  static get observedAttributes() {
    return ["film-id"]; // json
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "film-id") {
      this.loadCurrentFilm(newValue);
    }
  }

  async connectedCallback() {
    this.$confirmBtn.onclick = async () => {
      await updateTickets(this.getAttribute("film-id"), this.tickets);
      for (let seat of this.tickets) {
        let tmp = seat.position;
        this.$seats[tmp].onclick = () => false;
      }

      alert("Bạn đã đặt vé thành công! ")
    };
  }

  toggleSeat(index) {
    let $seat = this.$seats[index];
    if ($seat.classList.contains("occupied")) {
      $seat.classList.remove("occupied");
      let tmp = this.tickets.findIndex((seat) => seat.position == index);
      if (tmp > -1) this.tickets.splice(tmp, 1);
    } else {
      $seat.classList.add("occupied");
      this.tickets.push({ userId: this.currentUser.id, position: index });
    }
    this.calculateTotalPrice();
  }

  async loadCurrentFilm(id) {
    try {
      this.currentUser = await getcurrentUser();
      console.log(this.currentUser);
    } catch (error) {
      router.navigate("/auth");
    }

    this.currentFilm = await getFilmById(id);
    this.tickets = this.currentFilm.tickets;
    this.showSeats();
    this.calculateTotalPrice();
  }

  showSeats() {
    this.$seats = [];
    this.$seatList.innerHTML = "";
    for (let i = 0; i < 60; i++) {
      let $seat = document.createElement("div");
      $seat.className = "seat";
      this.$seatList.appendChild($seat);
      this.$seats.push($seat);

      let tmp = this.currentFilm.tickets.findIndex(
        (ticket) => ticket.position == i
      );

      if (tmp > -1) {
        $seat.classList.add("occupied");
      } else {
        $seat.onclick = () => {
          this.toggleSeat(i);
        };
      }
    }
  }

  calculateTotalPrice() {
    console.log(this.currentUser);
    let tmp = this.tickets.filter(
      (ticket) => ticket.userId == this.currentUser.id
    );
    let totalPrice = this.currentFilm.price * tmp.length;
    this.$totalPrice.innerHTML = "<span>Giá vé: 45000 vnđ.</span><br><br>" + "Tổng thanh toán " + totalPrice + " vnđ";
  }
}

window.customElements.define("book-ticket-screen", BookTicketScreen);
