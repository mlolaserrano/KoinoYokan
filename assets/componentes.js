// Componentes 
// Menu
class componenteMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `
    <nav>
        <div class="logo-container">
            <a href="/pages/koino.html" class="logo">Koino Jokan</a>
        </div>
        <ul class="nav-menu">
            <li><a href="#discografia">Discografía</a></li>
            <li><a href="#eventos">Eventos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          <a href="/pages/login.html" class="no-style-link">  <i class="fi fi-rr-circle-user" style="font-size: 20px "></i> </a>
        </ul>
    </nav>
        `;
    }
}
customElements.define('componente-menu', componenteMenu);

// footer
class componenteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `
        <div class="container text-center">
        <div class="row align-items-start">
          <div class="col">
         <a href="https://open.spotify.com/intl-es/artist/31kgZWvoPhxDcTKgVbgi3J?autoplay=true" target="_blank"  class="no-style-link"><i class="fi fi-brands-spotify"  ></i> </a>
          </div>
          <div class="col">
          <a href="https://www.youtube.com/channel/UCk_FkSVnFOhHIn6ejDtcDBw" target="_blank"  class="no-style-link"><i class="fi fi-brands-youtube" ></i></a>
          </div>
          <div class="col">
          <a href="https://www.instagram.com/koinoyokanmusica/" target="_blank" class="no-style-link"><i class="fi fi-brands-instagram"></i></a>
          </div>
        </div>
      </div>
        `;
    }
}
customElements.define('componente-footer', componenteFooter);