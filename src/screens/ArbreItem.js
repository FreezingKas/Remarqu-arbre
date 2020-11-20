import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';

/**
 * Firebase
 */

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

const width = Dimensions.get('window').width

class ArbreItem extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      arbre: undefined,
      isLoading: false,
      data: this.props.navigation.state.params.data
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.setState({
      arbre: this.__getArbreDetailFromData(this.props.navigation.state.params.id),
      isLoading: false
    })
  }

  componentWillUnmount() {
    this.__addArbreInhistorique()
  }

  __addArbreInhistorique() {
    var jour = new Date().getDate();
    var mois = new Date().getMonth() + 1;
    var annee = new Date().getFullYear();
    const date = jour + "/" + mois + "/" + annee
    const idArbre = "AR" + this.props.navigation.state.params.id
    const arbreRef = db.collection('UserData').doc(firebase.auth().currentUser.uid)
    const addArbreId = arbreRef.set({
      [idArbre]: {id : this.state.arbre.id, photo: 'https://file1.science-et-vie.com/var/scienceetvie/storage/images/1/0/0/100118/chaque-arbre-cache-une-foret.jpg', nom: this.state.arbre.name, ville: this.state.arbre.ville, date: date}
    }, {merge: true})

    console.log("Ajout de (AR" + this.props.navigation.state.params.id + ") : { \n id: "+ this.props.navigation.state.params.id + ",\n photo: https://file1.science-et-vie.com/var/scienceetvie/storage/images/1/0/0/100118/chaque-arbre-cache-une-foret.jpg" +",\n nom: " + this.state.arbre.name + ",\n ville: " + this.state.arbre.ville + ",\n date: " + date + "\n} \nà l'historique de" + firebase.auth().currentUser.uid)
  }

  __getArbreDetailFromData(id) {
    for (var i=0; this.state.data[i]; i++) {
      var arbre = this.state.data[i]
      if(arbre.id == id) {
        return this.state.data[i]
      }
    }
  }

  __displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  __displayArbre() {
    if(this.state.arbre != undefined) {
      return(
        <ScrollView style={styles.containerScrollView}>
          <View style={styles.headerView}>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Accueil")} style={styles.button}>
              <Image
                source = {require('../Ressources/Images/goBack.png')}
                style = {styles.goBackImage}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>{this.state.arbre.name} de {this.state.arbre.ville}</Text>
          </View>
          <View style={styles.imageViewContainer}>
            <View style={styles.imageView}>
            <Image
              source= {require('../Ressources/Images/arbre.jpg')}
              style={styles.arbreImage}
            />
            </View>
          </View>
          <Text style={styles.sectionText}>INFORMATIONS</Text>
          <Text style={styles.defaultText}>Lieu : {this.state.arbre.ville}</Text>
          <Text style={styles.defaultText}>Essence : {this.state.arbre.essence}</Text>
          <Text style={styles.defaultText}>Taille : {this.state.arbre.taille}</Text>
          <Text style={styles.defaultText}>Âge : {this.state.arbre.age} ans</Text>
          <Text style={styles.sectionText}>HISTOIRE</Text>
          <Text style={styles.defaultText}>{this.state.arbre.histoire}</Text>
          <Text style={styles.sectionText}>LIEN EXTERNE</Text>
          <TouchableOpacity onPress={() => Linking.openURL(this.state.arbre.site)}>
            <Text style={styles.lienText}>Site externe</Text>
          </TouchableOpacity>
          <Text style={styles.sectionText}>VIDÉO</Text>
          <Text style={styles.defaultText}>{this.state.arbre.video}</Text>
        </ScrollView>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.__displayLoading()}
        {this.__displayArbre()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerScrollView: {
    marginHorizontal: 5
  },
  headerView: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    width: '81%'
  },
  button: {
    top: 0,
    left: 0,
    marginTop: 15,
    marginLeft: 5,
    marginBottom: 15,

    padding: 5,

    height:54,
    width:54,

    borderRadius:27,

    backgroundColor:'#FFF',

    justifyContent:'center',
    alignItems:'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 18.00,

    elevation: 38,
  },
  goBackImage: {
    width: 32,
    height: 32
  },
  imageViewContainer: {
    alignItems: 'center'
  },
  imageView: {
    width: width/1.5,
    height: width/1.5,
    borderRadius: width/2,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 18.00,

    elevation: 38,
  },
  arbreImage: {
    width: width/1.5,
    height: width/1.5,
    borderRadius: width/2,
    borderColor: '#000',
    borderWidth: 3,
    marginBottom: 15
  },
  sectionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginVertical: 10
  },
  defaultText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
    width: '98%'
  },
  lienText: {
    fontSize: 16,
    color: '#606AA5',
    textDecorationLine: 'underline'
  }
});

export default ArbreItem
