import { memo, useRef, useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";

const cn = bem('CommentForm');

function CommentForm({ activeCommentId, exists, onAddComment, onCancelReply, parentId }) {
  const replyTextRef = useRef();

  const handleAddComment = (e) => {
    e.preventDefault();
    const text = replyTextRef.current.value;
    if (text.trim()) {
      onAddComment({ parentId: parentId, text, type: 'comment' });
      replyTextRef.current.value = '';
      onCancelReply();
    } else {
      alert('Комментарий не может быть пустым.');
    }
  };

  useEffect(() => {
    if (replyTextRef.current) {
      replyTextRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (!exists) {
    return (
      <div className={cn('enter')}>
        <Link to="/login" className={cn('link')}>Войдите</Link>, чтобы иметь возможность отвечать на комментарии.
        <button className={cn('btn-cancel')} onClick={onCancelReply}>Отмена</button>
      </div>
    );
  }

  return (
    <form className={cn('reply-form')} onSubmit={handleAddComment}>
      <label htmlFor="comment">Новый ответ</label>
      <textarea id="comment" ref={replyTextRef} rows="5" placeholder="Мой ответ"></textarea>
      <div className={cn('reply-form-buttons')}>
        <button className={cn('btn-send')} type="submit">Отправить</button>
        <button type="button" onClick={onCancelReply}>Отмена</button>
      </div>
    </form>
  );
}

export default memo(CommentForm);
