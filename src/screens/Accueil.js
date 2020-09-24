import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

class Accueil extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Accueil</Text>
        <Button
          onPress={() => this.props.navigation.navigate("Scan")}
          title="Scan"
      />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Accueil
