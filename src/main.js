import { fetchImages } from '../src/js/pixabay-api';
import {
  renderImages,
  showLoadingIndicator,
  hideLoadingIndicator,
} from './js/render-function';

document
  .querySelector('.search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();

    const query = event.target.elements.searchQuery.value.trim();
    if (!query) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please enter a search query!',
      });
      return;
    }

    showLoadingIndicator();

    try {
      const data = await fetchImages(query);
      renderImages(data.hits);
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: `Something went wrong: ${error.message}`,
      });
    } finally {
      hideLoadingIndicator();
    }
  });
