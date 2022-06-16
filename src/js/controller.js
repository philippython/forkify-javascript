import {
  state,
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  addBookmark,
  deleteBookmark,
  uploadRecipe,
} from './model.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeViews.js';
import resultsView from './views/resultsView.js';
import bookmarkVeiws from './views/bookmarkVeiws.js';
import paginationVeiws from './views/paginationVeiws.js';
import AddRecipeView from './views/addRecipes.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
const controllRecipes = async function () {
  try {
    //Get ID

    const id = window.location.hash.slice(1);

    // 0) Update results view to mark selected search results
    resultsView.render(getSearchResultsPage());

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await loadRecipe(id);

    // 2) controlling recipes
    recipeView.render(state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get Search Query
    const query = searchView.getQuery();

    if (!query) return;
    // 3) Load search results

    await loadSearchResults(query);

    // resultsView.render(state.search.result);
    resultsView.render(getSearchResultsPage());

    // 4) Render pagination

    paginationVeiws.render(state.search);
  } catch (err) {
    // console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render NEW results
  resultsView.render(getSearchResultsPage(goToPage));

  // Render NEW Pagination
  paginationVeiws.render(state.search);
};

const controlAddBookmark = function () {
  // Add or remove a bookmark
  if (!state.recipe.bookmarked) addBookmark(state.recipe);
  else deleteBookmark(state.recipe.id);

  // update recipe view
  recipeView.render(state.recipe);

  bookmarkVeiws.render(state.bookmarks);
};
bookmarkVeiws.render(state.bookmarks);

const controlAddRecipe = async function (newRecipe) {
  try {
    // Upload new recipe data
    await uploadRecipe(newRecipe);
  } catch (err) {
    AddRecipeView.renderError(err.message);
  }
};
const init = function () {
  recipeView.addHandlerRecipe(controllRecipes);
  recipeView.addHandleAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationVeiws.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};

init();

///////////////////////////////////////
console.log('welcome');
