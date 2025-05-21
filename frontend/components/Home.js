import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Article from './Article';
import TopArticle from './TopArticle';
import { BACKEND_URL } from '../utils/urls';
import styles from '../styles/Home.module.css';

export default function Home() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const hiddenArticles = useSelector((state) => state.hiddenArticles.value);

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState({});

  useEffect(() => {
    fetch(BACKEND_URL + "/articles")
      .then(response => response.json())
      .then(data => {
        setTopArticle(data.articles[0]);
        setArticlesData(data.articles.filter((data, i) => i > 0));
      });
  }, []);

  const articles = articlesData.map((data, i) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.title === data.title);
    const isHidden = hiddenArticles.some(article => article.title === data.title);
    return <Article key={i} {...data} isBookmarked={isBookmarked} isHidden={isHidden} />;
  });

  return (
    <>
      <TopArticle {...topArticle} isBookmarked={bookmarks.some(bookmark => bookmark.title === topArticle.title)} />
      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </>
  );
};