import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';

const cn = bem('CommentsItem');

function CommentItem({comment, activeCommentId, exists, onReplyClick, onCancelReply, onAddComment,}) {
  const MAX_LEVEL = 5;
  const PAD_SIZE = 30;

  const isReplying = activeCommentId === comment._id;
  const marginLeft = Math.min(comment.level, MAX_LEVEL) * PAD_SIZE;

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

  return (
    <>
      <li className={cn()} style={{ marginLeft: `${marginLeft}px` }}>
        <div className={cn('header')}>
          <div className={cn('name')}>{comment.author.profile.name}</div>
          <div className={cn('date')}>{`${formattedDate} в ${formattedTime}`}</div>
        </div>
        <div className={cn('text')}>{comment.text}</div>
        <button className={cn('btn')} onClick={() => onReplyClick(comment._id)}>
          Ответить
        </button>
        {isReplying && (
          <CommentForm
            activeCommentId={activeCommentId}
            exists={exists}
            onAddComment={onAddComment}
            onCancelReply={onCancelReply}
            parentId={comment._id}
          />
        )}
      </li>
    </>
  );
}

export default memo(CommentItem);
