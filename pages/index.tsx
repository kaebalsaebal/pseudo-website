import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<div>
				<p>게시판 서비스에 오신 것을 환영합니다</p>
			</div>
			<div>
				<Link href="/login">
					<button>로그인하기</button>
				</Link>
			</div>
		</div>
	);
};
// 프롭스 흐름
// index에서 TossoOperations에 getSingleTosso 전달
// TossoOperation에서 getSingleTosso를 받아 인자로 자기 firestore id 전달
// index에서 그 id를 가지고 getSingleTosso 처리후 TossoDetails에 id 전달
// TossoDetails가 그 id를 가지고 firestore 문서 처리
export default Home;
