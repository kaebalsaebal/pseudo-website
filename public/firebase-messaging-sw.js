importScripts('https://www.gstatic.com/firebasejs/8.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.0/firebase-messaging.js');

const config = {
	apiKey: 'AIzaSyDLxBTYDYOltj-0C4X9KvZrvEbuuCnO14Y',
	authDomain: 'kmumpj.firebaseapp.com',
	databaseURL: 'https://kmumpj.firebaseio.com',
	projectId: 'kmumpj',
	storageBucket: 'kmumpj.appspot.com',
	messagingSenderId: '448588964761',
	appId: '1:448588964761:web:70503f4d6f5d7159b6a908',
	measurementId: 'G-QV6BLMN156',
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
