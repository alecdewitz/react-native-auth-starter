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
import tw from 'tailwind-react-native-classnames';
import Text from '../../components/Text';
import { wait } from '../../helpers/utils';
import { RootState } from '../../store/reducers';
import { normalize } from '../../utils/size';

const Item = ({ user, index, navigation }) => {
  const image = user.image
    ? user.image.indexOf('https') > -1
      ? user.image
      : `http://localhost:8080${user.image}`
    : 'https://profile-images-staging.sfo3.digitaloceanspaces.com/02d6abd82f306de095df12abfaa3eb5b';
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

const renderNoContent = ({ section }) => {
  console.log(section);
  if (section.data?.length == 0) {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: normalize(40),
          borderBottomWidth: normalize(1),
          borderBottomColor: '#ddd',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{ color: tw.color('gray-500') }}>
          {section.title === SectionType.WAVE_REQUESTS && 'No wave requests yet'}
          {section.title === SectionType.WAVES_SENT && 'No waves sent yet'}
        </Text>
      </View>
    );
  }
  return null;
};

const enum SectionType {
  WAVE_REQUESTS = 'Wave Requests',
  WAVES_SENT = 'Waves Sent',
}

const Waves = ({ navigation, incoming, outgoing, _onRefresh }) => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const [refreshing, setRefreshing] = useState(true);
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    setRefreshing(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <SectionList
      sections={[
        {
          title: SectionType.WAVE_REQUESTS,
          data: incoming || [],
        },
        {
          title: SectionType.WAVES_SENT,
          data: outgoing || [],
        },
      ]}
      renderSectionFooter={renderNoContent}
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} style={{ opacity: 100 }} onRefresh={onRefresh} />
      }
      keyExtractor={(item, index) => item + index}
      renderItem={({ item, index }) => {
        const user = item.initiatorId === currentUser.id ? item.receiver : item.initiator;
        return (
          <View style={styles.itemView}>
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate('ConnectionsAccount', {
                  user: { name: user.firstName, slug: user.slug, image: user.image },
                });
              }}>
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
  container: {
    // flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // marginHorizontal: 16,
  },
  itemView: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    backgroundColor: '#fff',
    padding: normalize(16),
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

export default Waves;
