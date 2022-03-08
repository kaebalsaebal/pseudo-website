import { getMessaging, onMessage } from 'firebase/messaging';
import { app } from '../../firebase/firebaseConfig';

const initMessage = () => {
	const messaging = getMessaging(app);
	onMessage(messaging, (payload) => {
		console.log(payload);
	});
};

export default initMessage;
