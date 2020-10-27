
import React from 'react';
import { StyleSheet, Text, View, Image, YellowBox, ActivityIndicator } from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import mapStyle from '../helpers/styleMap';

// firebase SDK module
import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../helpers/firebase'


// faut pas faire ca 
YellowBox.ignoreWarnings(['Setting a timer']);
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

let data = [];

export default class MyMap extends React.Component {
    constructor(props) {
        super(props)
        this.getData()    
    }

    state = {
        isLoaded: false
    }

    async getData() {
        const snapshot = db.collection("ARBRE");
        const arbre = await snapshot.get();
        arbre.forEach(doc => {
            //console.log(doc.id, '=>', doc.data());
            data.push(doc.data());
          });
        console.log(data)
        this.setState({isLoaded: true})

        
    }

    

    render() {
        if (!this.state.isLoaded) {
            return (
                <View style={styles.mapStyle}>
                    <ActivityIndicator size="large" color="#00ff00" style={styles.activityInd}/>
                </View>
                
            )
        } else if(this.state.isLoaded) {
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
                            {/* <Marker key={0}
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
                                image={require('../Ressources/Images/ArbreIcon.png')}/> */}
                                {
                                    data.map((marker) => {
                                        <Marker key={marker.id}
                                                coordinate={{
                                                    latitude: marker.latitude,
                                                    longitude: marker.longitude,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421,
                                                }}
                                                title={marker.name +  " - " + marker.ville}
                                        />
    
                                    })
                                }
                                {/* <Marker key={0}
                                        coordinate={{
                                            latitude: data[0].latitude,
                                            longitude: data[0].longitude,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        title={data[0].name +  " - " + data[0].ville}
                                        /> */}
                    </MapView>
                </View>
            )
        }

        
    }
}

const styles = StyleSheet.create({
    mapStyle: {
        ...StyleSheet.absoluteFillObject,
        height: "107%",
        alignItems: 'center',
        justifyContent: 'center'
    },
})
