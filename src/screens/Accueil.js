import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TextInput } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet'

class Accueil extends React.Component {


  renderInner = () => (
    <View style={styles.panel}>
      <TextInput
        style={styles.search}
        onFocus={() => {
          this.bs.current.snapTo(1)
        }}
        placeholder="search"
      />
      <Text style={styles.panelTitle}>San Francisco Airport</Text>
      <Text style={styles.panelSubtitle}>
        International Airport - 40 miles away
      </Text>
    </View>
  
  )

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  )

  bs = React.createRef()

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Accueil</Text>
        <Button
          //onPress={() => this.props.navigation.navigate("Scan")}
          onPress={() => this.bs.current.snapTo(0)}
          title="Scan"
      />
        <BottomSheet
          ref={this.bs}
          snapPoints={[500, 250, 0]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={2}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  search: {
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },

  
  
})

export default Accueil
