import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Keyboard,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import MessageList from '../components/MessageList';

import Icon from '../assets/icons';
import CustomKeyboardView from '../components/CustomKeyboardView';
import {useAuth} from '../context/authContext';

import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import {db} from '../firebaseConfig';
import {useNavigation} from '@react-navigation/native';
import {getRoomId, hp, wp} from '../constants/common';
import ChatRoomHeader from '../components/ChatRoomHeader';
import {theme} from '../constants/theme';
import Input from '../components/Input';

export default function ChatRoom({route}) {
  const item = route.params.params; // second user
  const {user} = useAuth(); //currently logged in user
  const router = useNavigation();
  const [messages, setMessages] = useState([]);
  const textRef = useRef('');
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, 'rooms', roomId);
    const messageRef = collection(docRef, 'messages');
    let q = query(messageRef, orderBy('createdAt', 'asc'));

    let unsub = onSnapshot(q, snapShot => {
      let allMessages = snapShot.docs.map(doc => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      updateScrollView,
    );

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 100);
  };

  const createRoomIfNotExists = async () => {
    //roomId
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, 'rooms', roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleMessageSend = async () => {
    let message = textRef.current.trim();
    if (!message) return;
    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, 'rooms', roomId);
      const messageRef = collection(docRef, 'messages');
      textRef.current = '';
      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
      console.log('new message id:', newDoc.id);
    } catch (e) {
      Alert.alert('Message', e.message);
    }
  };
  return (
    <CustomKeyboardView inChat={true}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />

        <View
          style={{
            borderColor: theme.colors.gray,
            borderWidth: 0.3,
            marginTop: wp(2),
          }}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: theme.colors.white,
            overflow: 'visible',
          }}>
          <View style={{flex: 1}}>
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View style={{paddingBottom: hp(1.7), paddingTop: 3}}>
            <View style={styles.inputContainer}>
              <Input
              inputRef={inputRef}
                addIcon={<Icon name="send" size={26} strokeWidth={1.6} />}
                onPress={()=>handleMessageSend()}
                placeholder="Type message..."
                onChangeText={value => {
                  textRef.current = value;
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: wp(90),
    alignSelf: 'center',
    paddingHorizontal: wp(2),

    paddingBottom: wp(1.7),
  },
});
