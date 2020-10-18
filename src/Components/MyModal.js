import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Title, IconButton, Menu, Divider, Provider } from 'react-native-paper';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';

export default class MyMap extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Modal isVisible={this.props.state} useNativeDriver={true} style={styles.modalContainerView} onBackdropPress={() => this.toggleModal(false)}>
                    <View style={styles.containerView}>
                        <View style={styles.containerView1}>
                            <Title style={styles.titleText}>Bienvenue !</Title>
                            <FormInput
                                labelName='Email'
                                autoCapitalize='none'

                                theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                underlineColor={('green')}
                            />
                            <FormInput
                                labelName='Mot de passe'
                                secureTextEntry={true}
                                theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                underlineColor={('green')}
                            />
                            <FormButton
                                title='Connexion'
                                modeValue='contained'
                                labelStyle={styles.loginButtonLabel}
                                onPress={() => console.log("Connexion")}
                                color={'green'}
                            />
                            <FormButton
                                title='Nouveau ici ?'
                                modeValue='text'
                                uppercase={false}
                                labelStyle={styles.navButtonText}
                                onPress={() => console.log("Inscription")}
                                color={'green'}
                            />
                            <IconButton icon="arrow-down-thick" color={'green'} size={30} onPress={this.props.funcToggle} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}
const styles = StyleSheet.create({
  modalContainerView: {
    backgroundColor: "white",
    marginTop: '40%',
    borderRadius: 10,
    maxHeight: Dimensions.get('window').height / 2
  },
  containerView: { flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerView1: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10,
        marginTop: 15
    },
    loginButtonLabel: {
        fontSize: 22
    },
    navButtonText: {
        fontSize: 16
    }
})
