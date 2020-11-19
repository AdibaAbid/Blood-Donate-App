import * as firebase from 'firebase'
import 'firebase/firestore';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const firebaseConfig = {
    apiKey: "AIzaSyCUVsUCvSDDKdbGLPUN4P82HVVubK2a-bo",
    authDomain: "blood-bank-app-42a00.firebaseapp.com",
    databaseURL: "https://blood-bank-app-42a00.firebaseio.com",
    projectId: "blood-bank-app-42a00",
    storageBucket: "blood-bank-app-42a00.appspot.com",
    messagingSenderId: "114870120047",
    appId: "1:114870120047:web:cbca0f6fa112e604f8e79a",
    measurementId: "G-6ZPJ3V5P7J"
  };

firebase.initializeApp(firebaseConfig);
 
const db = firebase.firestore();

function setUserInformation(user){
  return db.collection("userInfo").add(user)
}

 function getUserInformation(){
  return db.collection('userInfo').get()
}
function getAllDonors(){
  return db.collection('userInfo').get()
}
async function joinRoom(friendId){
  const userID= await SecureStore.getItemAsync('userID')
  try {
   let response =  await db.collection('chatrooms')
    .where('user1', '==', userID)
    .where('user2', '==', friendId)
    .get()
    let foundChatroom = false
    response.forEach(doc =>{
      console.log('dataaa of firease response>>>', doc.data())
      foundChatroom = {...doc.data(), id: doc.id}

    })

    if(foundChatroom) return foundChatroom

    response =  await db.collection('chatrooms')
    .where('user2', '==', userID)
    .where('user1', '==', friendId)
    .get()
    // let foundChatroom = false
    response.forEach(doc =>{
      console.log('dataaa of firease response>>>', doc.data())
      foundChatroom = {...doc.data(), id: doc.id}

    })
    
    if(foundChatroom) return foundChatroom
    return db.collection('chatrooms').add({
    user1: userID ,
    user2: friendId,
    timestamp: Date.now(),
  })
}catch(e){
  console.log(e.message)

}
}

async function sendMessageToDb(message, chatID){
  const userID= await SecureStore.getItemAsync('userID')
  db.collection('chatrooms').doc(chatID).collection('messages').add({
    message,
    userID: userID,
    timestamp: new Date()
  })
}

function getMessages(chatID){
  return db.collection('chatrooms').doc(chatID)
  .collection('messages').orderBy("timestamp").get()
}

export {
  firebase,
  setUserInformation,
  getUserInformation,
  getAllDonors,
  joinRoom,
  sendMessageToDb,
  getMessages
}