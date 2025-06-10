import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

import { handleBookmark } from "../utils/handleBookmark";
import { UserState } from "../reducers/user";
import { ArticleProps } from "./Article";
import styles from "../styles/TopArticle.module.css";

export default function TopArticle(props: ArticleProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.value);

  return (
    <article className={styles.topContainer}>
      <img src={props.urlToImage} className={styles.image} alt={props.title} />
      <div className={styles.topText}>
        <h2 className={styles.topTitle}>{props.title}</h2>
        <FontAwesomeIcon
          icon={faBookmark}
          onClick={() => handleBookmark(dispatch, user, props)}
          style={props.isBookmarked ? { color: "#E9BE59" } : {}}
          className={styles.bookmarkIcon}
        />
        <h4>{props.author}</h4>
        <p>{props.description}</p>
      </div>
    </article>
  );
}
