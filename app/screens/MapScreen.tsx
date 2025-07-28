import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.7210,
          longitude: 145.0470,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Updated Markers */}
        <Marker
          coordinate={{ latitude: -37.7207, longitude: 145.0465 }}
          title="CSIT Building"
          description="Computer Science and Information Technology"
        />
        <Marker
          coordinate={{ latitude: -37.7223, longitude: 145.0489 }}
          title="Library"
          description="Main Library Building"
        />
        <Marker
          coordinate={{ latitude: -37.7201, longitude: 145.0452 }}
          title="Union Hall"
          description="Event and Orientation Hall"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

   

