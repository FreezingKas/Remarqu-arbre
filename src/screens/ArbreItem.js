import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

class ArbreItem extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>ArbreItem</Text>
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

export default ArbreItem
