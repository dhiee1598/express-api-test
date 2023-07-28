import { useState } from 'react';

const GoalForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=' w-2/4 mt-5'>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='w-full border-2 border-black mb-2 rounded-lg p-1 outline-none text-md'
        />
        <button className='border border-black px-6 py-1 rounded-md '>
          Submit
        </button>
      </form>
    </div>
  );
};

export default GoalForm;
