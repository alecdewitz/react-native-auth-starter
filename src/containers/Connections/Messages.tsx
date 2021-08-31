import _ from 'lodash';
import { default as React, useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { defaultImage } from '../../common/defaultImage';
import Text from '../../components/Text';
import { wait } from '../../helpers/utils';
import { RootState } from '../../store/reducers';
import { normalize } from '../../utils/size';

const Item = ({ user, index, navigation }) => {
  const image = user.image
    ? user.image.indexOf('https') > -1
      ? user.image
      : `http://localhost:8080${user.image}`
    : defaultImage;
  return (
    <View style={styles.item}>
      <Image
        style={{
          width: normalize(50),
          height: normalize(50),
          borderRadius: normalize(30),
          marginRight: normalize(10),
        }}
        source={{
          uri: image,
        }}
      />
      <Text style={styles.title}>{user.firstName}</Text>
    </View>
  );
};

const Messages = ({ navigation, connections }) => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  console.log('current', currentUser);

  useEffect(() => {
    if (_.isArray(connections)) {
      setMessages([
        {
          title: 'Potential Roommates',
          data: connections,
        },
      ]);
    }
    setRefreshing(false);
  }, [connections]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SectionList
      sections={messages}
      contentContainerStyle={styles.scrollView}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item, index }: any) => {
        const user = item.initiatorId === currentUser.id ? item.receiver : item.initiator;
        return (
          <View style={styles.itemView}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Conversation', {
                  userId: user.id,
                  name: user.firstName,
                })
              }>
              <Item user={user} index={index} navigation={navigation} />
            </TouchableOpacity>
          </View>
        );
      }}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.headerView}>
          <Text style={styles.header}>{title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemView: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    paddingRight: normalize(16),
  },
  header: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    fontWeight: 'bold',
    padding: normalize(10),
    paddingTop: normalize(16),
    backgroundColor: '#fff',
  },
  headerView: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 20,
  },
  scrollView: {
    backgroundColor: '#eeeeee',
  },
});

export default Messages;
