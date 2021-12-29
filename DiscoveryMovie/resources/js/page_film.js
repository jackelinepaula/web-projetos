//PEGANDO PARÂMETRO DA URL
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

//CONSTANTES DA API
const API_KEY = 'api_key=201663297d722c0dc7dd28e65bdea6a3&language=pt-BR';
const URL_BASE = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const search_URL = URL_BASE + '/movie/' + myParam + '?' + API_KEY;


//MAIN
const main = document.querySelector('.main-1-1');


pegarFilme(search_URL);

function pegarFilme(url) {

    fetch(url).then(res => res.json()).then(data => {
        filme(data);

        const { production_companies } = data;
        idcompany = production_companies[0].id;

        montarURL(idcompany);
    })
}

const right = document.getElementById('right');
const left = document.querySelector('.left');

//VAR NOME DA EMPRESA
let company = '';

function filme(data) {

    const { title, poster_path, genres, production_companies, overview, release_date, runtime, tagline, vote_average } = data;

    company = production_companies[0].name;
    //ESTRUTURA LEFT
    left.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}">
     `;

    //ESTRUTURA RIGHT
    right.innerHTML = ''
    right.innerHTML = `<h3> ${title} </h3>
                        <div class="part-2">
                        </div>
                        <div class="part-3">
                        </div>
                        <p class="ava"></p>
                        <h4 class="tagline"></h4>
                        <p class="overview"></p>`

    //FOREACH PART-2

    const part_2 = document.querySelector('.part-2');
    genres.slice(0, 3).forEach(nome => {

        const a = document.createElement('a');
        a.innerHTML = `${nome.name}`

        part_2.appendChild(a);
    })

    //FOREACH PART-3
    const part_3 = document.querySelector('.part-3');

    data = new Date(release_date)
    data_ofc = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    let duracao = runtime / 60;
    let runtime_ofc = String(duracao).replace('.', 'h');
    let run = runtime_ofc.slice(0, 4)

    part_3.innerHTML = `<a>${production_companies[0].name}</a>
                        <a>${data_ofc}</a>
                        <a>${run}min</a>`

    //ESTRELA
    const p = document.querySelector('.ava')
    p.innerHTML = `<i class="fas fa-star"></i>${vote_average}`

    //TAGLINE
    const tag = document.querySelector('.tagline')
    tag.innerHTML = `${tagline}`

    //SINOPSE
    const sin = document.querySelector('.overview')
    sin.innerHTML = `${overview}`
}


function montarURL(id) {
    const empresa_URL = URL_BASE + '/discover/movie?with_companies=' + id + '&' + API_KEY;
    console.log(empresa_URL)

    pegarCompanyFilms(empresa_URL);
}

function pegarCompanyFilms(url) {

    fetch(url).then(res => res.json()).then(data => {
        empresafilm(data.results)
        console.log(data.results);
    })

}

function empresafilm(data) {

    main.innerHTML = '';
    let title = document.createElement('div');
    title.classList.add('main-title');
    
    //TITLE
    title.innerHTML = `<h3>Mais de ${company}</h3>`
    main.appendChild(title)

    data.slice(1, 6).forEach(filme => {
        const { id, title, poster_path, vote_average,  production_companies} = filme;

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

        main.appendChild(cardEl)
    })
}

function mudarPage(id){
    window.location.href = 'page_film.html?id='+id;
    console.log(id);
}