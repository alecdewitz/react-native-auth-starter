import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import AppFonts from '../../assets/fonts';
import { getMyConnections } from '../../store/actions/connection';
import {
  getAcceptedConnections,
  getPendingIncomingWaves,
  getPendingOutgoingWaves,
} from '../../store/selectors';
import Colors from '../../themes/colors';
import { normalize } from '../../utils/size';
import Messages from './Messages';
import Waves from './Waves';

const styles = StyleSheet.create({
  tabContainer: {},
  tab: {
    fontSize: normalize(24),
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // paddingHorizontal: normalize(20),
  },
  content: {
    borderRadius: normalize(5),
    backgroundColor: Colors.white,
    padding: normalize(20),
  },
  code: {
    borderRadius: normalize(5),
    backgroundColor: Colors.offwhite,
    padding: normalize(20),
    marginBottom: normalize(20),
  },
  title: {
    marginBottom: normalize(20),
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
});

const Connections = ({ navigation }) => {
  const dispatch = useDispatch();
  // const connections: any = useSelector((state: RootState) => state.connections);
  const acceptedConnections: any = useSelector(getAcceptedConnections);
  const incomingPendingConnections: any = useSelector(getPendingIncomingWaves);
  const outgoingPendingConnections: any = useSelector(getPendingOutgoingWaves);

  useEffect(() => {
    dispatch(getMyConnections());
  }, []);

  return (
    <ScrollableTabView
      initialPage={0}
      style={styles.tabContainer}
      tabBarUnderlineStyle={{
        backgroundColor: '#000',
        borderWidth: 1,
        borderRadius: 25,
      }}
      tabBarTextStyle={{ fontSize: normalize(16), fontFamily: AppFonts.Poppins_Regular }}
      // tabBarPosition="overlayTop"
      renderTabBar={() => (
        <DefaultTabBar
          activeTextColor={'#000'}
          tabStyle={{ padding: normalize(10) }}
          backgroundColor="#fff"
        />
      )}>
      <Messages tabLabel="Messages" connections={acceptedConnections} navigation={navigation} />

      <Waves
        tabLabel="Requests"
        incoming={incomingPendingConnections}
        outgoing={outgoingPendingConnections}
        navigation={navigation}
      />
    </ScrollableTabView>
  );
};

export default Connections;
