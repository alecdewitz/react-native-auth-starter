import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { DefaultTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, RefreshControl, View } from 'react-native';
import { useToastBannerToggler } from 'react-native-toast-banner';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { defaultImage } from '../../common/defaultImage';
import { Button, Text } from '../../components';
import Card from '../../components/Card';
import tw from '../../helpers/tailwind';
import { wait } from '../../helpers/utils';
import { getFlatCurrentUser } from '../../store/selectors';
import { normalize } from '../../utils/size';

const styles = {
  coverImage: { width: '100%', height: '100%' },
};

const Account = ({ navigation, route }) => {
  const { showBanner, hideBanner } = useToastBannerToggler();

  const { user: passedUser } = route?.params ?? {};
  const currentUser: any = useSelector(getFlatCurrentUser);

  const [user, setUser] = React.useState(passedUser || currentUser);
  const [refreshing, setRefreshing] = React.useState(false);

  const isMe = user.id === currentUser.id;

  useEffect(() => {
    // get profile info
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const image = user.image
    ? user.image.indexOf('https') > -1
      ? user.image
      : `http://localhost:8080${user.image}`
    : null;
  console.log('profile', user);

  return (
    <ParallaxScroll
      renderHeader={({ animatedValue }) => (
        <View style={{ backgroundColor: '#ffffff', width: '100%', height: '100%' }}></View>
      )}
      fadeOutParallaxBackground={true}
      style={{ backgroundColor: DefaultTheme.colors.background, flex: 1 }}
      renderParallaxBackground={({ animatedValue }) => (
        <Image style={styles.coverImage} source={{ uri: image || defaultImage }} />
      )}
      isHeaderFixed={true}
      parallaxBackgroundScrollSpeed={5}
      parallaxForegroundScrollSpeed={2.5}
      parallaxHeight={550}
      isBackgroundScalable={true}
      backgroundScale={1.2}
      backgroundScaleOrigin={'top'}
      refreshControl={
        <RefreshControl refreshing={refreshing} style={{ opacity: 1 }} onRefresh={onRefresh} />
      }>
      <View
        style={{
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -20 },
          shadowRadius: 14,
          shadowOpacity: 0.1,
          backgroundColor: '#fff',
          flex: 1,
          borderTopRightRadius: normalize(20),
          borderTopLeftRadius: normalize(20),
          paddingHorizontal: normalize(14),
          paddingVertical: normalize(10),
          marginTop: normalize(-20),
        }}>
        <View style={{}}>
          <Text h1 bold>
            {user.name}
          </Text>
          <Text h4 bold>
            {user.gender}
          </Text>
        </View>
        <View style={{ marginBottom: normalize(24) }}>
          <Button
            onPress={() => {
              showBanner({
                contentView: (
                  <Text style={{ paddingHorizontal: normalize(16), color: '#fff' }} h4 bold>
                    👋 You waved at {user.name}!
                  </Text>
                ),
                backgroundColor: tw.color('green-500'),
                duration: 5000,
                onPress: () => {
                  console.log('banner pressed');
                  // hideBanner(); // when specifying 'disableHideOnPress: true'
                },
                disableHideOnPress: true,
              });
            }}
            variant="blue">
            <Text bold style={{ color: '#ffffff', fontSize: normalize(18) }}>
              Wave
            </Text>
          </Button>
        </View>

        {/* BIO */}
        <View style={{ marginBottom: normalize(24) }}>
          <Card style={tw`relative`}>
            <View style={tw`flex flex-row items-center mb-2`}>
              <Icon name="pencil" size={24} style={tw`mr-1`} />
              <Text h3 bold>
                Bio
              </Text>
              {isMe && (
                <Button
                  style={[tw`absolute right-0 -mr-2`]}
                  variant="blue"
                  onPress={() => {
                    // setCharCount(currentUser?.profile?.bio?.length || 0);
                    // setShowBioModal(true);
                  }}>
                  <Text style={{ color: '#fff' }} bold>
                    Edit
                  </Text>
                </Button>
              )}
            </View>
            <Text style={`whitespace-pre-wrap`}>
              {user.bio || <Text style={tw`text-gray-500`}>No bio yet</Text>}
            </Text>
          </Card>
        </View>

        {/* PETS */}
        <View style={{ marginBottom: normalize(24) }}>
          <Card style={tw`relative`}>
            <View style={tw`flex flex-row items-center mb-2`}>
              <Icon name="pencil" size={24} style={tw`mr-1`} />
              <Text h3 bold>
                Pets
              </Text>
              {isMe && (
                <Button
                  style={[tw`absolute right-0 -mr-2`]}
                  variant="blue"
                  onPress={() => {
                    // setCharCount(currentUser?.profile?.bio?.length || 0);
                    // setShowBioModal(true);
                  }}>
                  <Text style={{ color: '#fff' }} bold>
                    Edit
                  </Text>
                </Button>
              )}
            </View>
            <Text style={`whitespace-pre-wrap`}>
              {user.pets || <Text style={tw`text-gray-500`}>No pets</Text>}
            </Text>
          </Card>
        </View>

        {/* HOUSING */}
        <View style={{ marginBottom: normalize(24) }}>
          <Card style={tw`relative`}>
            <View style={tw`flex flex-row items-center mb-2`}>
              <Icon name="pencil" size={24} style={tw`mr-1`} />
              <Text h3 bold>
                Housing
              </Text>
              {isMe && (
                <Button
                  style={[tw`absolute right-0 -mr-2`]}
                  variant="blue"
                  onPress={() => {
                    // setCharCount(currentUser?.profile?.bio?.length || 0);
                    // setShowBioModal(true);
                  }}>
                  <Text style={{ color: '#fff' }} bold>
                    Edit
                  </Text>
                </Button>
              )}
            </View>
            <Text style={`whitespace-pre-wrap`}>
              {user.pets || <Text style={tw`text-gray-500`}>No pets</Text>}
            </Text>

            <Card style={tw`relative`}>
              <View style={tw`flex flex-row items-center mb-2`}>
                <Icon name="pencil" size={24} style={tw`mr-1`} />
                <Text h3 bold>
                  Housing
                </Text>
                {isMe && (
                  <Button
                    style={[tw`absolute right-0 -mr-2`]}
                    variant="blue"
                    onPress={() => {
                      // setCharCount(currentUser?.profile?.bio?.length || 0);
                      // setShowBioModal(true);
                    }}>
                    <Text style={{ color: '#fff' }} bold>
                      Edit
                    </Text>
                  </Button>
                )}
              </View>
              <Text style={`whitespace-pre-wrap`}>
                {user.pets || <Text style={tw`text-gray-500`}>No pets</Text>}
              </Text>
            </Card>
          </Card>
        </View>
      </View>
    </ParallaxScroll>
  );
};

export default Account;
