const searchBar = document.querySelector('.header-container-search');
const siteTitle = document.querySelector('.header-link');
const searchIcon = document.querySelector('.search-icon');

searchBar.focus();

const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fa12b18171b3b2657c9bff849d2eb546';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

async function getDataSearch() {
    const urlSearch = `https://api.themoviedb.org/3/search/movie?query=${searchBar.value}&api_key=fa12b18171b3b2657c9bff849d2eb546`;
    const res = await fetch(urlSearch);
    const data = await res.json();
    document.querySelector('.main-container').innerHTML = "";
    showData(data);
}

function search (event) {
    if (event.key === 'Enter') {
        getDataSearch();
    } else {
        ;
    }
}

function clickSearch (event) {
    if (document.querySelector('.header-container-search').value === "") {
        refresh();
        searchBar.focus();
    } else {
        getDataSearch();
        searchBar.focus();
    }
}

function showData(data) {
    if (data.results.length === 0) {
        const noData = document.createElement('div');
        const noDataText = document.createElement('h3');
        noData.classList.add('no-info');
        noDataText.classList.add('no-info-text');
        document.querySelector('.main-container').append(noData);
        noData.append(noDataText);
        document.querySelector('.no-info-text').textContent = "No results found";
    } else {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        document.querySelector('.main-container').append(movieContainer);
        data.results.map((element, index) => {
        const movie = document.createElement('div');
        const image = document.createElement('img');
        const movieInfo = document.createElement('div');
        const movieInfoName = document.createElement('h3');
        const rating = document.createElement('span');
        const overview = document.createElement('div');
        const overviewTitle = document.createElement('h3');
        const overviewText = document.createElement('p');
        movie.classList.add('movie');
        image.classList.add('movie-poster');
        movieInfo.classList.add('movie-info');
        movieInfoName.classList.add('movie-info-name');
        rating.classList.add('rating');
        overview.classList.add('overview');
        overviewTitle.textContent = "Overview";
        overviewText.classList.add('overview-text');
        document.querySelector('.movie-container').append(movie);
        movie.append(image);
        movie.append(movieInfo);
        movieInfo.append(movieInfoName);
        movieInfo.append(rating);
        movie.append(overview);
        overview.append(overviewTitle);
        overview.append(overviewText);
    });
    document.querySelectorAll('.movie-info-name').forEach((element, index) => element.textContent = `${data.results[index].title}`);
    document.querySelectorAll('.overview-text').forEach((element, index) => {
        if (data.results[index].overview.length === 0) {
            element.textContent = "No info yet";
        } else {
            element.textContent = `${data.results[index].overview}`;
        }
    });
    document.querySelectorAll('.rating').forEach((element, index) => {
        if (data.results[index].vote_average >= 8) {
            element.textContent = `${data.results[index].vote_average}`;
            element.classList.add('green');
        } else if (data.results[index].vote_average >= 5 && data.results[index].vote_average < 8) {
            element.textContent = `${data.results[index].vote_average}`;
            element.classList.add('orange');
        } else if (data.results[index].vote_average < 5) {
            element.textContent = `${data.results[index].vote_average}`;
            element.classList.add('red');
        }
    });
    document.querySelectorAll('.movie-poster').forEach((element, index) => {
        if (!data.results[index].poster_path) {
            element.src = "./assets/img/no-info.png";
            return;
        }
        element.src = `https://image.tmdb.org/t/p/w1280${data.results[index].poster_path}`;
    });}
}

function refresh() {
    window.location.reload();
}

getData();
searchBar.addEventListener('keypress', search);
searchIcon.addEventListener('click', clickSearch);
siteTitle.addEventListener('click', refresh);