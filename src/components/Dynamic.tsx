import dynamic from 'next/dynamic';

const QuillWrapper = dynamic(import('react-quill'), {
	ssr: false,
	loading: () => {
		return <p>loading...</p>;
	},
});

export default QuillWrapper;
