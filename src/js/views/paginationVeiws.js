import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationVeiw extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    // Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return ` 
          <button class="btn--inline pagination__btn--next" data-goto="${
            currPage + 1
          }">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }

    // Last Page
    if (currPage === numPages) {
      return ` <button class="btn--inline pagination__btn--prev" data-goto="${
        currPage - 1
      }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
         `;
    }

    // Other pages
    if (currPage < numPages) {
      return ` <button class="btn--inline pagination__btn--prev" data-goto="${
        currPage - 1
      }">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${
            currPage + 1
          }">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }
  }
}

export default new PaginationVeiw();
