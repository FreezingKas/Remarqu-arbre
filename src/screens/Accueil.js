import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet'

class Accueil extends React.Component {




  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Accueil</Text>
        <Button
          //onPress={() => this.props.navigation.navigate("Scan")}
          onPress={() => this.bs.current.snapTo(0)}
          title="Historique"
      />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },


  
  
})

export default Accueil
