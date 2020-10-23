import React from 'react';
import Navigation from './src/Navigation/Navigation';

import * as firebase from 'firebase';
import firebaseConfig from './src/helpers/firebase'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    
    
  }

  render() {
    return (
      <Navigation/>
    )
  }
}
