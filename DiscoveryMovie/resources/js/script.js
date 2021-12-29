//TMDB 

const API_KEY = 'api_key=201663297d722c0dc7dd28e65bdea6a3&language=pt-BR';
const URL_BASE = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const populares_URL = URL_BASE + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const dramas_URL = URL_BASE + '/discover/movie?with_genres=18&primary_release_year=2021&' + API_KEY;
const search_URL = URL_BASE + '/search/movie?' + API_KEY;

//PEGANDO ELEMENTOS HTML
// - // MAINs
const main = document.querySelector('.main');
const main_2 = document.querySelector('.main-2');
const main_3 = document.querySelector('.main-3');

// - // SEARCH
const form = document.getElementById('form');
const search = document.getElementById('search');

//CHAMANDO FUNÇÕES PARA PREENCHER A HOME
pegarPopulares(populares_URL);
pegarDramas(dramas_URL);

function pegarPopulares(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        populares(data.results);
    })

}
function pegarDramas(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        dramas(data.results);
    })

}

//PARA A HOME
function populares(data) {
    main.innerHTML = '';
    let title = document.createElement('div');
    title.classList.add('main-title');
    title.innerHTML = `<h3>Títulos mais populares</h3>`;

    main.appendChild(title);

    data.slice(0, 5).forEach(filme => {
        const { id, title, poster_path, overview, vote_average } = filme;

        //CRIANDO DIV CLASS 'CARD'
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.setAttribute('id', id);
        cardEl.setAttribute('onclick', 'mudarPage(this.id)');
        cardEl.innerHTML = `
        <div class="img">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </div>
        <div class="titulo">
            <h3>${title}</h3>
            <p><i class="fas fa-star"></i>  ${vote_average}</p>
        </div>`;


        main.appendChild(cardEl);
    })

    const line = document.createElement('div');
    line.classList.add('linha');
    main.appendChild(line);

}
function dramas(data) {
    main_2.innerHTML = '';
    let title = document.createElement('div');
    title.classList.add('main-title');
    title.innerHTML = `<h3>Melhores dramas do ano</h3>`;

    main_2.appendChild(title);

    data.slice(0, 5).forEach(filme => {
        const { id, title, poster_path, overview, vote_average } = filme;

        //CRIANDO DIV CLASS 'CARD'
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.setAttribute('id', id);
        cardEl.setAttribute('onclick', 'mudarPage(this.id)');
        cardEl.innerHTML = `
        <div class="img">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </div>
        <div class="titulo">
            <h3>${title}</h3>
            <p><i class="fas fa-star"></i>  ${vote_average}</p>
        </div>`;


        main_2.appendChild(cardEl);
    })

    const line = document.createElement('div');
    line.classList.add('linha');
    main_2.appendChild(line);

}


//SEARCH 

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        pegarPesquisa(search_URL + '&query=' + searchTerm);
    } else {
        pegarPopulares(populares_URL);
        pegarDramas(dramas_URL);
    }
})

function pegarPesquisa(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        pesquisa(data.results);
    })

}
//CRIANDO ESTRUTURA

function pesquisa(data) {
    main.innerHTML = '';
    main_2.innerHTML ='';

    let title = document.createElement('div');
    title.classList.add('main-title');
    title.innerHTML = `<h3>Resultados da pesquisa</h3>`;

    main.appendChild(title);

    data.forEach(filme => {
        const { id, title, poster_path, overview, vote_average } = filme;

        //CRIANDO DIV CLASS 'CARD'
        const cardEl = document.createElement('div');
        cardEl.classList.add('card');
        cardEl.setAttribute('id', id);
        cardEl.setAttribute('onclick', 'mudarPage(this.id)');
        cardEl.innerHTML = `
        <div class="img">
            <img src="${IMG_URL + poster_path}" alt="${title}">
        </div>
        <div class="titulo">
            <h3>${title}</h3>
            <p><i class="fas fa-star"></i>  ${vote_average}</p>
        </div>`;


        main.appendChild(cardEl);
    })

    const line = document.createElement('div');
    line.classList.add('linha');
    main.appendChild(line);
}


//FUNÇÃO TELA VISUALIZAÇÃO

function mudarPage(id){
    window.location.href = 'page_film.html?id='+id;
    console.log(id);
}

