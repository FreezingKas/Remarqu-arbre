import React from 'react';
import { StyleSheet, View, Dimensions, setError, setValid, __isValidEmail } from 'react-native';
import Modal from 'react-native-modal';
import { Title, IconButton, Menu, Divider, Provider } from 'react-native-paper';
import FormInput from '../Components/FormInput';
import FormButton from '../Components/FormButton';

import * as firebase from 'firebase';





export default class MyMap extends React.Component {
    constructor(props) {
        super(props)
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
         }
        state = {
            pass: "",
            email: "",
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log("Utilisateur connecté");
            } else {
                console.log("Utilisateur déconnecté")
            }
        });
    }

    /*  Fonction d'envoi des données de création de compte 
        🛑Faire appel à cette fonction et non à __doCreateUser🛑
    */ 

    __doSignUp = () => {
        this.__doCreateUser(this.state.email, this.state.pass)
    }

    __doCreateUser = async (email, password) => {
        try {
            let response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response) {
                console.log(response)
                console.log("Utilisateur Crée")
            }
        } catch (e) {
            console.error(e.message)
        }
    }


    /*
        Fonction d'envoi des données de connexion
        🛑Faire appel à cette fonction et non à __doSignUser🛑
    */ 
    __doSignIn = () => {
        this.__doSignUser(this.state.email, this.state.pass)
    }

    __doSignUser = async (email, password) => {
        try {
            let response = await firebase.auth().signInWithEmailAndPassword(email, password)
            if (response) {
                console.log(response)
            }
        } catch(e) {
            console.error(e.message)
        }
    }

    /*
        Fonction de déconnexion
        🛑Faire appel à cette fonction et non à __doSignOutUser🛑
    */
    __doSignOut = () => {
        this.__doSignOutUser()
    }

    __doSignOutUser = async () => {
        try {
            let response = await firebase.auth().signOut()
        } catch (e) {
            console.erreor(e.message)
        }
    }



    render() {
        return (
            <View>
                <Modal isVisible={this.props.state} useNativeDriver={true} style={styles.modalContainerView} onBackdropPress={this.props.funcToggle}>
                    <View style={styles.containerView}>
                        <View style={styles.containerView1}>
                            <Title style={styles.titleText}>Bienvenue !</Title>
                            <FormInput
                                labelName='Email'
                                autoCapitalize='none'
                                onChangeText={(text) => this.setState({ email: text })}
                                theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                underlineColor={('green')}
                            />
                            <FormInput
                                labelName='Mot de passe'
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({ pass: text })}
                                theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                underlineColor={('green')}
                            />
                            <FormButton
                                title='Connexion'
                                modeValue='contained'
                                labelStyle={styles.loginButtonLabel}
                                onPress={() => this.__doSignIn()}
                                color={'green'}
                            />
                            <FormButton
                                title='Nouveau ici ?'
                                modeValue='text'
                                uppercase={false}
                                labelStyle={styles.navButtonText}
                                onPress={() => this.__doSignUp()}
                                color={'green'}
                            />
                            <FormButton
                                title='Déconnexion Test'
                                modeValue='text'
                                uppercase={false}
                                labelStyle={styles.navButtonText}
                                onPress={() => this.__doSignOut()}
                                color={'green'}
                            />

                            <FormButton
                                title='User console'
                                modeValue='text'
                                uppercase={false}
                                labelStyle={styles.navButtonText}
                                onPress={() => console.log(firebase.auth().currentUser)}
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
        marginTop: '36%',
        borderRadius: 10,
        maxHeight: Dimensions.get('window').height / 2 + 150
    },
    containerView: {
        flex: 1,
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
