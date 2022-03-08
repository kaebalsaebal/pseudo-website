import { useState, useEffect } from 'react';
import { app, database, serkey } from '../../firebase/firebaseConfig';
import {
	doc,
	getDoc,
	getDocs,
	collection,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import styles from '../../styles/Tosso.module.css';
import QuillWrapper from './Dynamic';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const TossoDetails = ({ id }) => {
	const [singleTosso, setSingleTosso] = useState({});
	//프롭스로 받은 id에 해당하는 firestore 문서 정보를 singleTosso에 저장
	//firebase에 요청하므로 비동기 처리사용
	async function getSingleTosso() {
		if (id) {
			const singleTosso = doc(database, 'tosso', id);
			//getDoc은 특정 문서(doc객체)만 받아오는 것
			const data = await getDoc(singleTosso);
			setSingleTosso({ ...data.data(), id: data.id });
		}
	}
	//id가 바뀔 때마다 getSingleTosso 다시 실행
	//[]이면 페이지가 새로 렌더링(새로고침등)될때마다, [값]이면 값이 바뀔 때마다, 없으면 처음 한번만 수행
	useEffect(() => {
		getSingleTosso();
	}, [id]);

	const dbInstance = collection(database, 'tosso');

	// 새로고침시 기본 표시할 문서(맨 처음 문서를 기본으로)
	function getTosso() {
		getDocs(dbInstance).then((data) => {
			setSingleTosso(
				data.docs.map((item) => {
					return { ...item.data(), id: item.id };
				})[0],
			);
		});
	}
	useEffect(() => {
		getTosso();
	}, []);

	// 수정버튼 눌렀는지 관련 스테이트
	const [isEdit, setIsEdit] = useState(false);

	// 수정버튼 누르면 수정창이 나오도록
	const getEditData = () => {
		setIsEdit(true);
		setTossoTitle(singleTosso.title);
		setTossoDesc(singleTosso.desc);
	};

	// 수정할 제목과 내용 관련 스테이트
	const [tossoTitle, setTossoTitle] = useState('');
	const [tossoDesc, setTossoDesc] = useState('');

	const editTosso = (id) => {
		const collectionById = doc(database, 'tosso', id);

		updateDoc(collectionById, {
			title: tossoTitle,
			desc: tossoDesc,
		}).then(() => {
			window.location.reload();
		});
	};

	const deleteTosso = (id) => {
		const collectionById = doc(database, 'tosso', id);

		deleteDoc(collectionById).then(() => {
			window.location.reload();
		});
	};

	const dbTokenData = collection(database, 'tokens');

	const getAlert = async () => {
		const data = await getDoc(doc(dbTokenData, 'my'));
		let token = data.data().token;
		axios({
			url: 'https://fcm.googleapis.com/fcm/send',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `key=${serkey}`,
			},
			data: {
				to: `${token}`,
				notification: {
					title: 'Tosso',
					body: 'Tissi',
				},
			},
		});
	};

	return (
		<>
			<h2 onClick={getAlert}>{singleTosso.title}</h2>
			<div dangerouslySetInnerHTML={{ __html: singleTosso.desc }}></div>

			<div>
				<button className={styles.editBtn} onClick={getEditData}>
					Edit
				</button>
				<button
					className={styles.deleteBtn}
					onClick={() => deleteTosso(singleTosso.id)}>
					Delete
				</button>
			</div>

			{isEdit ? (
				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						placeholder="Enter the Title.."
						onChange={(e) => setTossoTitle(e.target.value)}
						value={tossoTitle}
					/>
					<div className={styles.ReactQuill}>
						<QuillWrapper
							theme="snow"
							onChange={setTossoDesc}
							value={tossoDesc}
						/>
					</div>
					<button
						className={styles.saveBtn}
						onClick={() => editTosso(singleTosso.id)}>
						Update Note
					</button>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default TossoDetails;
