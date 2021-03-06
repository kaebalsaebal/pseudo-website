import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Tosso.module.css';
import TossoOperations from '../src/components/TossoOperations';
import TossoDetails from '../src/components/TossoDetails';

const Home = () => {
	// TossoOperation에 있는 문서들 아이디 담을 스테이트
	const [id, setId] = useState(null);
	// 프롭스로 전달할 함수
	// TossoOperation에서 각 문서 id를 보내면 id변수에다 저장
	function getSingleTosso(id) {
		setId(id);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Create Tosso App</title>
				<meta
					name="description"
					content="Generated by create tosso app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className={styles.container}>
					<div className={styles.left}>
						{/* getSingleTosso를 동일명으로 TossoOperation에 프롭스전달 */}
						<TossoOperations getSingleTosso={getSingleTosso} />
					</div>
					<div className={styles.right}>
						{/* 또 마찬가지로 id를 TossoDetails에 프롭스전달 */}
						<TossoDetails id={id} />
					</div>
				</div>
			</main>
		</div>
	);
};
// 프롭스 흐름
// index에서 TossoOperations에 getSingleTosso 전달
// TossoOperation에서 getSingleTosso를 받아 인자로 자기 firestore id 전달
// index에서 그 id를 가지고 getSingleTosso 처리후 TossoDetails에 id 전달
// TossoDetails가 그 id를 가지고 firestore 문서 처리
export default Home;
