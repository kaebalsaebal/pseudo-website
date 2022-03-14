import { getMessaging, onMessage } from 'firebase/messaging';

const initMessage = () => {
	const messaging = getMessaging();
	onMessage(messaging, (payload) => {
		console.log(payload.data.title);
		console.log(payload.data.body);
		alert(`${payload.data.body}이다`);
	});
};

export default initMessage;
