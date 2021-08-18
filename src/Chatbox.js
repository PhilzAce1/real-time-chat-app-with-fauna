import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/react-hooks';
import {
  Client,
  query as q,
  Ref,
  Collection,
  Update,
  Create,
  Do,
} from 'faunadb';
const client = new Client({
  secret: 'fnAEGIwj7UACCTbLRjLo-Q3VvbsVfCQqLolyTAq1',
});

const docRef = q.Ref(q.Collection('ChatRooms'), '1');
const chatRoomRef = Ref(Collection('ChatRooms'), '1');

function report(e) {
  const data = 'action' in e ? e['document'].data : e.data;

  // perform required Actions
  return data;
}

let stream;
const startStream = (callback, secondCallback) => {
  stream = client.stream
    .document(docRef)
    .on('snapshot', (snapshot) => {
      report(snapshot);
    })
    .on('version', (version) => {
      callback().then((messageData) => {
  
        if (
          messageData && //neccesary validations to prevent errors
          messageData.data &&
          messageData.data.allMessages.data &&
          messageData.data.allMessages
        ) {
          secondCallback(messageData.data.allMessages.data);
        }
        // }
      });
      report(version);
    })
    .on('error', (error) => {
      stream.close();
      setTimeout(startStream, 1000);
    })
    .start();
};

function Chatbox(props) {
  const username = localStorage.username;
  /**
  const CreateMessage = gql`
    mutation CreateMessage($data: MessagesInput!) {
      createMessages(data: $data) {
        _id
        text
        from
      }
    }
  `;
   */
  // const [createMessage] = useMutation(CreateMessage, {
  //   onCompleted: (data) => {
  //     setMessages((messages) => [...messages, data.createMessages]);
  //     console.log(data);
  //   },
  // });

  // Get all messages
  const GetAllMessages = /**GraphQL */ gql`
    query {
      allMessages {
        data {
          _id
          text
          from
        }
      }
    }
  `;

  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  function onSubmit(e) {
    e.preventDefault();
    const username = localStorage.getItem('username'); // username saved in localStorage
    const createP = client.query(
      Do(
        Create(Collection('Messages'), {
          data: {
            from: username,
            text,
            chatRoomRef,
          },
        }),
        Update(chatRoomRef, {})
      )
    );
    createP
      .then(() => {})
      .catch((e) => {
        console.error(e);
      });
    setText(''); // reset input field
  }

  const { data: allMessagesData, error, refetch } = useQuery(GetAllMessages);

  useEffect(() => {
    startStream(refetch, setMessages);

    if (
      allMessagesData &&
      allMessagesData.allMessages &&
      allMessagesData.allMessages.data
    ) {
      setMessages(allMessagesData.allMessages.data);
    } else {
      console.error(error);
    }

    try {
    } catch (e) {
      console.log(e);
    }
  }, [allMessagesData, error, refetch]);
  const chatBubleList = messages.map(({ _id: id, text, from }) => (
    <ChatBubble
      key={id}
      from={from}
      text={text}
      date="21-11-2020"
      mine={username === from}
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

function ChatBubble({ from, text, date, mine }) {
  const fromMe = `${mine ? 'marginLeft' : 'marginRight'}`;
  return (
    <div
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        [fromMe]: 'auto',
        background: 'yellow',
        width: '50%',
        borderRadius: '20px',
        textAlign: 'left',
        padding: '10px',
      }}
    >
      <header>From:{from}</header>
      <div>{text}</div>
    </div>
  );
}
export default Chatbox;
