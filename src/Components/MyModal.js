import React from 'react';
import { StyleSheet, View, Dimensions, setError, setValid, __isValidEmail, ToastAndroid, Alert } from 'react-native';
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
        this.state = {
            pass: "",
            email: "",
            userData: undefined,
            isConnected: false,
            newUser: false
        }
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log("Utilisateur connecté");
                this.setState({
                    isConnected: true, 
                    userData: firebase.auth().currentUser
                })
            } else {
                console.log("Utilisateur déconnecté")
                this.setState({
                    isConnected: false, 
                    userData: undefined
                })
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
                this.setState({
                    pass: "",
                    email: "",
                    userData: response.user,
                    newUser: false
                })
                ToastAndroid.show("Inscription effectué", ToastAndroid.SHORT);
            }
        } catch (e) {
            if(e.message.search("email") != -1) {
                Alert.alert(
                    "Erreur",
                    "L'adresse e-mail est incorrect ou déjà utilisé.",
                    [{
                        text: "Ok"
                    }],
                    { cancelable: false }
                )
            }
            else if(e.message.search("password") != -1) {
                Alert.alert(
                    "Erreur",
                    "Le mot de passe est incorrect.\n\nRappel : 6 caractères minimum.",
                    [{
                        text: "Ok"
                    }],
                    { cancelable: false }
                )
            }
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
                this.setState({
                    pass: "",
                    email: "",
                    userData: response.user
                })
                ToastAndroid.show("Connexion établie", ToastAndroid.SHORT);
            }
        } catch(e) {
            if(e.message.search("email") != -1) {
                Alert.alert(
                    "Erreur",
                    "L'adresse e-mail est incorrect.",
                    [{
                        text: "Ok"
                    }],
                    { cancelable: false }
                )
            }
            else if(e.message.search("password") != -1) {
                Alert.alert(
                    "Erreur",
                    "Le mot de passe est incorrect.",
                    [{
                        text: "Ok"
                    }],
                    { cancelable: false }
                )
            }
            else if(e.message.search("corresponding") != -1) {
                Alert.alert(
                    "Erreur",
                    "Les données rentrées ne correspondent à aucun compte enregistré.",
                    [{
                        text: "Ok"
                    }],
                    { cancelable: false }
                )
            }
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
            this.setState({
                userData: undefined
            })
            ToastAndroid.show("Déconnexion...", ToastAndroid.SHORT);
        } catch (e) {
            Alert.alert(
                "Erreur",
                e.message,
                [{
                    text: "Ok"
                }],
                { cancelable: false }
            )
        }
    }

    render() {
        if(!this.state.isConnected && !this.state.newUser) {
            return(
                <View>
                    <Modal isVisible={this.props.state} useNativeDriver={true} style={styles.modalContainerView} onBackdropPress={this.props.funcToggle}>
                        <View style={styles.containerView}>
                            <View style={styles.containerView1}>
                                <Title style={styles.titleText}>Connexion</Title>
                                <FormInput
                                    labelName='Email'
                                    autoCorrect={false} 
                                    autoCapitalize='none'
                                    onChangeText={(text) => this.setState({ email: text })}
                                    theme={{ colors: { primary: 'green', underlineColor: 'green', } }}
                                    underlineColor={('green')}
                                />
                                <FormInput
                                    labelName='Mot de passe'
                                    secureTextEntry={true}
                                    autoCorrect={false} 
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
                                    onPress={() => this.setState({ newUser: true })}
                                    color={'green'}
                                />
                                <IconButton icon="arrow-down-thick" color={'green'} size={30} onPress={this.props.funcToggle} />
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        } 
        else if (!this.state.isConnected && this.state.newUser) {
            return (
                <View>
                    <Modal isVisible={this.props.state} useNativeDriver={true} style={styles.modalContainerView} onBackdropPress={this.props.funcToggle}>
                        <View style={styles.containerView}>
                            <View style={styles.containerView1}>
                                <Title style={styles.titleText}>Inscription</Title>
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
                                    title='Inscription'
                                    modeValue='contained'
                                    labelStyle={styles.loginButtonLabel}
                                    onPress={() => this.__doSignUp()}
                                    color={'green'}
                                />
                                <FormButton
                                    title='Annuler'
                                    modeValue='text'
                                    uppercase={false}
                                    labelStyle={styles.navButtonText}
                                    onPress={() => this.setState({ newUser: false })}
                                    color={'green'}
                                />
                                <IconButton icon="arrow-down-thick" color={'green'} size={30} onPress={this.props.funcToggle} />
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
        else {
            return (
                <View>
                    <Modal isVisible={this.props.state} useNativeDriver={true} style={styles.modalContainerView} onBackdropPress={this.props.funcToggle}>
                        <View style={styles.containerView}>
                            <View style={styles.containerView1}>
                                <Title style={styles.titleText}>Bienvenue {this.state.userData.email.split("@")[0]} !</Title>
                                <FormButton
                                    title='Déconnexion'
                                    modeValue='contained'
                                    labelStyle={styles.loginButtonLabel}
                                    onPress={() => this.__doSignOut()}
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
        marginTop: 15,
        textAlign: 'center'
    },
    loginButtonLabel: {
        fontSize: 20
    },
    navButtonText: {
        fontSize: 16
    }
})
