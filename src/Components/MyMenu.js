import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Menu, Divider } from 'react-native-paper';

export default class MyMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
              <View style={styles.containerView}>
                  <Menu
                      visible={this.props.state}
                      onDismiss={this.props.funcToggleMenu}
                      anchor={<TouchableOpacity onPress={this.props.funcToggleMenu} style={styles.button}>
                          <Image style={styles.imageButton} source={require('../Ressources/Images/burger.png')} />
                      </TouchableOpacity>}
                      style={styles.menuContainerView}>

                      <Menu.Item icon={() => (
                          <Image
                              source={require('../Ressources/Images/scan-helper.png')}
                              style={styles.iconImage}
                          />
                      )}
                          onPress={() => { this.props.nav.navigate("Scan") }} title="Scan" />
                      <Menu.Item icon={() => (
                          <Image
                              source={require('../Ressources/Images/history.png')}
                              style={styles.iconImage}
                          />
                      )} onPress={this.props.funcOpenModalize} title="Historique" />

                      <Menu.Item icon={() => (
                          <Image
                              source={require('../Ressources/Images/moreInfo.png')}
                              style={styles.iconImage}
                          />
                      )} onPress={() => this.props.nav.navigate("MoreInfo")} title="Plus d'informations" />
                      <Divider />
                      <Menu.Item icon={() => (
                          <Image
                              source={require('../Ressources/Images/login.png')}
                              style={styles.iconImage}
                          />
                      )}
                          onPress={this.props.funcToggleModal} title="Connexion" />
                  </Menu>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  containerView: {
      flexDirection: 'row',
  },
  menuContainerView: {
    marginTop: 35,
    marginLeft: 5
  },
  imageButton: {
      width: 32,
      height: 32
  },
  button: {
    top: 0,
    left: 0,
    marginVertical: 15,
    marginLeft: 15,

    padding: 5,

    height: 54,
    width: 54,

    borderRadius: 27,

    backgroundColor: '#FFF',

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.98,
    shadowRadius: 18.00,

    elevation: 38,
  },
  iconImage: {
    width: 20,
    height: 20
  }
})
