import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

class LoginScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>LoginScreen</Text>
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

export default LoginScreen
