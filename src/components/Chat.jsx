import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import SendMessage from './SendMessage';
import { auth, db } from '../firebase';
import { query, collection, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

const style = {
  main: `min-h-screen flex flex-col p-[10px] pt-[5.5rem] pb-[3.7rem] bg-gradient-to-br from-teal-200 to-yellow-200 `,
};

const Chat = ({user}) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const scrollRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    // return () => unsubscribe();
  // }, []);

  // useEffect(() => {
  //   if (user != null) {
  //     scroll.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages]);


  // Function to handle new user join
  const handleNewUserJoin = () => {
    // Get current user
    const currentUser = auth.currentUser;

    // Check if user is authenticated
    if (currentUser) {
      // Get user display name
      const { displayName } = currentUser;

      // Add message to Firestore indicating new user joined
      addDoc(collection(db, 'messages'), {
        text: `${displayName} has joined the chat.`,
        name: 'System', // Sender name for system messages
        photoURL  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLkNkJQhOW9WSXd4EUN3CTcpP7mSssgP0w6dR6iItKcQ&s',
        timestamp: serverTimestamp(),
      });
    }
  };

  // Add event listener for auth state changes
  const unsubscribeAuth = auth.onAuthStateChanged((user) => {
    // Check if a new user is logged in
    if (user) {
      handleNewUserJoin();
    }
  });

  // Cleanup function
  return () => {
    unsubscribe();
    unsubscribeAuth();
  };
}, []);


useEffect(() => {
  // Scroll to the latest message when messages state changes
  if (scrollRef.current) {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

  return (
    <>
      <main className={style.main} style={style.mainstyle}>
        {messages &&
          messages.map((message) => (
            <Message key={message.id} message={message} user={user}/>
          ))}
          <div ref={scrollRef}></div>
      </main>
      {/* Send Message Compoenent */}
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </>
  );
};

export default Chat;