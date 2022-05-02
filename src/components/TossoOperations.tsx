import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import QuillWrapper from './Dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from '../../styles/Tosso.module.css';

// index.tsx에서 getSingleTosso프롭스 가져오기
function TossoOperations({ getSingleTosso, email }) {
	// isInputVisible 기본값은 false
	const [isInputVisible, setInputVisible] = useState(false);
	// isInputVisible 값 변경시키는 트리거
	function inputToggle() {
		setInputVisible(!isInputVisible);
	}

	// tossoTitle 기본값은 비어있는
	const [tossoTitle, setTossoTitle] = useState('');
	// 마찬가지로 기본값이 비어있는 tossoDesc 생성, setTossoDesc로 값 변경
	const [tossoDesc, setTossoDesc] = useState('');
	// setTossoDesc의 트리거함수(value는 onChange가 알아서 결정)
	function addDesc(value) {
		setTossoDesc(value);
	}

	// firestore에서 tosso 이름인 콜렉션 가져오기
	const dbInstance = collection(database, 'tosso');

	// 이제 말안해도 알겠지?
	const [tossoArray, setTossoArray] = useState([]);
	// getDocs의 트리거함수
	function getTosso() {
		// getDocs는 콜렉션 데이타 가져오기
		getDocs(dbInstance).then(function (data) {
			// data가 오면(콜백) 출력
			// console.log(data);
			// 실제 문서 필드는 data.docs.(아이디)._document.data에 존재
			// 마찬가지로 data.docs의 각 요소들(item)을 콜백하여 거기에서 뽑아내기
			/*
			console.log(
				data.docs.map((item) => {
					return { ...item.data(), id: item.id };
				}),
			);
			*/
			// tossoArray에 각 문서값 저장
			setTossoArray(
				data.docs.map((item) => {
					return { ...item.data(), id: item.id };
				}),
			);
		});
	}
	// 페이지를 불러올 때마다 매번 getTosso 실행
	useEffect(
		function () {
			getTosso();
		},
		[tossoArray],
	);

	// addDoc의 트리거함수
	function saveTosso() {
		if (!tossoTitle) {
			return alert('제목을 입력하세요.');
		}
		if (!tossoDesc) {
			return alert('내용을 입력하세요.');
		}

		// addDoc은 콜렉션(dbInstance)에 문서 추가
		return addDoc(dbInstance, {
			// title 필드 생성후 값을 tossoTitle로, desc 필드 생성후 값을 tossoDesc로
			title: tossoTitle,
			desc: tossoDesc,
			author: email,
			edited: Date.now(),
			// 문서 추가가 완료되면 콜백작동
		})
			.then(() => {
				alert('게시글이 등록되었습니다.');
				// 입력창 초기화
				setTossoTitle('');
				setTossoDesc('');
				setInputVisible(false);
			})
			.catch((err) => {
				console.log(err);
				alert('게시글 등록에 실패했습니다.');
			});
	}

	return (
		<>
			<div className={styles.btnContainer}>
				{/* 클릭시 inputToggle 트리거 발동--> */}
				<button className={styles.button} onClick={inputToggle}>
					Add a New Tosso
				</button>
			</div>

			{isInputVisible ? (
				<div className={styles.inputContainer}>
					{/* 입력값 들어올시 tossoTitle 값을 그걸로 변경 */}
					<input
						className={styles.input}
						placeholder="Enter the tosso.."
						onChange={(e) => {
							return setTossoTitle(e.target.value);
						}}
						value={tossoTitle}
					/>
					{/* 입력값 들어올시 tossoDesc 값을 그걸로 변경 */}
					<div className={styles.ReactQuill}>
						<QuillWrapper
							theme="snow"
							onChange={addDesc}
							value={tossoDesc}
						/>
					</div>
				</div>
			) : (
				<></>
			)}

			{/* 클릭시 saveTosso 트리거 발동 */}
			<button className={styles.saveBtn} onClick={saveTosso}>
				Save Tosso
			</button>

			{/* 현재 firestore에 저장된 문서 보여주기 */}
			<div className={styles.tossoesContainer}>
				{tossoArray.map((tosso) => {
					return (
						<button
							className={styles.tossoesWrapper}
							/* 클릭시 프롭스로 가져온 getSingleTosso에 해당 문서 id를 담아 실행 */
							onClick={() => {
								return getSingleTosso(tosso.id);
							}}>
							<h4>{tosso.title}</h4>
						</button>
					);
				})}
			</div>
		</>
	);
}

export default TossoOperations;

// 프롭스체크
TossoOperations.propTypes = {
	getSingleTosso: PropTypes.func.isRequired,
	email: PropTypes.string.isRequired,
};
