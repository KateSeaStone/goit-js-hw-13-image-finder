import './sass/main.scss';
import PixabayApiService from './js/apiService.js';
import debounce from 'lodash.debounce';
import cardsTpl from './templates/cards.hbs'

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  console.log(event);

  
  pixabayApiService.query = event.target.value;
  pixabayApiService.resetPage();
  pixabayApiService.fetchImages().then(images => {
    clearImagesContainer();
    renderCards(images);
    });  

}

function onLoadMore() {
 pixabayApiService.fetchImages().then(renderCards);    
}

// function renderCards(images) {
//   const markup = cardsTpl(images);
//   const elements = refs.imagesContainer.querySelectorAll('.photo-card');
//   //console.log(elements);
//   const element = elements[elements.length-1];
//   refs.imagesContainer.insertAdjacentHTML('beforeend', markup);

//   if (element) {
//   element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// })};
// }

function renderCards(images) {
//   const markup = cardsTpl(images);
//   const elements = refs.imagesContainer.querySelectorAll('.photo-card');
//   //console.log(elements);
//   const element = elements[elements.length-1];
   refs.imagesContainer.insertAdjacentHTML('beforeend', cardsTpl(images));

//   if (element) {
//   element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// })};
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}