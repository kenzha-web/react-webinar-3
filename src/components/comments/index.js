import {memo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentItem from "../comment-item";
import {Link} from "react-router-dom";

const cn = bem('Comments');

function Comments({productId, comments, onAddComment = () => {}, exists}) {
  const commentRef = useRef();
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  // console.log(comments)
  // console.log(exists)

  const handleSubmit = () => {
    const text = commentRef.current.value;
    if (text.trim()) {
      onAddComment({ text, parentId: productId, type: 'article' });
      commentRef.current.value = '';
    }
  };

  const handleReplyClick = (commentId) => {
    setActiveCommentId(commentId);
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setActiveCommentId(null);
    setIsReplying(false);
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({comments.length})</div>
      {comments.map(comment =>
        <CommentItem
          key={comment._id}
          comment={comment}
          onAddComment={onAddComment}
          exists={exists}
          activeCommentId={activeCommentId}
          isReplying={isReplying}
          handleReplyClick={handleReplyClick}
          handleCancelReply={handleCancelReply}
        />
      )}
      {exists && !isReplying && (
        <form className={cn('field')}>
          <label htmlFor="comment">Новый комментарий</label>
          <textarea
            ref={commentRef}
            name="text"
            id="comment"
            cols="30"
            rows="10"
            placeholder="Текст"
          ></textarea>
          <button onClick={handleSubmit}>Отправить</button>
        </form>
      )}
      {!exists && (
        <div className={cn('enter')}>
          <Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность комментировать.
        </div>
      )}
    </div>
  )
}

export default memo(Comments);
