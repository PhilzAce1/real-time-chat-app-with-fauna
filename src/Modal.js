import React, { useEffect } from 'react';

function Modal(props) {
  const savedUsername =
    localStorage.getItem('username') === 'null' ||
    localStorage.username === undefined;
  const [username, setUsername] = React.useState('');
  const [displayModal, setDisplayModal] = React.useState(savedUsername);
  function onSubmitUsername(e) {
    e.preventDefault();
    localStorage.setItem('username', username);
    setDisplayModal(false);
  }

  useEffect(() => {}, [displayModal]);
  return (
    <div
      className="modal"
      style={{
        display: displayModal === true ? 'flex' : 'none',
      }}
    >
      <div>What is your Username ?</div>
      <form onSubmit={onSubmitUsername}>
        <input
          value={username}
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Modal;
