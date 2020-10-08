
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Image } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';

export default class MyMap extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={styles.mapStyle}>
                <MapView
                    style={styles.mapStyle}
                    ref={map => this._map = map}
                    minZoomLevel={5}
                    initialRegion={{
                      latitude: 48.4,
                      longitude: 0.0333,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}>
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
        height: "107%"
    }
})
