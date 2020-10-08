
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput, Image } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import mapStyle from '../helpers/styleMap';

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
                        latitude: 48.289006,
                        longitude: 6.949925,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle={mapStyle}>

                        <Marker key={0} 
                                coordinate={{
                                    latitude: 48.289006,
                                    longitude: 6.949925,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Arbre 0"}
                                description={"Description de L'Arbre 0"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
                        <Marker key={1} 
                                coordinate={{
                                    latitude: 48.288740,
                                    longitude: 6.952875,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Arbre 1"}
                                description={"Description de L'Arbre 1"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
                        <Marker key={2} 
                                coordinate={{
                                    latitude: 48.286844,
                                    longitude: 6.946519,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Arbre 2"}
                                description={"Description de L'Arbre 2"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
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
