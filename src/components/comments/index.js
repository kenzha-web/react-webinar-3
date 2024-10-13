import { memo, useRef, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentItem from "../comment-item";
import { Link } from "react-router-dom";

const cn = bem('Comments');

function Comments({ productId, comments, onAddComment = () => {}, exists }) {
  const commentRef = useRef();
  const [activeCommentId, setActiveCommentId] = useState('');
  const [newCommentId, setNewCommentId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = commentRef.current.value;
    if (text.trim()) {
      onAddComment({ text, parentId: productId, type: 'article' });
      commentRef.current.value = '';
    } else {
      alert('Комментарий не может быть пустым.');
    }
  };

  const handleReplyClick = (commentId) => {
    setActiveCommentId(commentId);
  };

  const handleCancelReply = () => {
    setActiveCommentId('');
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>Комментарии ({comments.length})</div>
      <ul className={cn('list')}>
        {comments.map(comment =>
          <CommentItem
            key={comment._id}
            comment={comment}
            activeCommentId={activeCommentId}
            exists={exists}
            onReplyClick={handleReplyClick}
            onCancelReply={handleCancelReply}
            onAddComment={onAddComment}
          />
        )}
      </ul>
      {!activeCommentId && exists && (
        <form onSubmit={handleSubmit} className={cn('field')}>
          <label htmlFor="comment">Новый комментарий</label>
          <textarea
            ref={commentRef}
            name="text"
            id="comment"
            cols="30"
            rows="10"
            placeholder="Текст"
          ></textarea>
          <button type="submit">Отправить</button>
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
