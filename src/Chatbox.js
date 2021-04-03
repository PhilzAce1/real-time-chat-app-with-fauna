import React, { useState } from 'react';

function Chatbox(props) {
  const [text, setText] = useState('');
  function onSubmit(e) {
    e.preventDefault();
    console.log(text);
    localStorage.setItem('username', text);
    setText('');
  }
  const chatBubleList = Array(30)
    .fill('6')
    .map((x, i) => (
      <ChatBubble
        key={i}
        from="Philemon"
        text="Hello world"
        date="21-11-2020"
      />
    ));
  return (
    <div className="chatbox">
      <div className="header">Chat Application</div>
      <div className="chat_body">{chatBubleList}</div>
      <div className="text_input_form">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

function ChatBubble({ name, text, date }) {
  return (
    <div
      style={{
        // marginRight: 'auto',
        marginTop: '10px',
        marginBottom: '10px',
        //
        marginLeft: 'auto',
        background: 'yellow',
        width: '50%',
        borderRadius: '20px',
        textAlign: 'left',
        padding: '10px',
      }}
    >
      <header>From:{name}</header>
      <div>{text}</div>
      <div>{date}</div>
    </div>
  );
}
export default Chatbox;
