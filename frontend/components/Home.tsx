import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Article, { ArticleProps } from "./Article";
import TopArticle from "./TopArticle";
import { BACKEND_URL } from "../utils/urls";
import styles from "../styles/Home.module.css";
import { BookmarksState } from "../reducers/bookmarks";
import { HiddenArticlesState } from "../reducers/hiddenArticles";

interface TopArticleType {
  title?: string;
  author?: string;
  urlToImage?: string;
  description?: string;
  isHidden?: boolean;
}

export default function Home() {
  const bookmarks = useSelector(
    (state: { bookmarks: BookmarksState }) => state.bookmarks.value
  );
  const hiddenArticles = useSelector(
    (state: { hiddenArticles: HiddenArticlesState }) =>
      state.hiddenArticles.value
  );

  const [articlesData, setArticlesData] = useState([]);
  const [topArticle, setTopArticle] = useState<TopArticleType>({});

  useEffect(() => {
    fetch(BACKEND_URL + "/articles")
      .then((response) => response.json())
      .then((data) => {
        setTopArticle(data.articles[0]);
        setArticlesData(
          data.articles.filter((article: ArticleProps, i: number) => i > 0)
        );
      });
  }, []);

  const articles: React.JSX.Element[] = articlesData.map(
    (data: ArticleProps, i: number) => {
      const isBookmarked: boolean = bookmarks.some(
        (bookmark) => bookmark.title === data.title
      );
      const isHidden: boolean = hiddenArticles.some(
        (article) => article.title === data.title
      );
      return (
        <Article
          key={i}
          {...data}
          isBookmarked={isBookmarked}
          isHidden={isHidden}
        />
      );
    }
  );

  return (
    <>
      <TopArticle
        title={topArticle.title!}
        author={topArticle.author!}
        urlToImage={topArticle.urlToImage!}
        description={topArticle!.description!}
        isBookmarked={bookmarks.some(
          (bookmark: ArticleProps) => bookmark.title === topArticle.title
        )}
      />
      <div className={styles.articlesContainer}>{articles}</div>
    </>
  );
}
