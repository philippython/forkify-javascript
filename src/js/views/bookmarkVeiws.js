import View from './view';
import icons from 'url:../../img/icons.svg';

class bookmarkVeiws extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);

    return `
          <li class="preview">
            <a class="preview__link  ${
              results.id === id ? 'preview__link--active' : ''
            }" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="Test" />
              </figure>
              <div class="preview__results">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
              </div>
            </a>
          </li>
        `;
  }
}
export default new bookmarkVeiws();
