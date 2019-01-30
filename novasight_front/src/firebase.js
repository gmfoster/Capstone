
import firebase from 'firebase'

const config = {
                apiKey: "AIzaSyCGkOiKMSxR9NRM-d1WkC2kEYOGp2d8j5k",
                authDomain: "novacoast-capstone.firebaseapp.com",
                databaseURL: "https://novacoast-capstone.firebaseio.com",
                projectId: "novacoast-capstone",
                storageBucket: "novacoast-capstone.appspot.com",
                messagingSenderId: "1039131724249"
};

firebase.initializeApp(config);
export default firebase;

