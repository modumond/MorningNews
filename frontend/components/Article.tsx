import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { handleBookmark } from "../utils/handleBookmark";
import { hideArticle } from "../reducers/hiddenArticles";
import { UserState } from "../reducers/user";
import styles from "../styles/Article.module.css";

export interface ArticleProps {
  title: string;
  author: string;
  urlToImage: string;
  description: string;
  isBookmarked: boolean;
  isHidden?: boolean;
}

export default function Article(props: ArticleProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  if (!props.isHidden)
    return (
      <div className={styles.articles}>
        <div className={styles.articleHeader}>
          <h3>{props.title}</h3>
          <FontAwesomeIcon
            icon={faBookmark}
            style={props.isBookmarked ? { color: "#E9BE59" } : {}}
            className={styles.bookmarkIcon}
            onClick={() => handleBookmark(dispatch, user, props)}
          />
          <FontAwesomeIcon
            icon={faEyeSlash}
            className={styles.hideIcon}
            onClick={() => dispatch(hideArticle(props))}
          />
        </div>
        <h4 style={{ textAlign: "right" }}>- {props.author}</h4>
        <div className={styles.divider}></div>
        <Image
          src={props.urlToImage}
          alt={props.title}
          width={600}
          height={314}
        />
        <p>{props.description}</p>
      </div>
    );
}
