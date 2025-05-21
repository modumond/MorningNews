import { useSelector } from 'react-redux';

import styles from '../styles/Bookmarks.module.css';
import Article from './Article';

export default function Bookmarks() {
	const bookmarks = useSelector((state) => state.bookmarks.value);

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Bookmarks</h2>
			<div className={styles.articlesContainer}>
				{ bookmarks.length > 0
					? bookmarks.map((data, i) => <Article key={i} {...data} isBookmarked />)
					: <p>No articles</p>
				}
			</div>
		</div>
	);
};