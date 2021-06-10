const API_KEY = '22003167-822d2c3fa2b59190c92d4d864';
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
  constructor() {
    this.searchQuery ='';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;

   return fetch(url)
   .then(response => response.json())
   .then(data => {
     this.page +=1;
     return data.hits;
   });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;    
  }

}






