let router = new Navigo(null, true);
let $app = document.getElementById("app");

router
  .on("/", function () {
    $app.innerHTML = "<index-screen></index-screen>";
  })
  .resolve();

router
  .on("/auth", function () {
    $app.innerHTML = "<auth-screen></auth-screen>";
  })
  .resolve();

router
  .on("/trending", function () {
    $app.innerHTML = "<trending-screen></trending-screen>";
  })
  .resolve();
router
  .on("/theater", function () {
    $app.innerHTML = "<theater-screen></theater-screen>";
  })
  .resolve();
router
  .on("/profile", function () {
    $app.innerHTML = "<profile-screen></profile-screen>";
  })
  .resolve();
router
  .on("/book-ticket/:id", function (param) {
    $app.innerHTML = `<book-ticket-screen film-id="${param.id}"></book-ticket-screen>`;
  })
  .resolve();

window.router = router;
