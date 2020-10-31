import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { Card, Title, Paragraph } from 'react-native-paper';

class ListEssence extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        text: this.props.item.subTitle
    }
  }

  __switchViewCard() {
      if(this.state.text == this.props.item.subTitle) {
          this.setState({text: this.props.item.body})
      } else {
          this.setState({text: this.props.item.subTitle})
      }
  }

  render() {
    return (
      <View style={styles.containerView}>
        <TouchableOpacity onPress = {() => this.__switchViewCard() } style={styles.essenceItemView}>
            <Card>
              <Card.Cover source={this.props.item.photo} />
              <Card.Content>
                <Title>{this.props.item.title}</Title>
                <Paragraph>{this.state.text}</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    marginVertical: 5
  },
  essenceItemView: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,

    elevation: 5,
  }
})

export default ListEssence
