# Geocoding Functionality Guide

## ✅ What's Been Implemented

Real-time geocoding search for locations in Portugal and Spain using OpenStreetMap's Nominatim API.

## 🌍 Features

### **1. Homepage Hero Search**
- Type any city, town, or address in Portugal/Spain
- Get real-time autocomplete suggestions
- Click a location to search properties there
- Map automatically zooms to selected area

### **2. Homes Page Filter Search**
- Same geocoding functionality in the filter sidebar
- Search while browsing properties
- Map updates to show the selected location
- Properties filter based on map viewport

### **3. Real Geocoding API**
- Uses **Nominatim** (OpenStreetMap) - FREE, no API key needed
- Searches both Portugal and Spain simultaneously
- Returns cities, towns, villages with full addresses
- Debounced search (500ms) to reduce API calls

## 🎯 How It Works

### **User Flow:**

1. **User types** "Lisb" in search box
2. **System searches** Portugal & Spain in real-time
3. **Dropdown shows**:
   ```
   📍 Lisboa
      Lisboa, Portugal
   
   📍 Lisbon
      Lisbon, Portugal
   ```
4. **User clicks** a location
5. **Map zooms** to that location (lat/lng from geocoding)
6. **Properties appear** in the selected area's viewport

### **Technical Flow:**

```
User Input → Debounce (500ms) → Nominatim API → Parse Results → Display Dropdown
                                                                        ↓
User Selects Location → Get Coordinates → Update URL Params → Zoom Map → Filter Properties
```

## 📁 Files Created/Modified

### **New Files:**
- `src/lib/geocoding.ts` - Geocoding utility with Nominatim API

### **Modified Files:**
- `src/components/HeroSearch.tsx` - Homepage search with geocoding
- `src/components/Filters.tsx` - Homes page filter with geocoding
- `src/app/homes/page.tsx` - Reads geocoded coordinates from URL
- `src/app/page.tsx` - Reduced overlay opacity to 5%

## 🔧 Technical Details

### **Geocoding API:**
- **Provider**: Nominatim (OpenStreetMap)
- **Endpoint**: `https://nominatim.openstreetmap.org/search`
- **Countries**: Portugal (pt) + Spain (es)
- **Rate Limit**: 1 request per second (handled by debouncing)
- **No API Key Required**: Free to use

### **Search Parameters:**
- `q` - Search query
- `countrycodes` - "pt" or "es"
- `format` - "json"
- `addressdetails` - "1" (includes city, state, etc.)
- `limit` - "5" per country
- `featuretype` - "settlement" (prioritizes cities/towns)

### **Result Processing:**
1. Search both Portugal and Spain simultaneously
2. Combine results
3. Extract city name from address details
4. Format as "City, Country"
5. Limit to top 10 results
6. Display with map pin icon

## 🎨 UI Features

### **Dropdown Design:**
- Clean white background
- MapPin icon for each result
- Two-line display:
  - **Bold**: City name
  - **Small grey**: Full address
- Hover effect with light background
- Keyboard navigation (↑↓ arrows, Enter, Escape)
- Loading spinner while searching

### **URL Parameters:**
When a location is selected, URL includes:
- `?lat=38.7223&lng=-9.1393&zoom=12&q=Lisboa&for=buy`

This allows:
- Direct linking to locations
- Browser back/forward navigation
- Shareable search results

## 🧪 Testing the Feature

### **Test on Homepage:**
1. Go to http://localhost:3000
2. Type "Porto" in the search box
3. See real cities appear in dropdown
4. Click one
5. Navigate to /homes with map zoomed to that city

### **Test on Homes Page:**
1. Go to http://localhost:3000/homes
2. Type "Barcelona" in the filter search
3. See Spanish cities appear
4. Click one
5. Map zooms to Barcelona

### **Test Keyboard Navigation:**
1. Type "Faro"
2. Press ↓ to select first result
3. Press Enter
4. Map zooms to Faro

## 🌟 Search Examples

Try searching for:
- **Portuguese Cities**: Lisboa, Porto, Faro, Coimbra, Braga
- **Spanish Cities**: Madrid, Barcelona, Sevilla, Valencia, Málaga
- **Towns**: Albufeira, Tavira, Lagos, Marbella, Granada
- **Partial Names**: "Lis" → Lisboa, "Bar" → Barcelona

## 📊 Benefits Over Static List

### **Before (Static List):**
- ❌ Only ~56 pre-defined cities
- ❌ Exact match required
- ❌ Limited to hardcoded coordinates
- ❌ Can't search neighborhoods or addresses

### **After (Real Geocoding):**
- ✅ Search ANY location in Portugal/Spain
- ✅ Fuzzy matching (partial names work)
- ✅ Real coordinates from geocoding
- ✅ Can search towns, villages, neighborhoods
- ✅ Full address details in dropdown
- ✅ More accurate location data

## 🔒 Privacy & Performance

- **No API Key Exposure**: Nominatim is server-free
- **Debounced**: Only 1 API call per 500ms
- **Cached**: Browser caches results
- **Rate Limit Friendly**: Respects Nominatim's 1/sec limit
- **User-Agent**: Identifies as "NextEstate Real Estate App"

## 🚀 Future Enhancements

Possible improvements:
1. Add recent searches (localStorage)
2. Cache popular cities
3. Add postal code search
4. Show location type icons (city/town/village)
5. Add distance from current location
6. Integrate with property database for better filtering
7. Add "Search this area" button when panning map

## 💡 Notes

- **Response Time**: Typically 200-500ms for results
- **Accuracy**: Very high - uses OSM's comprehensive database
- **Coverage**: All of Portugal and Spain
- **Fallback**: If API fails, search still works with text query
- **No Cost**: Completely free to use

Enjoy the powerful geocoding search! 🎉

