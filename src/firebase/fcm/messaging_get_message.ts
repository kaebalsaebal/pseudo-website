import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from '../firebaseConfig';

const initMessage = () => {
	const messaging = getMessaging(app);
	onMessage(messaging, (payload) => {
		console.log(payload.notification.title);
		console.log(payload.notification.body);
		alert(`${payload.notification.body}이다`);
	});
};

export default initMessage;
