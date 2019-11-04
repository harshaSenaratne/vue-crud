 // Your web app's Firebase configuration
 import firebase from 'firebase'
import firestore from 'firebase/firestore'

 var firebaseConfig = {
    apiKey: "AIzaSyAaGx84jAljXGH3KVTkCHnhjd6j10G8Ciw",
    authDomain: "vue-pizza-parlour.firebaseapp.com",
    databaseURL: "https://vue-pizza-parlour.firebaseio.com",
    projectId: "vue-pizza-parlour",
    storageBucket: "vue-pizza-parlour.appspot.com",
    messagingSenderId: "17567355807",
    appId: "1:17567355807:web:3653afde9adaaba5aba3aa",
    measurementId: "G-CR1B0KZT44"
  };
  // Initialize Firebase
  const firebaseApp =  firebase.initializeApp(firebaseConfig);

 // firebase.analytics();

//firebaseApp.firestore().settings({timestampsInSnapshots:true})

 export default firebaseApp.firestore();