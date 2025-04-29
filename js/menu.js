document.addEventListener("DOMContentLoaded", function () {
  const menu = document.getElementById("menu");
  menu.style.display = "block";

  // Generowanie dynamicznego menu
  menu.innerHTML = `
    <button id="hamburger"><i class="fa-solid fa-bars"></i> <span>Navigation</span></button>
    <ul class="nav-list" id="menu-list">
      <li><i class="fa-solid fa-house"></i> <a href="index.html">Home</a></li>
      <li><i class="fa-solid fa-computer"></i> <a href="it.html">Interests (IT)</a></li>
      <li><i class="fa-solid fa-music"></i> <a href="interests.html">Interests (Other)</a></li>
      <li><i class="fa-solid fa-clipboard"></i> <a href="projects.html">Projects</a> </li>
      <li><i class="fa-solid fa-briefcase"></i> <a href="work.html">Work</a> </li>
      <li><i class="fa-solid fa-image"></i> <a href="gallery.html">Gallery</a> </li>
      <li><i class="fa-solid fa-gamepad"></i> <a href="hangman.html">Hangman</a></li>
      <li class="space">&nbsp;</li>
      <li><i class="fa-solid fa-envelope"></i> <a
        href="mailto:pawelstanik44@gmail.com">pawelstanik44@gmail.com</a></li>
      <li><i class="fa-brands fa-github"></i> <a href="https://github.com/junsevith">Github</a></li>
      <li><i class="fa-brands fa-linkedin"></i> <a
        href="https://www.linkedin.com/in/pawe%C5%82-stanik-30641028a/">LinkedIn</a></li>
    </ul>
  `;

  const hamburger = document.getElementById("hamburger");
  const menuList = document.getElementById("menu-list");

  // Obsługa kliknięcia w hamburgera
  hamburger.addEventListener("click", function () {
    menuList.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Opcjonalnie: zamknij menu po kliknięciu w link
  const links = menuList.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      if (menuList.classList.contains("active")) {
        menuList.classList.remove("active");
      }
    });
  });
});
