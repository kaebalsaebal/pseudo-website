import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import Top from '../src/components/Top';
import Footer from '../src/components/Footer';
import { database } from '../src/firebase/firebaseConfig';
import initToken from '../src/firebase/fcm/messaging_get_token';
import initMessage from '../src/firebase/fcm/messaging_get_message';

function MyApp({ Component, pageProps }: AppProps) {
	const dbTokenData = collection(database, 'tokens');
	/* 앱 실행시 토큰받는 함수(messaging_get_token 내 initToken)
	initToken의 리턴값을 그냥 출력하면 프로미스 객체 반환(getToken()이 프로미스 함수)
	getToken의 .then(...) 구문이 실행될때 까지 기다리지 않고
	바로 getToken값을 token에 담아 반환해버리므로 발생하는 현상
	따라서 감싸는 함수에 async/await를 사용해서 getToken의 then 구문까지 실행되도록 대기
	*/
	const initTokenWrapper = async () => {
		const token = await initToken();

		const docprofile = doc(dbTokenData, 'my');
		// getDoc은 프로미스 함수이므로 리턴값 받기위해 await 사용
		const data = await getDoc(docprofile);
		if (data.exists()) {
			console.log(data.data().token);
			updateDoc(doc(dbTokenData, 'my'), {
				timestamp: Date.now(),
			});
		} else {
			setDoc(doc(dbTokenData, 'my'), {
				token,
				timestamp: Date.now(),
			});
		}
	};

	// useEffect 내에서는 async/await를 사용 못하므로 따로 함수(..Wrapper) 생성
	useEffect(function () {
		initTokenWrapper();
	}, []);

	useEffect(initMessage, []);

	return (
		<div>
			<Top />
			<Component {...pageProps} />
			<Footer />
		</div>
	);
}

export default MyApp;
