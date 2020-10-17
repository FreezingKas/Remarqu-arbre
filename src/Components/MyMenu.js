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
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Menu
                            visible={this.props.state}
                            onDismiss={this.props.funcToggleMenuClose}
                            anchor={<TouchableOpacity onPress={this.props.funcToggleMenuOpen} style={styles.button}>
                                <Image style={styles.imageButton} source={require('../Ressources/Images/burger.png')} />
                            </TouchableOpacity>}
                            style={{ marginTop: 35, marginLeft: 5 }}>

                            <Menu.Item icon={() => (
                                <Image
                                    source={require('../Ressources/Images/scan-helper.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                            )}
                                onPress={() => { this.props.nav.navigate("Scan") }} title="Scan" />
                            <Menu.Item icon={() => (
                                <Image
                                    source={require('../Ressources/Images/history.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                            )} onPress={this.props.funcOpenModalize} title="Historique" />
                            
                            <Menu.Item icon={() => (
                                <Image
                                    source={require('../Ressources/Images/moreInfo.png')}
                                    style={{ width: 20, height: 20 }}
                                />
                            )} onPress={() => this.props.nav.navigate("MoreInfo")} title="Plus d'informations" />
                            <Divider />
                            <Menu.Item icon={() => (
                                <Image
                                    source={require('../Ressources/Images/login.png')}
                                    style={{ width: 20, height: 20 }}
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
    imageButton: {
        width: 32,
        height: 32
      },
      button: {
        top: 0,
        left: 0,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
    
    
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
})