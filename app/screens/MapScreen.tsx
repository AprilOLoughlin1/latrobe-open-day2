import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -37.7210,
          longitude: 145.0480,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {/* La Trobe University Locations */}
        <Marker
          coordinate={{ latitude: -37.719161, longitude: 145.048103 }}
          title="La Trobe University Main Entrance"
          description="Main entrance to La Trobe University"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>La Trobe University Main Entrance</Text>
              <Text style={styles.calloutDescription}>Main entrance to La Trobe University</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.721837, longitude: 145.048825 }}
          title="Agora"
          description="Central hub with food and amenities"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Agora</Text>
              <Text style={styles.calloutDescription}>Central hub with food and amenities</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.722434, longitude: 145.048223 }}
          title="Library (Borchardt Library)"
          description="Main Library Building"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Library (Borchardt Library)</Text>
              <Text style={styles.calloutDescription}>Main Library Building</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.726112, longitude: 145.051724 }}
          title="Sports Centre (Sports Park)"
          description="Sports and recreation facilities"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Sports Centre (Sports Park)</Text>
              <Text style={styles.calloutDescription}>Sports and recreation facilities</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.723993, longitude: 145.043601 }}
          title="Glenn College"
          description="Student accommodation"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Glenn College</Text>
              <Text style={styles.calloutDescription}>Student accommodation</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.724365, longitude: 145.045280 }}
          title="Menzies College"
          description="Student accommodation"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Menzies College</Text>
              <Text style={styles.calloutDescription}>Student accommodation</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.721548, longitude: 145.049951 }}
          title="Moat Theatre"
          description="Theatre and performance venue"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Moat Theatre</Text>
              <Text style={styles.calloutDescription}>Theatre and performance venue</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.721408, longitude: 145.050462 }}
          title="Union Hall"
          description="Event and Orientation Hall"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Union Hall</Text>
              <Text style={styles.calloutDescription}>Event and Orientation Hall</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.724825, longitude: 145.056798 }}
          title="La Trobe Wildlife Sanctuary"
          description="Wildlife sanctuary and nature reserve"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>La Trobe Wildlife Sanctuary</Text>
              <Text style={styles.calloutDescription}>Wildlife sanctuary and nature reserve</Text>
            </View>
          </Callout>
        </Marker>

        <Marker
          coordinate={{ latitude: -37.719991, longitude: 145.046688 }}
          title="Kingsbury Drive Bus Interchange"
          description="Main bus interchange"
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Kingsbury Drive Bus Interchange</Text>
              <Text style={styles.calloutDescription}>Main bus interchange</Text>
            </View>
          </Callout>
        </Marker>
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



