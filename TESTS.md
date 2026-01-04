# Jest/Vitest Tests Documentation

## Overview
This project contains 22 comprehensive tests covering the property filtering logic and favorites functionality. All tests are written using Vitest (a modern test runner for Vite projects) with Testing Library utilities.

## Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:ui
```

## Test Files

### 1. `filterProperties.test.js` - Property Filter Logic Tests (10 tests)

This test suite validates the property search and filter functionality that allows users to narrow down property listings based on various criteria.

#### Test 1: **Return all properties when no criteria is provided**
```javascript
it('should return all properties when no criteria is provided', () => {
  const criteria = { propertyType: '', priceRange: '', bedrooms: '', postcodeArea: '' };
  const result = filterProperties(mockProperties, criteria);
  expect(result).toHaveLength(4);
});
```
**What it validates:** When users don't apply any filters (all dropdowns are set to default), all 4 properties should be displayed.

**How it works:** 
- Creates empty criteria (all strings are empty)
- Passes mock data and criteria to the filter function
- Verifies the returned array contains all 4 properties unchanged

#### Test 2: **Filter properties by type (House only)**
```javascript
it('should filter properties by type (House only)', () => {
  const criteria = { propertyType: 'House', ... };
  const result = filterProperties(mockProperties, criteria);
  expect(result).toHaveLength(2);
  expect(result.every(p => p.type === 'House')).toBe(true);
});
```
**What it validates:** When a user selects "House" from the property type dropdown, only houses should be shown (not apartments).

**How it works:**
- Sets `propertyType: 'House'` in criteria
- Filters the 4 mock properties
- Expects only 2 properties to be returned (prop1 and prop4 are houses)
- Uses `.every()` to verify all returned properties have type "House"

#### Test 3: **Filter properties by price range (£250,000-£500,000)**
```javascript
it('should filter properties by price range (250000-500000)', () => {
  const criteria = { priceRange: '250000-500000', ... };
  const result = filterProperties(mockProperties, criteria);
  expect(result).toHaveLength(2);
  expect(result.every(p => p.price >= 250000 && p.price <= 500000)).toBe(true);
});
```
**What it validates:** When users select a price range, only properties within that range should appear.

**How it works:**
- The filter logic splits the string "250000-500000" by the hyphen
- Converts both parts to numbers: min=250000, max=500000
- Checks if `property.price >= min && property.price <= max`
- Returns 2 properties (prop2: £399,995 and prop3: £285,000)

#### Test 4: **Filter properties by bedrooms (exactly 3)**
```javascript
it('should filter properties by bedrooms (3 bedrooms exactly)', () => {
  const criteria = { bedrooms: '3', ... };
  const result = filterProperties(mockProperties, criteria);
  expect(result[0].bedrooms).toBe(3);
});
```
**What it validates:** When "3" is selected from the bedrooms dropdown, only properties with exactly 3 bedrooms should show.

**How it works:**
- Takes the string '3' and converts it to an integer using `parseInt()`
- Checks if `property.bedrooms === 3`
- Only prop1 has exactly 3 bedrooms, so it returns 1 property

#### Test 5: **Filter properties by postcode area (BR6)**
```javascript
it('should filter properties by postcode area (BR6)', () => {
  const criteria = { postcodeArea: 'BR6', ... };
  const result = filterProperties(mockProperties, criteria);
  expect(result[0].location).toContain('BR6');
});
```
**What it validates:** When users type a postcode (like "BR6"), only properties in that area should be displayed.

**How it works:**
- Converts both the search term and property location to lowercase
- Uses `.includes()` to check if the location contains the search term
- Case-insensitive matching ensures "BR6", "br6", or "Br6" all work

#### Test 6: **Handle case-insensitive postcode search**
```javascript
it('should handle case-insensitive postcode search', () => {
  const criteria = { postcodeArea: 'br5', ... }; // lowercase
  const result = filterProperties(mockProperties, criteria);
  expect(result[0].id).toBe('prop1'); // Should find "BR5"
});
```
**What it validates:** Users can type postcodes in any case (BR5, br5, Br5) and still get results.

**How it works:**
- Both the criteria and property location are converted to lowercase before comparison
- `'Orpington BR5'.toLowerCase().includes('br5'.toLowerCase())` returns true

#### Test 7: **Filter with multiple criteria (House, 3 bedrooms, £500k-£1m)**
```javascript
it('should filter properties with multiple criteria', () => {
  const criteria = { 
    propertyType: 'House', 
    priceRange: '500000-1000000', 
    bedrooms: '3' 
  };
  const result = filterProperties(mockProperties, criteria);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe('prop1');
});
```
**What it validates:** All filters work together - properties must match ALL selected criteria simultaneously.

**How it works:**
- Each filter condition is checked sequentially using `if` statements
- If any condition fails, `return false` immediately (short-circuit)
- Only properties passing ALL tests are included in the result
- prop1 is the only property that is a House, has 3 bedrooms, AND costs £750,000 (within range)

#### Test 8: **Filter properties above £1 million**
```javascript
it('should filter properties above 1 million (1000000+)', () => {
  const criteria = { priceRange: '1000000+', ... };
  const result = filterProperties(mockProperties, criteria);
  expect(result[0].price).toBeGreaterThanOrEqual(1000000);
});
```
**What it validates:** The "Over £1,000,000" option shows only luxury properties.

**How it works:**
- Special case: when priceRange is '1000000+' (string ends with +)
- Logic checks if `property.price < 1000000` then returns false
- Only prop4 (£1,250,000) meets this criteria

#### Test 9: **Filter properties with 5+ bedrooms**
```javascript
it('should filter properties with 5+ bedrooms', () => {
  const criteria = { bedrooms: '5', ... };
  const result = filterProperties(mockProperties, criteria);
  expect(result[0].bedrooms).toBeGreaterThanOrEqual(5);
});
```
**What it validates:** When "5+" is selected, properties with 5 OR MORE bedrooms should appear.

**How it works:**
- Special case: when bedrooms value is '5', it means "5 or more"
- Logic checks if `property.bedrooms < 5` then returns false
- prop4 has exactly 5 bedrooms, so it passes

#### Test 10: **Return empty array when no matches**
```javascript
it('should return empty array when no properties match criteria', () => {
  const criteria = { propertyType: 'Apartment', priceRange: '1000000+' };
  const result = filterProperties(mockProperties, criteria);
  expect(result).toEqual([]);
});
```
**What it validates:** When search criteria don't match any properties, an empty list is shown (no results).

**How it works:**
- Combines filters that contradict: Apartment type + £1m+ price
- No apartments in our data cost over £1 million
- Returns empty array `[]`
- UI would show "No properties found" message

---

### 2. `favorites.test.js` - Favorites Logic Tests (12 tests)

This test suite validates the favorites/wishlist functionality that lets users save properties they're interested in.

#### Test 1: **Return empty array when no favorites exist**
```javascript
it('should return empty array when no favorites exist', () => {
  const favorites = getFavorites();
  expect(favorites).toEqual([]);
});
```
**What it validates:** When a new user visits the site (or after clearing favorites), the favorites list should be empty.

**How it works:**
- Calls `getFavorites()` which reads from `localStorage.getItem('favorites')`
- localStorage is empty initially (or cleared by `beforeEach`)
- Returns empty array `[]` as default

#### Test 2: **Add a property to favorites**
```javascript
it('should add a property to favorites', () => {
  const favorites = addToFavorites('prop1');
  expect(favorites).toContain('prop1');
  expect(localStorage.getItem('favorites')).toBe('["prop1"]');
});
```
**What it validates:** When a user clicks the heart icon, the property ID is saved to localStorage.

**How it works:**
- `addToFavorites('prop1')` retrieves current favorites from localStorage
- Adds 'prop1' to the array if not already present
- Saves updated array back to localStorage as JSON string
- Verifies both the returned array and localStorage contain 'prop1'

#### Test 3: **Not add duplicate property to favorites**
```javascript
it('should not add duplicate property to favorites', () => {
  addToFavorites('prop1');
  const favorites = addToFavorites('prop1'); // Add same property again
  expect(favorites).toHaveLength(1);
});
```
**What it validates:** Clicking the heart twice doesn't create duplicates - each property appears once in favorites.

**How it works:**
- First call adds 'prop1' to favorites
- Second call checks if 'prop1' is already in the array using `.includes()`
- If already present, skips the `.push()` operation
- Array still has length of 1, not 2

#### Test 4: **Add multiple properties to favorites**
```javascript
it('should add multiple properties to favorites', () => {
  addToFavorites('prop1');
  addToFavorites('prop2');
  const favorites = addToFavorites('prop3');
  expect(favorites).toEqual(['prop1', 'prop2', 'prop3']);
});
```
**What it validates:** Users can favorite multiple properties, building a personalized wishlist.

**How it works:**
- Each call reads current favorites from localStorage
- Adds the new property ID to the array
- Saves back to localStorage
- Final array contains all 3 property IDs in order

#### Test 5: **Remove a property from favorites**
```javascript
it('should remove a property from favorites', () => {
  addToFavorites('prop1');
  addToFavorites('prop2');
  addToFavorites('prop3');
  const favorites = removeFromFavorites('prop2');
  expect(favorites).not.toContain('prop2');
});
```
**What it validates:** When users click the heart again (unfavorite), the property is removed from their saved list.

**How it works:**
- Starts with 3 favorites in localStorage
- `removeFromFavorites('prop2')` uses `.filter(id => id !== 'prop2')`
- Creates a new array without 'prop2'
- Saves updated array to localStorage
- Result: ['prop1', 'prop3']

#### Test 6: **Check if property is favorited (true case)**
```javascript
it('should check if property is favorited (true case)', () => {
  addToFavorites('prop1');
  const result = isFavorite('prop1');
  expect(result).toBe(true);
});
```
**What it validates:** The heart icon should appear filled/red when a property is in favorites.

**How it works:**
- `isFavorite('prop1')` gets favorites array from localStorage
- Uses `.includes('prop1')` to check membership
- Returns boolean true/false
- UI uses this to apply the "favorited" CSS class

#### Test 7: **Check if property is favorited (false case)**
```javascript
it('should check if property is favorited (false case)', () => {
  addToFavorites('prop1');
  const result = isFavorite('prop2'); // Different property
  expect(result).toBe(false);
});
```
**What it validates:** The heart icon should appear empty/gray when a property is NOT in favorites.

**How it works:**
- Only 'prop1' is favorited
- Checking 'prop2' with `.includes('prop2')` returns false
- Heart icon renders without the "favorited" class

#### Test 8: **Toggle favorite - add when not favorited**
```javascript
it('should toggle favorite - add when not favorited', () => {
  const favorites = toggleFavorite('prop1');
  expect(favorites).toContain('prop1');
});
```
**What it validates:** First click on heart adds property to favorites.

**How it works:**
- `toggleFavorite()` first checks `isFavorite('prop1')` → returns false
- Since false, calls `addToFavorites('prop1')`
- Property is now in favorites array

#### Test 9: **Toggle favorite - remove when already favorited**
```javascript
it('should toggle favorite - remove when already favorited', () => {
  addToFavorites('prop1');
  const favorites = toggleFavorite('prop1');
  expect(favorites).not.toContain('prop1');
});
```
**What it validates:** Second click on heart removes property from favorites.

**How it works:**
- Start with 'prop1' already favorited
- `toggleFavorite('prop1')` checks `isFavorite('prop1')` → returns true
- Since true, calls `removeFromFavorites('prop1')`
- Property is removed from favorites array

#### Test 10: **Toggle favorite multiple times**
```javascript
it('should toggle favorite multiple times', () => {
  let favorites = toggleFavorite('prop1'); // Add
  expect(favorites).toContain('prop1');
  
  favorites = toggleFavorite('prop1'); // Remove
  expect(favorites).not.toContain('prop1');
  
  favorites = toggleFavorite('prop1'); // Add again
  expect(favorites).toContain('prop1');
});
```
**What it validates:** Users can favorite/unfavorite repeatedly, like a light switch.

**How it works:**
- First toggle: not favorited → add it
- Second toggle: favorited → remove it
- Third toggle: not favorited → add it again
- Each operation correctly flips the state

#### Test 11: **Persist favorites in localStorage**
```javascript
it('should persist favorites in localStorage', () => {
  addToFavorites('prop1');
  addToFavorites('prop2');
  const storedData = localStorage.getItem('favorites');
  expect(JSON.parse(storedData)).toEqual(['prop1', 'prop2']);
});
```
**What it validates:** Favorites survive page refresh because they're stored in browser localStorage.

**How it works:**
- After adding favorites, directly reads from localStorage
- localStorage stores data as JSON string: '["prop1","prop2"]'
- `JSON.parse()` converts it back to array
- Even if user closes browser and reopens, favorites remain

#### Test 12: **Handle removing non-existent property gracefully**
```javascript
it('should handle removing non-existent property gracefully', () => {
  addToFavorites('prop1');
  const favorites = removeFromFavorites('prop99'); // Property doesn't exist
  expect(favorites).toEqual(['prop1']);
});
```
**What it validates:** Attempting to remove a property that isn't favorited doesn't cause errors or corrupt data.

**How it works:**
- `.filter(id => id !== 'prop99')` runs on array ['prop1']
- 'prop1' !== 'prop99' is true, so 'prop1' is kept
- Result is still ['prop1'] - no harm done
- Prevents bugs if user clicks unfavorite rapidly or state gets out of sync

---

## Test Architecture

### Setup Files

**vitest.config.js** - Configures Vitest test runner:
- Uses jsdom environment (simulates browser with DOM and localStorage)
- Enables global test functions (describe, it, expect)
- Runs setup file before each test suite

**src/test/setup.js** - Test setup and cleanup:
- Imports Testing Library and jest-dom matchers
- Clears localStorage after each test (prevents test pollution)
- Cleans up rendered components

### Utility Files

**src/utils/filterProperties.js** - Extracted filter logic:
- Pure function (no side effects)
- Easy to test in isolation
- Reusable across components

**src/utils/favorites.js** - Extracted favorites operations:
- Encapsulates localStorage logic
- Single source of truth for favorites
- Easy to mock in component tests

## Why These Tests Matter

### 1. **Prevent Regression**
If someone changes the filter code, tests immediately catch if properties are incorrectly filtered.

### 2. **Document Behavior**
Tests serve as living documentation showing how filters should work (e.g., "5+" means 5 or more, not exactly 5).

### 3. **Confidence in Refactoring**
You can safely rewrite the filter logic, and tests confirm functionality remains correct.

### 4. **Edge Cases Covered**
Tests verify uncommon scenarios like empty results, duplicate favorites, case-insensitive searches.

### 5. **localStorage Reliability**
Favorites tests ensure data persists correctly and doesn't get corrupted by multiple operations.

## Test Results

```
✓ src/test/filterProperties.test.js (10 tests) 7ms
✓ src/test/favorites.test.js (12 tests) 7ms

Test Files  2 passed (2)
Tests  22 passed (22)
Duration  862ms
```

All 22 tests pass successfully, validating both the property filtering logic and favorites functionality work correctly under various scenarios.
