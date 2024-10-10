import { cn as bem } from '@bem-react/classname';
import './style.css';
import {useRef, useState} from "react";
import {Link} from "react-router-dom";

const cn = bem('CommentsItem');

function CommentItem({comment, onAddComment, exists, activeCommentId, isReplying, handleReplyClick, handleCancelReply}) {
  const replyTextRef = useRef();
  const isReplyFormVisible = activeCommentId === comment._id && isReplying;
  const username = comment.author.profile.name

  const date = new Date(comment.dateCreate);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleAddComment = () => {
    const text = replyTextRef.current.value;
    if (text.trim()) {
      onAddComment({ parentId: comment._id, text, type: 'comment' });
      replyTextRef.current.value = '';
      handleCancelReply();
    }
  };

  return (
    <div key={comment._id} className={cn()}>
      <div className={cn('header')}>
        <div className={cn('name')}>{username}</div>
        <div className={cn('date')}>{`${formattedDate} в ${formattedTime}`}</div>
      </div>
      <div className={cn('text')}>{comment.text}</div>
      <button className={cn('btn')} onClick={() => handleReplyClick(comment._id)}>
        Ответить
      </button>

      {exists && isReplyFormVisible && (
        activeCommentId === comment._id && (
          <form className={cn('reply-form')}>
            <label htmlFor="comment">Новый ответ</label>
            <textarea id="comment" ref={replyTextRef} rows="5" placeholder="Мой ответ"></textarea>
            <div className={cn('reply-form-buttons')}>
              <button className={cn('btn-send')} onClick={handleAddComment}>Отправить</button>
              <button onClick={handleCancelReply}>Отмена</button>
            </div>
          </form>
        )
      )}

      {!exists && isReplyFormVisible && (
        <form className={cn('enter')}>
          <Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность отвечать на комментарии.
          <button className={cn('btn-cancel')} onClick={handleCancelReply}>Отмена</button>
        </form>
      )}

      <div className={cn('replies')}>
        {comment.children && comment.children.map(reply => (
          <CommentItem
            key={reply._id}
            comment={reply}
            onAddComment={onAddComment}
            exists={exists}
            activeCommentId={activeCommentId}
            isReplying={isReplying}
            handleReplyClick={handleReplyClick}
            handleCancelReply={handleCancelReply}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentItem;
