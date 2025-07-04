// Firebase v8 SDK configuration
var firebaseConfig = {
  apiKey: "AIzaSyBKKY3Y8VrJ7lXdF8YWU6Zfw6TQ7QY",
  authDomain: "luck-coin.firebaseapp.com",
  databaseURL: "https://luck-coin-default-rtdb.firebaseio.com",
  projectId: "luck-coin",
  storageBucket: "luck-coin.appspot.com",
  messagingSenderId: "329250321116",
  appId: "1:329250321116:web:b0a6e32fd2b20dd59af69f"
};

// Initialize Firebase (this line will only work if SDK is loaded first)
firebase.initializeApp(firebaseConfig);

// Reference to the database
const db = firebase.database();
const auth = firebase.auth();