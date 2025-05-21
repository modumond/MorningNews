import { BACKEND_URL } from './urls';
import { addBookmark, removeBookmark } from '../reducers/bookmarks';

export const handleBookmark = (dispatch, user, props) => {
  if (!user.token) return;

  fetch(BACKEND_URL + "/users/canBookmark/" + user.token)
    .then(response => response.json())
    .then(data => {
      if (data.result && data.canBookmark) {
        if (props.isBookmarked) dispatch(removeBookmark(props));
        else dispatch(addBookmark(props));
      }
    });
};