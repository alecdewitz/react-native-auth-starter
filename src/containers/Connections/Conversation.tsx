import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../components';
import { getCurrentUser } from '../../store/selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const Conversation = ({ route, navigation }) => {
  const { userId, name } = route.params;
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello!',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  useEffect(() => {
    navigation.setParams({ title: name });
  }, [name]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderDate = (date) => {
    return <Text style={{}}>{date}</Text>;
  };

  return (
    <GiftedChat
      messages={messages}
      listViewProps={{
        style: {
          backgroundColor: '#ffffff',
        },
      }}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Conversation;
