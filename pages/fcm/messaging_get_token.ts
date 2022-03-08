import { getMessaging, getToken } from 'firebase/messaging';
import { app, clikey } from '../../firebase/firebaseConfig';

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const initToken = () => {
	const messaging = getMessaging(app);
	getToken(messaging, { vapidKey: clikey })
		.then((currentToken) => {
			if (currentToken) {
				// Send the token to your server and update the UI if necessary
				// ...
				console.log(currentToken);
			} else {
				// Show permission request UI
				console.log(
					'No registration token available. Request permission to generate one.',
				);
				// ...
			}
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			// ...
		});
};

export default initToken;
