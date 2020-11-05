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

  /*
    Switch le contenu text entre le contenu du subTitle, et le body de la card en question (grâce à son id)
  */
  __switchParagraphText() {
    // Si le contenu de text et égale au contenu du subTitle, ça change le contenu de text par le contenu du body
    if(this.state.text == this.props.item.subTitle) {
        this.setState({text: this.props.item.body})
    // Sinon enversement
    } else {
        this.setState({text: this.props.item.subTitle})
      }
  }

  render() {
    //Affiche une card avec le contenu du title, la source de la photo, et le contenu du subTitle (ou du body) de l'arbre en question
    return (
      <View style={styles.containerView}>
        {/* Appelle la fonction switchParagraphText dès que la card est pressé par l'utilisateur */}
        <TouchableOpacity onPress = {() => this.__switchParagraphText() } style={styles.essenceItemView}>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.95,
    shadowRadius: 50.00,

    elevation: 38,
  }
})

export default ListEssence
