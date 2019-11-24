import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()

// in firebaseConfig.js
// export default {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//     measurementId: ""
// }