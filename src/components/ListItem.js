import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.itemArbre}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.nav.navigate("ArbreItem", {id : this.props.item.id})}>
          <Image
            style={styles.image}
            source={this.props.item.photo}
          />
          <View style={styles.textArbreItem}>
            <Text style={styles.nomArbreItem}>{this.props.item.nom} - {this.props.item.ville}</Text>
            <Text>{this.props.item.date}</Text>
          </View>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'black',
              width: 60,
              height: 2,
              marginTop: 5,
              marginBottom: 5,
            }}
          ></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  itemArbre: {
    marginTop: 5,
    marginBottom: 5,
  },
  flatlist: {
    marginLeft: 10,
    marginRight: 10
  },
  textArbreItem: {
    justifyContent: 'center',
    marginLeft: 5
  },
  nomArbreItem: {
    fontSize: 20
  }
})

export default ListItem
