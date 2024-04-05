import React from 'react';
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const style = {
  message: `flex items-center shadow-xl m-4 mt-0 py-2 px-2 rounded-tl-full rounded-tr-full hover:drop-shadow-2xl transition duration-300 ease-in-out`,
  name: `flex items-center pt-2 pl-8 text-xs pb-[0px]`,
  namesent: `flex flex-row-reverse items-center pt-2 pr-8 pb-[0px] text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full `,
  received: `bg-amber-400 text-black float-left text-start rounded-br-full`,
  system: `bg-pink-700 text-white float-left text-start rounded-br-full`,
  imgsent: 'mr-4 h-9 w-9 rounded-full ',
  imgrecvd: 'ml-4 h-9 w-9 rounded-full',
  datesent:'flex flex-row items-right pt-4 pl-4 pb-0 text-[12px] text-sky-200' ,
  daterecvd:'flex flex-row-reverse items-left pt-4 pr-4 pb-0 text-[12px] text-yellow-50' ,
};

const Message = ({ message ,user }) => {
  
  // const {text , uid , name , photoURL} = message.message
// console.log(message.text)

  let messageClass
  if(message.name === 'System')
  {
    messageClass = `${style.system}`
  }
  else{
  messageClass =
  message.uid === auth.currentUser.uid
  ? `${style.sent}`
  : `${style.received}` }

  const nameClass = 
  message.uid === auth.currentUser.uid
  ? `${style.namesent}`
  : `${style.name}`
  
  const imgClass = 
  message.uid === auth.currentUser.uid
  ? `${style.imgsent}`
  : `${style.imgrecvd}` 
  
  const dateClass = 
  message.uid === auth.currentUser.uid
  ? `${style.datesent}`
  : `${style.daterecvd}`

  // console.log(user)
  
  const  seconds  = message.timestamp;

  // Convert seconds to milliseconds for Date constructor
  const milliseconds = seconds * 1000;

  // Create a Date object from milliseconds
  const date = new Date(milliseconds);

  // Format the date to display only date and time
  const formattedDate = date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  

  return (
    <div>
      <div>
      <p className={`${nameClass}`}>{message.name}</p>
        <div className={`${style.message} ${messageClass}`}>
          <p className={`${dateClass}`}>{formattedDate}</p>
          <p>{message.text}</p>
          <img src={message.photoURL} alt="Profile Picture" className={`${imgClass}`}/>
        </div>
      
      </div>
    </div>
  );
};

export default Message;