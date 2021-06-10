import './sass/main.scss';
import PixabayApiService from './js/apiService.js';
import debounce from 'lodash.debounce';
import cardsTpl from './templates/cards.hbs'
import LoadMoreBtn from './js/loadMoreBtn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
  //loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
  const valueInput = event.target.value;

  if (valueInput.trim() === '') {
    return alert('Неверный запрос!');
  }

  pixabayApiService.query = event.target.value;

  loadMoreBtn.show();
  pixabayApiService.resetPage();
  clearImagesContainer();
  fetchImages();

}

function fetchImages() {
  loadMoreBtn.disable();

  pixabayApiService.fetchImages()
    .then(images => {
      renderCards(images);
      loadMoreBtn.enable()
    }
    );
}

function renderCards(images) {
  const markup = cardsTpl(images);
  refs.imagesContainer.insertAdjacentHTML('beforeend', markup);
  //const elements = refs.imagesContainer.querySelectorAll('.photo-card');
  //const element = elements[elements.length - 1];
  //if (element) {
  loadMoreBtn.refs.button.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  })
  // };
}

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}