import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/date.utils';

export const CommentCard = ({ comment }) => {
  const navigate = useNavigate();
  return (
    <div className='w-full mx-auto flex flex-row my-5 border-green-400 rounded-lg overflow-hidden overflow-y-auto shadow-md animate-appear'>
      <div
        onClick={() => navigate(`/user/${comment.author._id}`)}
        className='lg:w-2/12 w-4/12 flex flex-col cursor-pointer border-green-400 rounded-lg overflow-hidden shadow-md '>
        <img
          className='w-full h-32 object-cover'
          src={comment.author.avatar}
          alt={comment.author.fullName}
        />
        <p className='lg:text-xl font-bold mb-2'>{comment.author.fullName}</p>
        <p className='lg:text-xl mb-2'>
          {formatDate(comment.createdAt)}
        </p>
      </div>
      <div className='flex flex-col w-full px-1 my-3'>
        <p className='lg:text-xl my-2 mx-2 self-start'>{comment.body}</p>
      </div>
    </div>
  );
};
