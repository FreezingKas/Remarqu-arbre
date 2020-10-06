import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

class ArbreItem extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Accueil")}>
              <Image
                source = {require('../Ressources/Images/goBack.png')}
                style = {styles.goBack_image}
              />
            </TouchableOpacity>
            <Text style={styles.title_text}>NOM DE L'ARBRE</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image
              source= {require('../Ressources/Images/arbre.jpg')}
              style={styles.arbre_image}
            />
          </View>
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
        </ScrollView>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20
  },
  goBack_image: {
    width: 32,
    height: 32
  },
  arbre_image: {
    width: Dimensions.get('window').width/1.5,
    height: Dimensions.get('window').width/1.5,
    borderRadius: Dimensions.get('window').width/2,
    borderColor: '#000',
    borderWidth: 3,
    marginBottom: 15
  },
  section_text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  default_text: {
    fontSize: 16,
    color: '#444'
  }
});

export default ArbreItem
