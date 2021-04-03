import React, { useEffect } from 'react';

function Modal(props) {
  //   const [display, setDisplay] = useState(false);

  const username = localStorage.getItem('username');
  useEffect(() => {
    console.log(username);
    console.log('Hello Modal');
  }, [username]);
  return (
    <div
      className="modal"
      style={{
        display: !username ? 'block' : 'none',
      }}
    >
      Modal
    </div>
  );
}

export default Modal;
