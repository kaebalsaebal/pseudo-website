import { getMessaging, getToken } from 'firebase/messaging';
import { app, clikey } from '../firebaseConfig';

// 토큰 생성
const initToken = async () => {
	// firebaseConfig에서 생성한 initApp 객체로 메세징 객체-messaging 생성
	const messaging = getMessaging(app);
	// 메세징 객체와 파이어베이스 키페어(clikey)로 토큰받기
	// getToken이 함수이므로 token 객체로 리턴값 저장
	// 참고로 getToken은 프로미스 객체를 리턴하므로 값을 받기 위해 await 써주기
	const token = await getToken(messaging, { vapidKey: clikey })
		.then((currentToken) => {
			if (currentToken) {
				return currentToken;
			}
			console.log(
				'No registration token available. Request permission to generate one.',
			);
			return null;
		})
		.catch((err) => {
			console.log('An error occurred while retrieving token. ', err);
			return null;
		});
	// 받아온 토큰인 token객체 반환
	return token;
};

export default initToken;
