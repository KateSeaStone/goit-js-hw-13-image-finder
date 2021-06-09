const API_KEY = '22003167-822d2c3fa2b59190c92d4d864';
const BASE_URL = 'https://pixabay.com/api';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    //console.log(this);
    // const options = {
    //   headers: {
    //       Authorization: API_KEY,
    //   },
    // };
    const url = `${BASE_URL}/?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12`;

   return fetch(url)
   .then(response => response.json())
   .then(data => {
     //console.log(data);
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






// fetchImages() {
//   const url = `${BASE_URL}/?key=${API_KEY}&image_type=photo&orientation=horizontal&q=flowers&page=1&per_page=12`;

//     return fetch(url, options)
//       .then(response => response.json())
//       .then(({ images }) => {
//         console.log(images);
//         //this.incrementPage();
//         return images;
//       });
//   }
// }
