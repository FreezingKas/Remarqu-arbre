import React from 'react';
import Navigation from './src/Navigation/Navigation';

import * as firebase from 'firebase';
import firebaseConfig from './src/helpers/firebase'

export default class App extends React.Component {

  constructor(props) {
    super(props) 
    // Initialisation de firebase au plus tôt dans l'application 
    // (On pourra implémenter les analytics plus tard)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
   }
  }

  render() {
    return (
      <Navigation/>
    )
  }
}
