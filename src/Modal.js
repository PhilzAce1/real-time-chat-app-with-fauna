import React, { useEffect } from 'react';

function Modal(props) {
  /**
     savedUsername returns a boolean that returns true, if there is no username saved in localStarage
    */
  const savedUsername =
    localStorage.getItem('username') === 'null' ||
    localStorage.username === undefined;

  /**
    useState is a React hook used for State management
    * username is used to manage controlled element value, "Input field"
    * displayModal is a boolean that toggles the modal
 */
  const [username, setUsername] = React.useState('');
  const [displayModal, setDisplayModal] = React.useState(savedUsername);
  function onSubmitUsername(e) {
    e.preventDefault(); // prevent window from reloading on form submit
    localStorage.setItem('username', username); // set the username to localStarage
    setDisplayModal(false); // toggle modal
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
