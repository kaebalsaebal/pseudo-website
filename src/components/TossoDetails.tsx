import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import {
	doc,
	addDoc,
	getDoc,
	getDocs,
	collection,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import styles from '../../styles/Tosso.module.css';
import QuillWrapper from './Dynamic';
import 'react-quill/dist/quill.snow.css';

function TossoDetails({ id }) {
	const dbInstance = collection(database, 'tosso');

	const [singleTosso, setSingleTosso] = useState({});
	// 프롭스로 받은 id에 해당하는 firestore 문서 정보를 singleTosso에 저장
	// firebase에 요청하므로 비동기 처리사용
	async function getSingleTosso() {
		if (id) {
			const singleTosso = doc(dbInstance, id);
			// getDoc은 특정 문서(doc객체)만 받아오는 것
			const data = await getDoc(singleTosso);
			setSingleTosso({ ...data.data(), id: data.id });
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			getComments(id);
		} else {
			getDocs(dbInstance).then((data) => {
				setSingleTosso(
					data.docs.map((item) => {
						return { ...item.data(), id: item.id };
					})[0],
				);
			});
		}
	}
	// id가 바뀔 때마다 getSingleTosso 다시 실행
	// []이면 페이지가 새로 렌더링(새로고침등)될때마다, [값]이면 값이 바뀔 때마다, 없으면 처음 한번만 수행
	useEffect(() => {
		getSingleTosso();
	}, [singleTosso]);

	// 수정버튼 눌렀는지 관련 스테이트
	const [isEdit, setIsEdit] = useState(false);

	// 수정할 제목과 내용 관련 스테이트
	const [tossoTitle, setTossoTitle] = useState('');
	const [tossoDesc, setTossoDesc] = useState('');

	// 수정버튼 누르면 수정창이 나오도록
	const getEditData = () => {
		setIsEdit(!isEdit);
		setTossoTitle((singleTosso as any).title);
		setTossoDesc((singleTosso as any).desc);
	};

	const editTosso = (id) => {
		const collectionById = doc(database, 'tosso', id);

		updateDoc(collectionById, {
			title: tossoTitle,
			desc: tossoDesc,
		}).then(() => {
			setIsEdit(false);
			alert('수정되었습니다.');
		});
	};

	const deleteTosso = (id) => {
		const collectionById = doc(database, 'tosso', id);

		deleteDoc(collectionById).then(() => {
			setIsEdit(false);
			alert('삭제되었습니다.');
		});
	};

	const dbTokenData = collection(database, 'tokens');

	const getAlert = async (message) => {
		// 토큰을 파이어스토어에서 꺼내오기
		const data = await getDoc(doc(dbTokenData, 'my'));
		const { token } = data.data();

		// 토큰과 받고싶은 메세지를 요청의 Body에 담아 POST전송
		axios({
			url: 'https://53bd-121-166-111-58.ap.ngrok.io/fcm',
			method: 'POST',
			data: {
				token: `${token}`,
				message: `${message} 가 등록되었습니다`,
			},
		});
	};

	const [commentArray, setCommentArray] = useState([]);

	const getComments = (id) => {
		const subcol = collection(dbInstance, id, 'comments');
		getDocs(subcol).then((data) => {
			setCommentArray(
				data.docs.map((item) => {
					return { ...item.data(), id: item.id };
				}),
			);
		});
	};

	const [comment, setComment] = useState('');

	const saveComment = async (id) => {
		const subcol = collection(dbInstance, id, 'comments');
		await addDoc(subcol, {
			content: comment,
		});
		getComments(id);
		getAlert(comment);
	};

	const deleteComment = async (comid) => {
		const targetdoc = doc(
			dbInstance,
			(singleTosso as any).id,
			'comments',
			comid,
		);
		await deleteDoc(targetdoc);
		getComments((singleTosso as any).id);
	};

	return (
		<>
			{singleTosso ? (
				<div>
					<h2>{(singleTosso as any).title}</h2>
					<div
						dangerouslySetInnerHTML={{
							__html: (singleTosso as any).desc,
						}}
					/>
					<i>
						{(singleTosso as any).author}{' '}
						{(singleTosso as any).edited}
					</i>
				</div>
			) : (
				<h2>게시글을 클릭하세요.</h2>
			)}

			<div>
				<button
					className={styles.editBtn}
					onClick={() => {
						if (singleTosso) {
							return getEditData();
						}
						return alert('게시글이 없습니다.');
					}}>
					Edit
				</button>
				<button
					className={styles.deleteBtn}
					onClick={() => {
						if (singleTosso) {
							return deleteTosso((singleTosso as any).id);
						}

						return alert('게시글이 없습니다.');
					}}>
					Delete
				</button>
			</div>

			{isEdit ? (
				<div className={styles.inputContainer}>
					<input
						className={styles.input}
						placeholder="Enter the Title.."
						onChange={(e) => {
							return setTossoTitle(e.target.value);
						}}
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
						onClick={() => {
							return editTosso((singleTosso as any).id);
						}}>
						Update Note
					</button>
				</div>
			) : (
				<></>
			)}

			<div className={styles.commentsContainer}>
				<h4>comments</h4>
				<div>
					{commentArray.map((c) => {
						return (
							<div className={styles.commentsWrapper}>
								<span>{c.content}</span>
								<button
									className={styles.commentsDeleteBtn}
									onClick={() => {
										return deleteComment(c.id);
									}}>
									x
								</button>
							</div>
						);
					})}
				</div>
				<input
					className={styles.input}
					placeholder="비난,비방,욕설 등은 제재됩니다"
					onChange={(e) => {
						return setComment(e.target.value);
					}}
				/>
				<button
					className={styles.commentBtn}
					onClick={() => {
						if (singleTosso) {
							return saveComment((singleTosso as any).id);
						}
						return alert('게시글이 없습니다.');
					}}>
					Push
				</button>
			</div>
		</>
	);
}

export default TossoDetails;

TossoDetails.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	id: PropTypes.any.isRequired,
};
