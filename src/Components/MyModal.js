import React from 'react';
import { StyleSheet, View, Dimensions, ToastAndroid, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Title, IconButton } from 'react-native-paper';
import DialogInput from 'react-native-dialog-input';

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
            confirmPass: "",
            email: "",
            userData: undefined,
            isConnected: false,
            newUser: false,
            isDialogVisible: false
        }

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                if(!user.emailVerified) {
                    Alert.alert(
                        "Confirmation d'e-mail",
                        "Confirmer votre adresse e-mail en cliquant sur le lien qui vous a été envoyé à celle indiquée.",
                        [{
                            text: "Ok"
                        },
                        {
                            text: "Renvoyer l'e-mail",
                            onPress: () => user.sendEmailVerification(),
                        }],
                        { cancelable: false }
                    )

                    firebase.auth().signOut();
                }
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
        if(this.state.pass == this.state.confirmPass) {
            this.__doCreateUser(this.state.email, this.state.pass)
        } else {
            Alert.alert(
                "Erreur",
                "Vos mots de passe sont différents.",
                [{
                    text: "Ok"
                }],
                { cancelable: false }
            )
        }
        
    }

    __doCreateUser = async (email, password) => {
        try {
            let response = await firebase.auth().createUserWithEmailAndPassword(email, password)
            if (response) {
                console.log(response)
                console.log("Utilisateur Crée")

                firebase.auth().onAuthStateChanged(function(user) { user.sendEmailVerification(); })

                Alert.alert(
                    "Confirmation d'e-mail",
                    "Un e-mail de confirmation vous a été envoyé à l'addresse e-mail indiqué.",
                    [{
                        text: "Ok"
                    }],
                    { cancelable: false }
                )

                this.setState({
                    pass: "",
                    confirmPass: "",
                    email: "",
                    userData: response.user,
                    newUser: false
                })
                ToastAndroid.showWithGravity("Inscription effectué", ToastAndroid.BOTTOM, ToastAndroid.SHORT);
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
                console.log("Utilisateur connecté")
                this.setState({
                    pass: "",
                    email: "",
                    userData: response.user
                }) 

                ToastAndroid.showWithGravity("Connexion établie", ToastAndroid.BOTTOM, ToastAndroid.SHORT); 
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
            console.log("Utilisateur déconnecté")
            this.setState({
                userData: undefined
            })
            ToastAndroid.showWithGravity("Déconnexion...", ToastAndroid.BOTTOM,ToastAndroid.SHORT);
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

    __sendEmailForChangePassUser(email) {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            Alert.alert(
                "Rénitialisation de mot de passe",
                "Un e-mail pour changer votre mot de passe a été envoyé à l'adresse e-mail de connexion.",
                [{
                    text: "Ok",
                    onPress: () => this.setState({isDialogVisible: false}),
                }],
                { cancelable: false }
            )
        })
    }

    render() {
        // Si l'utilisateur à oublié son mot de passe (DialogInput rénitialisation mot de passe)
        if(this.state.isDialogVisible) {
            return(
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                    title={"Rénitialisation de mot de passe"}
                    message={"Entrez une adresse e-mail où sera envoyé l'e-mail de rénitialisation de mot de passe."}
                    hintInput ={"e-mail"}
                    submitText={"Ok"}
                    cancelText={"Fermer"}
                    submitInput={ (inputText) => {this.__sendEmailForChangePassUser(inputText)} }
                    closeDialog={ () => this.setState({isDialogVisible: false})}>
                </DialogInput>
            )
        }
        // Si un utilisateur n'est pas connecté et que ce n'est pas un nouveau utilisateur (modal connexion)
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
                                    title='Mot de passe oublié'
                                    modeValue='text'
                                    uppercase={false}
                                    labelStyle={styles.navButtonText}
                                    onPress={() => this.setState({isDialogVisible: true})}
                                    color={'green'}
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
        // Si un utilisateur n'est pas connecté et que c'est un nouveau utilisateur (modal inscription)
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
                                <FormInput
                                    labelName='Confirmer votre mot de passe'
                                    secureTextEntry={true}
                                    onChangeText={(text) => this.setState({ confirmPass: text })}
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
        // Sinon c'est qu'un utilisateur est déjà connecté (modal déconnexion)
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
                                <FormButton
                                    title='Supprimer votre compte'
                                    modeValue='text'
                                    uppercase={false}
                                    labelStyle={styles.navButtonText}
                                    onPress={() => firebase.auth().onAuthStateChanged(function(user) { user.delete() })}
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
        maxHeight: Dimensions.get('window').height / 2 + 80
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
