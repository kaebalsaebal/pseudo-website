import { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Router from 'next/router';

const Signup = () => {
	const [id, setId] = useState('');
	const [pw, setPw] = useState('');

	const auth = getAuth();

	const signUp = (id, pw) => {
		createUserWithEmailAndPassword(auth, id, pw)
			.then(() => {
				alert('회원가입에 성공하였습니다.');
				return Router.push({
					pathname: '/login',
				});
			})
			.catch((error) => {
				console.log(error);
				return alert('회원가입에 실패하였습니다.');
			});
	};

	return (
		<div>
			<div>회가하세요</div>
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
						<td rowSpan={2}>
							<button
								onClick={() => {
									return signUp(id, pw);
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
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Signup;
