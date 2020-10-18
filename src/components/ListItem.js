import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.containerView}>
        <TouchableOpacity style={styles.arbreItemView} onPress={() => this.props.nav.navigate("ArbreItem", {id : this.props.item.id})}>
          <Image
            style={styles.image}
            source={this.props.item.photo}
          />
          <View style={styles.arbreItemText}>
            <Text style={styles.nomArbreItemText}>{this.props.item.nom} - {this.props.item.ville}</Text>
            <Text>{this.props.item.date}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.blackLineContainerView}>
          <View
            style={styles.blackLineView}
          ></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    marginVertical: 5
  },
  arbreItemView: {
    flexDirection: 'row'
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'black'
  },
  arbreItemText: {
    justifyContent: 'center',
    marginHorizontal: 5,
    width: '80%'
  },
  nomArbreItemText: {
    fontSize: 20
  },
  blackLineContainerView: {
    alignItems: 'center'
  },
  blackLineView: {
    backgroundColor: 'black',
    width: 60,
    height: 2,
    marginTop: 5,
    marginBottom: 5,
  }
})

export default ListItem
