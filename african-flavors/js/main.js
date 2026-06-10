/* Logique JavaScript pour African Flavors */
const favoritesKey = 'africanFlavorsFavorites';
const currencyKey = 'africanFlavorsCurrency';
let favorites = [];
let selectedCurrency = 'XOF';

/**
 * Convertit un montant en XOF vers la devise choisie.
 * Utilise switch pour sélectionner la bonne conversion.
 */
function convertCurrency(amountXOF, currency) {
  let converted = amountXOF;

  switch (currency) {
    case 'USD':
      converted = amountXOF * 0.0017;
      break;
    case 'EUR':
      converted = amountXOF * 0.0016;
      break;
    default:
      converted = amountXOF;
  }

  return formatCurrency(converted, currency);
}

/**
 * Formate un montant avec la devise et une présentation locale.
 */
function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: currency === 'XOF' ? 0 : 2,
    maximumFractionDigits: currency === 'XOF' ? 0 : 2
  }).format(value);
}


/**
 * Ajoute un plat aux favoris et met à jour le localStorage.
 */
function addFavorite(dishId) {
  if (!favorites.includes(dishId)) {
    favorites.push(dishId);
    saveFavorites();
    renderCurrentPage();
  }
}

/**
 * Supprime un plat des favoris et met à jour le localStorage.
 */
function removeFavorite(dishId) {
  favorites = favorites.filter(id => id !== dishId);
  saveFavorites();
  renderCurrentPage();
}

/**
 * Récupère les favoris depuis localStorage.
 */
function loadFavorites() {
  const stored = localStorage.getItem(favoritesKey);
  favorites = stored ? JSON.parse(stored) : [];
}

/**
 * Sauvegarde les favoris dans localStorage.
 */
function saveFavorites() {
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

/**
 * Charge la devise choisie depuis localStorage.
 */
function loadCurrency() {
  const stored = localStorage.getItem(currencyKey);
  selectedCurrency = stored || 'XOF';
}

/**
 * Sauvegarde la devise choisie dans localStorage.
 */
function saveCurrency(currency) {
  selectedCurrency = currency;
  localStorage.setItem(currencyKey, currency);
}

/**
 * Filtre les plats par pays et recherche texte.
 */
function filterDishes(countryValue = 'all', searchQuery = '') {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return dishes
    .filter(dish => {
      const matchCountry = countryValue === 'all' || dish.country === countryValue;
      const text = `${dish.name} ${dish.country} ${dish.description} ${dish.history} ${dish.ingredients.join(' ')} ${dish.flavors.join(' ')}`.toLowerCase();
      const matchSearch = normalizedQuery === '' || text.includes(normalizedQuery);
      return matchCountry && matchSearch;
    });
}

/**
 * Affiche les plats passés dans un conteneur donné.
 */
function displayDishes(dishesArray, container) {
  if (!container) return;

  if (dishesArray.length === 0) {
    container.innerHTML = '<p class="empty-state">No dishes match your search.</p>';
    return;
  }


  container.innerHTML = dishesArray.map(dish => {
    const isFavorite = favorites.includes(dish.id);
    const buttonText = isFavorite ? 'Remove from favorites' : 'Add to favorites';


    return `
      <article class="dish-card${isFavorite ? ' favorite' : ''}">
        <img src="${dish.image}" alt="${dish.name} du ${dish.country}" loading="lazy" />
        <div class="dish-card-body">
          <div class="dish-meta">
            <span>${dish.country}</span>
            <span>${dish.category}</span>
            <span>Spice level ${dish.spiceLevel}/5</span>

          </div>
          <h3>${dish.name}</h3>
          <p>${dish.description}</p>
          <div class="dish-info">
            <p><strong>Origin:</strong> ${dish.origin}</p>
            <p><strong>Time:</strong> ${dish.prepTime} • <strong>Price:</strong> ${convertCurrency(dish.priceXOF, selectedCurrency)}</p>
            <p><strong>Drink pairing:</strong> ${dish.drinkPairing}</p>
            <p><strong>Fun fact:</strong> ${dish.funFact}</p>

            <div>
              <strong>Ingredients:</strong>

              <ul class="tag-list">${dish.ingredients.map(item => `<li>${item}</li>`).join('')}</ul>
            </div>
            <div>
              <strong>Flavors:</strong>

              <ul class="tag-list">${dish.flavors.map(flavor => `<li>${flavor}</li>`).join('')}</ul>
            </div>
          </div>
          <button class="favorite-button" data-action="${isFavorite ? 'remove' : 'add'}" data-id="${dish.id}">${buttonText}</button>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Affiche les favoris sur la page favorites.html.
 */
function displayFavorites() {
  const container = document.getElementById('favorites-list');
  const emptyState = document.getElementById('favorites-empty');
  if (!container) return;

  const favoriteDishes = favorites.map(id => dishes.find(dish => dish.id === id)).filter(Boolean);

  if (favoriteDishes.length === 0) {
    emptyState.style.display = 'block';
    container.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  displayDishes(favoriteDishes, container);
}

/**
 * Initialisation de la page et des événements.
 */
function init() {
  loadFavorites();
  loadCurrency();
  populateCountryFilter();
  bindCurrencySelector();
  bindSearch();
  bindDishButtons();
  bindContactForm();
  renderCurrentPage();
}

/**
 * Méthode pour afficher la page actuelle selon le contexte.
 */
function renderCurrentPage() {
  const dishList = document.getElementById('dish-list');

  if (dishList) {
    const countrySelect = document.getElementById('country-filter');
    const searchInput = document.getElementById('search-input');
    const countryValue = countrySelect ? countrySelect.value : 'all';
    const searchQuery = searchInput ? searchInput.value : '';
    const filteredDishes = filterDishes(countryValue, searchQuery);
    displayDishes(filteredDishes, dishList);
  }

  const favoritesList = document.getElementById('favorites-list');
  if (favoritesList) {
    displayFavorites();
  }

  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.value = selectedCurrency;
  }
}

/**
 * Remplit le sélecteur de pays avec les pays définis dans data.js.
 */
function populateCountryFilter() {
  const select = document.getElementById('country-filter');
  if (!select) return;

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country.name;
    option.textContent = `${country.flag} ${country.name}`;
    select.appendChild(option);
  });
}

/**
 * Lie le champ de recherche et le filtre pays aux actions d’affichage.
 */
function bindSearch() {
  const countrySelect = document.getElementById('country-filter');
  const searchInput = document.getElementById('search-input');

  if (countrySelect) {
    countrySelect.addEventListener('change', () => renderCurrentPage());
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => renderCurrentPage());
  }
}

/**
 * Lie le sélecteur de devise au stockage local et réaffiche les prix.
 */
function bindCurrencySelector() {
  const currencySelect = document.getElementById('currency-select');
  if (!currencySelect) return;

  currencySelect.value = selectedCurrency;
  currencySelect.addEventListener('change', event => {
    const currency = event.target.value;
    saveCurrency(currency);
    renderCurrentPage();
  });
}

/**
 * Gère les clics sur les boutons d’ajout/suppression de favoris.
 */
function bindDishButtons() {
  document.body.addEventListener('click', event => {
    const target = event.target;
    if (!target.matches('[data-action]')) return;

    const action = target.dataset.action;
    const id = Number(target.dataset.id);

    if (action === 'add') {
      addFavorite(id);
    } else if (action === 'remove') {
      removeFavorite(id);
    }
  });
}

/**
 * Valide le formulaire de contact côté client.
 */
function bindContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();

    const nameField = document.getElementById('contact-name');
    const emailField = document.getElementById('contact-email');
    const favoriteField = document.getElementById('contact-favorite');
    const messageField = document.getElementById('contact-message');

    const errors = {
      name: '',
      email: '',
      favorite: '',
      message: ''
    };

    if (!nameField.value.trim()) {
      errors.name = 'Name is required.';
    }

    if (!emailField.value.trim() || !emailField.value.includes('@')) {
      errors.email = 'A valid email is required.';
    }

    if (!favoriteField.value.trim()) {
      errors.favorite = 'Please enter your favorite dish.';
    }

    if (!messageField.value.trim()) {
      errors.message = 'Message cannot be empty.';
    }


    displayFormErrors(errors);

    const hasError = Object.values(errors).some(error => error !== '');

    if (!hasError) {
      form.reset();
      document.getElementById('contact-success').textContent = 'Thank you! Your message has been sent.';
    }

  });
}

/**
 * Affiche les messages d’erreur du formulaire.
 */
function displayFormErrors(errors) {
  document.getElementById('error-name').textContent = errors.name;
  document.getElementById('error-email').textContent = errors.email;
  document.getElementById('error-favorite').textContent = errors.favorite;
  document.getElementById('error-message').textContent = errors.message;
}

/**
 * Démarre l’application lorsque le DOM est prêt.
 */
document.addEventListener('DOMContentLoaded', init);
