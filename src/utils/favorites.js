// Get favorites from localStorage
export function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}

// Add property to favorites
export function addToFavorites(propertyId) {
  const favorites = getFavorites();
  if (!favorites.includes(propertyId)) {
    favorites.push(propertyId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  return favorites;
}

// Remove property from favorites
export function removeFromFavorites(propertyId) {
  const favorites = getFavorites();
  const updated = favorites.filter(id => id !== propertyId);
  localStorage.setItem('favorites', JSON.stringify(updated));
  return updated;
}

// Check if property is favorited
export function isFavorite(propertyId) {
  const favorites = getFavorites();
  return favorites.includes(propertyId);
}

// Toggle favorite status
export function toggleFavorite(propertyId) {
  if (isFavorite(propertyId)) {
    return removeFromFavorites(propertyId);
  } else {
    return addToFavorites(propertyId);
  }
}
