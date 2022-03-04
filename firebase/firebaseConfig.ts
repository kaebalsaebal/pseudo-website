// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDLxBTYDYOltj-0C4X9KvZrvEbuuCnO14Y',
	authDomain: 'kmumpj.firebaseapp.com',
	databaseURL: 'https://kmumpj.firebaseio.com',
	projectId: 'kmumpj',
	storageBucket: 'kmumpj.appspot.com',
	messagingSenderId: '448588964761',
	appId: '1:448588964761:web:70503f4d6f5d7159b6a908',
	measurementId: 'G-QV6BLMN156',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
