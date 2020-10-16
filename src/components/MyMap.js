
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
                        latitude: 48.288786,
                        longitude: 6.950237,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle={mapStyle}>

                        <Marker key={0}
                                coordinate={{
                                    latitude: 49.128333,
                                    longitude: 3.466944,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Chêne - Beuvardes"}
                                description={"Description de L'Arbre 0"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
                        <Marker key={1}
                                coordinate={{
                                    latitude: 46.124722,
                                    longitude: 3.416389,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Arbres du parc Napoléon III - Vichy"}
                                description={"Description de L'Arbre 1"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
                        <Marker key={2}
                                coordinate={{
                                    latitude: 43.686389,
                                    longitude: 7.22,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Caroubiers - Nice"}
                                description={"Description de L'Arbre 2"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
                        <Marker key={3}
                                coordinate={{
                                    latitude: 44.546944,
                                    longitude: 0.434444,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                title={"Chêne - Tombeboeuf"}
                                description={"Description de L'Arbre 3"}
                                image={require('../Ressources/Images/ArbreIcon.png')}/>
                      <Marker key={4}
                              coordinate={{
                                  latitude: 48.202778,
                                  longitude: 7.278889,
                                  latitudeDelta: 0.0922,
                                  longitudeDelta: 0.0421,
                              }}
                              title={"Douglas géant - Ribeauvillé"}
                              description={"Description de L'Arbre 4"}
                              image={require('../Ressources/Images/ArbreIcon.png')}/>
                    <Marker key={5}
                            coordinate={{
                                latitude: 48.288786,
                                longitude: 6.950237,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            title={"Tilleul - St Dié-des-Vosges"}
                            description={"Description de L'Arbre 5"}
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
