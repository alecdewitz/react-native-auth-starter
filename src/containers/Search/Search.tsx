import { DefaultTheme } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { default as FaIcon, default as Icon } from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { defaultImage } from '../../common/defaultImage';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { wait } from '../../helpers/utils';
import userService from '../../services/user.service';
import { setSearchFilters } from '../../store/actions/user';
import { RootState } from '../../store/reducers';
import { ChoiceType, ConnectionStatus, GenderProfile, Pet, WaveStatus } from '../../types';
import { normalize } from '../../utils/size';
// import { usePotentialConnectionStatus } from '../../helpers/usePotentialConnectionStatus';
// import { usePotentialFavorite } from '../../helpers/usePotentialFavorite';

const SearchCard = ({ user, navigation }) => {
  const dispatch = useDispatch();
  const potentialConnectionStatus = null; // usePotentialConnectionStatus(user);
  const potentialFavorite = null; // usePotentialFavorite(user);

  const viewProfile = (user, e?) => {
    // e.preventDefault();
    navigation.navigate('SearchProfile', { user });
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <View style={{ width: normalize(130), marginRight: normalize(10) }}>
          <Image
            style={{
              height: normalize(200),
            }}
            source={{
              uri: defaultImage,
            }}
          />

          <Text style={{ textAlign: 'center', marginVertical: 4, fontWeight: '600', fontSize: 10 }}>
            Search
          </Text>

          {potentialConnectionStatus === WaveStatus.SENT && (
            <View
              style={{
                backgroundColor: 'gray',
                paddingVertical: 4,
                borderRadius: 3,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 14,
                  color: 'yellow',
                }}>
                👋 Waved
              </Text>
            </View>
          )}
          {potentialConnectionStatus === WaveStatus.RECEIVED && (
            <View
              style={{
                backgroundColor: 'red',
                paddingVertical: 4,
                borderRadius: 3,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 14,
                  color: 'white',
                }}>
                👋 Wave back!
              </Text>
            </View>
          )}
          {potentialConnectionStatus === ConnectionStatus.IGNORED && (
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 4,
                borderRadius: 3,
                // border: '5px solid red',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 14,
                  color: 'red',
                }}>
                Passed
              </Text>
            </View>
          )}
          {potentialConnectionStatus === ConnectionStatus.ACCEPTED && (
            <View
              style={{
                backgroundColor: 'green',
                paddingVertical: 4,
                borderRadius: 3,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: 14,
                  color: 'white',
                }}>
                🎉 Connected
              </Text>
            </View>
          )}
        </View>

        <View style={styles.itemTextView}>
          <Text h3 bold>
            {user.name}
          </Text>

          <Text style={styles.itemText}>
            <View style={styles.itemTextIcon}>
              <FaIcon name="birthday-cake" size={12} color="#7c3aed" />
            </View>
            {user.age} years old
          </Text>

          <Text style={styles.itemText}>
            {GenderProfile[user.gender] === 'Male' && (
              <View style={styles.itemTextIcon}>
                <FaIcon name="mars" size={14} color="#2563eb" />
              </View>
            )}
            {GenderProfile[user.gender] === 'Female' && (
              <View style={styles.itemTextIcon}>
                <FaIcon name="venus" size={14} color="#fca5a5" />
              </View>
            )}
            {GenderProfile[user.gender] !== 'Male' && GenderProfile[user.gender] !== 'Female' && (
              <View style={styles.itemTextIcon}>
                <FaIcon name="transgender" size={14} color="#fcd34d" />
              </View>
            )}
            {GenderProfile[user.gender]}
          </Text>

          {!user.pets ||
          !user.pets.length ||
          user.pets[0] === Pet.NONE ||
          user.pets[0] === ChoiceType.WANTS ? (
            <Text style={styles.itemText}>
              <View style={styles.itemTextIcon}>
                <FaIcon name="ban" size={14} color="#dc2626" />
              </View>
              Does not have pets
            </Text>
          ) : (
            <Text style={styles.itemText}>
              <View style={styles.itemTextIcon}>
                <FaIcon name="paw" size={14} color="#92400e" />
              </View>
              Has pet(s)
            </Text>
          )}

          {user.hasHousing ? (
            <Text style={styles.itemText}>
              <View style={styles.itemTextIcon}>
                <FaIcon name="home" size={14} color="#f59e0b" />
              </View>
              Has an extra bedroom
            </Text>
          ) : (
            <Text style={styles.itemText}>
              <View style={styles.itemTextIcon}>
                <FaIcon name="home" size={14} color="#f59e0b" />
              </View>
              Looking for housing
            </Text>
          )}

          {user.hasHousing && user.preferences.wheelchairAcs && (
            <View style={styles.wheelChairItem}>
              <Text style={styles.wheelChairItemText}>Home is wheelchair accessible</Text>
            </View>
          )}
          {!user.hasHousing && user.preferences.wheelchairAcs && (
            <View style={styles.wheelChairItem}>
              <Text style={styles.wheelChairItemText}>Needs wheelchair accessibility</Text>
            </View>
          )}

          <Text style={styles.itemText}>BIO</Text>
          <Text style={styles.bio}>{user.bio ? user.bio : 'No bio yet'}</Text>
        </View>
      </View>

      <Button style={styles.button} variant="blue" onPress={(e) => viewProfile(user, e)}>
        <Text style={{ color: '#ffffff', fontSize: 16 }}>View Profile</Text>
      </Button>
    </View>
  );
};

let timeout;

const Search = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { searchFilters } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const fetchUsers = async (filters: any) => {
    if (currentUser?.profile?.location?.housing) {
      // if user has a place, set max distance to anywhere since filters are hidden
      filters.maxDistance = [50];
    }
    setLoading(true);
    try {
      const response = await userService.getUserList(filters);
      setUsers(response.data);
    } catch (error) {
      if (error.statusCode === 403) {
        console.error('You must unpause your account before you can search.');
      } else {
        throw new Error(error);
      }
    } finally {
      clearTimeout(timeout);
      timeout = setTimeout(() => setLoading(false), 400);
    }
  };

  useEffect(() => {
    fetchUsers(searchFilters);
  }, [searchFilters]);

  const onChangeFilters = (data: any) => {
    dispatch(setSearchFilters(data));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const viewProfile = (user, e) => {
    e.preventDefault();
    navigation.navigate('SearchProfile', { user });
  };

  const viewFilters = (e) => {
    e.preventDefault();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        refreshControl={
          <RefreshControl refreshing={refreshing} style={{ opacity: 100 }} onRefresh={onRefresh} />
        }
        style={styles.view}
        renderItem={({ item: user }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={(e) => viewProfile(user, e)}>
            <SearchCard user={user} navigation={navigation} />
          </TouchableOpacity>
        )}
        keyExtractor={(user) => user.id}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          zIndex: 1,
          position: 'absolute',
          bottom: 20,
          borderRadius: 50,
          backgroundColor: DefaultTheme.colors.primary,
          paddingVertical: normalize(8),
        }}
        onPress={(e) => {
          viewFilters(e);
        }}>
        <Text bold style={{ width: 150, color: 'white', textAlign: 'center' }}>
          Filters{'  '}
          <Icon name="filter" size={16} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    marginHorizontal: normalize(10),
    marginVertical: normalize(8),
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemInfo: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  itemTextView: { flexShrink: 1 },
  itemText: { fontSize: normalize(13), marginBottom: normalize(1) },
  wheelChairItem: {
    flex: 1,
    marginVertical: normalize(1),
    justifyContent: 'center',
    padding: normalize(4),
    color: 'white',
    backgroundColor: '#00A2FF',
    borderRadius: 12,
  },
  wheelChairItemText: { fontSize: normalize(12), color: 'white', fontWeight: '600' },
  itemTextIcon: {
    width: 18,
  },
  bio: { height: normalize(150), overflow: 'hidden', fontSize: normalize(12) },
  button: { backgroundColor: DefaultTheme.colors.primary },
  view: {
    paddingTop: normalize(8),
    paddingBottom: normalize(8),
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  favorite: {
    position: 'absolute',
    top: normalize(12),
    right: normalize(12),
  },
  favoriteIcon: {
    color: '#f5b942',
  },
});

export default Search;
