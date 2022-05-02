import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import styles from '../../styles/Login.module.css';

function Login() {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const getToken = (id, pw) => {
		const auth = getAuth();

		signInWithEmailAndPassword(auth, id, pw)
			.then(() => {
				return Router.push({
					pathname: `/tosso`,
				});
			})
			.catch((err) => {
				console.log(err);
				alert('로그인에 실패했습니다.');
			});
	};

	return (
		<div>
			<div className={styles.loginContainer}>
				<div className={styles.loginTitle}>로그인하세요</div>
				<table>
					<thead />
					<tbody>
						<tr>
							<td>
								<input
									placeholder="Email"
									onChange={(e) => {
										return setId(e.target.value);
									}}
								/>
							</td>
							<td>
								<button
									onClick={() => {
										return getToken(id, pw);
									}}>
									제출
								</button>
							</td>
						</tr>
						<tr>
							<td>
								<input
									type="password"
									placeholder="PW"
									onChange={(e) => {
										return setPw(e.target.value);
									}}
								/>
							</td>
							<td>
								<Link href="/signup">
									<button>회원가입하기</button>
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Login;
