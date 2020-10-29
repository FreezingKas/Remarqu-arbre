
import React from 'react';
import { StyleSheet, View, YellowBox, ActivityIndicator } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../helpers/styleMap';

// firebase SDK module
import * as firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../helpers/firebase'


// on check si l'instance de firebase a déja été crée si non on la crée
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// on instancie firestore dans une variable c'est obligatoire (jsp pas pourquoi)
const db = firebase.firestore();

// faut pas faire ca normalement
YellowBox.ignoreWarnings(['Setting a timer']);


// array contenant toutes les données de chaque arbre
let data = [];

export default class MyMap extends React.Component {
    constructor(props) {
        super(props)
        this.getData()    
    }

    // état si les donnés sont chargés 
    state = {
        isLoaded: false
    }

    async getData() {
        // récupération des identifiants d'accès aux données de la collection ARBRE dans firestore
        const snapshot = db.collection("ARBRE");
        // récupération des données
        const arbre = await snapshot.get();
        // classique boucle pour ajouter chaque arbre à l'array 
        arbre.forEach(doc => {
            data.push(doc.data());
          });
        
        // changement d'état afin de mettre fin au chargement
        this.setState({isLoaded: true})     
    }

    render() {
        // screen quand les données des arbres ne sont pas encore récupérés
        if (!this.state.isLoaded) {
            return (
                <View style={styles.mapStyle}>
                    <ActivityIndicator size="large" color="#00ff00" style={styles.activityInd}/>
                </View>
            )
        // écran classique avec la map
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
                                {
                                    data.map((marker) => {
                                        return(
                                            <Marker
                                                coordinate={{
                                                    latitude: marker.latitude,
                                                    longitude: marker.longitude,
                                                    latitudeDelta: 0.0922,
                                                    longitudeDelta: 0.0421
                                                }}
                                                title={marker.name + " - " + marker.ville}
                                                key={marker.id}
                                            />
                                        )
                                    })
                                }
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
