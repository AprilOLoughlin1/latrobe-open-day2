import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Location {
  id: number;
  name: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

const locations: Location[] = [
  {
    id: 1,
    name: 'La Trobe University Main Entrance',
    description: 'Main entrance to La Trobe University',
    coordinate: { latitude: -37.719161, longitude: 145.048103 },
  },
  {
    id: 2,
    name: 'Agora',
    description: 'Central hub with food and amenities',
    coordinate: { latitude: -37.721837, longitude: 145.048825 },
  },
  {
    id: 3,
    name: 'Library (Borchardt Library)',
    description: 'Main Library Building',
    coordinate: { latitude: -37.722434, longitude: 145.048223 },
  },
  {
    id: 4,
    name: 'Sports Centre (Sports Park)',
    description: 'Sports and recreation facilities',
    coordinate: { latitude: -37.726112, longitude: 145.051724 },
  },
  {
    id: 5,
    name: 'Glenn College',
    description: 'Student accommodation',
    coordinate: { latitude: -37.723993, longitude: 145.043601 },
  },
  {
    id: 6,
    name: 'Menzies College',
    description: 'Student accommodation',
    coordinate: { latitude: -37.724365, longitude: 145.045280 },
  },
  {
    id: 7,
    name: 'Moat Theatre',
    description: 'Theatre and performance venue',
    coordinate: { latitude: -37.721548, longitude: 145.049951 },
  },
  {
    id: 8,
    name: 'Union Hall',
    description: 'Event and Orientation Hall',
    coordinate: { latitude: -37.721408, longitude: 145.050462 },
  },
  {
    id: 9,
    name: 'La Trobe Wildlife Sanctuary',
    description: 'Wildlife sanctuary and nature reserve',
    coordinate: { latitude: -37.724825, longitude: 145.056798 },
  },
  {
    id: 10,
    name: 'Kingsbury Drive Bus Interchange',
    description: 'Main bus interchange',
    coordinate: { latitude: -37.719991, longitude: 145.046688 },
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showCallout, setShowCallout] = useState(false);
  const mapRef = useRef<MapView>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      setSelectedLocation(null);
      setShowCallout(false);
      // Don't hide the map when clearing search
      return;
    }

    setIsSearching(true);
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.description.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name);
    setSearchResults([]);
    setIsSearching(false);
    setShowMap(true);
    setShowCallout(true);

    // Focus map on selected location
    setTimeout(() => {
      mapRef.current?.animateToRegion({
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }, 100);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    setSelectedLocation(null);
    setShowCallout(false);
    // Keep the map visible but reset to default view
    if (showMap) {
      mapRef.current?.animateToRegion({
        latitude: -37.7210,
        longitude: 145.0480,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
    }
  };

  const renderLocationItem = ({ item }: { item: Location }) => (
    <TouchableOpacity
      style={styles.locationItem}
      onPress={() => handleLocationSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.locationIcon}>
        <Text style={styles.locationIconText}>📍</Text>
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationName}>{item.name}</Text>
        <Text style={styles.locationDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  // Determine what to render
  const renderContent = () => {
    // If searching and we have results, show search results
    if (isSearching && searchResults.length > 0) {
      return (
        <FlatList
          data={searchResults}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.resultsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.resultsContainer}
        />
      );
    }

    // If searching but no results, show no results message
    if (isSearching && searchResults.length === 0) {
      return (
        <View style={styles.noResults}>
          <Text style={styles.noResultsIcon}></Text>
          <Text style={styles.noResultsText}>No locations found</Text>
          <Text style={styles.noResultsSubtext}>
            Try searching for "Library", "Agora", "Sports", or "College"
          </Text>
        </View>
      );
    }

    // If map should be shown, show map
    if (showMap) {
      return (
        <View style={styles.mapContainer}>
          {selectedLocation && (
            <View style={styles.selectedLocationInfo}>
              <View style={styles.selectedLocationHeader}>
                <View style={styles.locationIcon}>
                  <Text style={styles.locationIconText}>📍</Text>
                </View>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{selectedLocation.name}</Text>
                  <Text style={styles.locationDescription}>{selectedLocation.description}</Text>
                </View>
              </View>
            </View>
          )}

          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: -37.7210,
              longitude: 145.0480,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {/* All Markers */}
            {locations.map((location) => (
              <Marker
                key={location.id}
                coordinate={location.coordinate}
                title={location.name}
                description={location.description}
                pinColor={selectedLocation && location.id === selectedLocation.id ? '#4CAF50' : '#FF9800'}
              >
                <Callout
                  tooltip={false}
                  onPress={() => {
                    // Handle callout press if needed
                  }}
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutTitle}>{location.name}</Text>
                    <Text style={styles.calloutDescription}>{location.description}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      );
    }

    // Default: show initial state
    return (
      <View style={styles.initialState}>
        <Text style={styles.searchIconLarge}></Text>
        <Text style={styles.searchMessage}>Search for locations</Text>
        <Text style={styles.searchSubmessage}>
          Find La Trobe University locations like Library, Agora, Sports Centre, and more
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}></Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearSearch}
            >
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#666',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 4,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  initialState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchIconLarge: {
    fontSize: 64,
    marginBottom: 16,
  },
  searchMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  searchSubmessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  resultsList: {
    flex: 1,
  },
  resultsContainer: {
    padding: 16,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationIconText: {
    fontSize: 18,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  mapContainer: {
    flex: 1,
  },
  selectedLocationInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  selectedLocationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  calloutContainer: {
    width: 200,
    padding: 8,
  },
  calloutTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
