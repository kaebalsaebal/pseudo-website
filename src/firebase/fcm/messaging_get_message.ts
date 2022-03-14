import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from '../firebaseConfig';

const initMessage = () => {
	const messaging = getMessaging(app);
	onMessage(messaging, (payload) => {
		console.log(payload.data.title);
		console.log(payload.data.body);
		alert(`${payload.data.body}이다`);
	});
};

export default initMessage;
