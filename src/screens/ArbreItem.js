import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';

class ArbreItem extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flex:1, backgroundColor:'#0A0', justifyContent: 'center'}}>
          <Text style={styles.title_text}>NOM DE L'ARBRE</Text>
          <TouchableOpacity
            source = {require('../Ressources/Images/goBack.png')}
            style = {styles.goBack_image}
          />
        </View>
        <Image
          source= {require('../Ressources/Images/arbre.jpg')}
          style={styles.arbre_image}
        />
        <Text style={styles.section_text}>INFORMATIONS</Text>
        <Text style={styles.default_text}>Essence : ...</Text>
        <Text style={styles.default_text}>Taille : ...</Text>
        <Text style={styles.default_text}>Âge : ...</Text>
        <Text style={styles.section_text}>HISTOIRE</Text>
        <Text style={styles.default_text}>Histoire de l'arbre...</Text>
        <Text style={styles.section_text}>LIEN EXTERNE</Text>
        <Text style={styles.default_text}>Lien vers un site externe...</Text>
        <Text style={styles.section_text}>VIDÉO</Text>
        <Text style={styles.default_text}>Lien vers une vidéo externe...</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 5
  },
  title_text: {
    position: 'absolute',
    right: 0,
    left: 0,
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold'
  },
  goBack_image: {
    position: 'absolute',
    right: 0,
    width: 32,
    height: 32
  },
  arbre_image: {
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').width/1.5,
    borderRadius: 10,
    borderColor: '#000',
    alignItems: 'center'
  },
  section_text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  default_text: {
    fontSize: 16,
    color: '#444'
  }
});

export default ArbreItem
