import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions';
import { Platform, Alert } from 'react-native';

const permissionType = Platform.select({
  ios: [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
  android: [PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
});

export const checkPermissionStatus = () => {
  const permissionParam = [];
  permissionType.map((item, index) => {
    permissionParam.push(check(item));
  });

  Promise.all(permissionParam).then((results) => {
    const permissionsToRequest = [];
    const blockedPermssions = [];
    results.map((item, index) => {
      if (item === RESULTS.DENIED) {
        permissionsToRequest.push(permissionType[index]);
      } else if (item === RESULTS.BLOCKED) {
        blockedPermssions.push(permissionType[index]);
      }
    });
    if (blockedPermssions.length > 0) {
      let permissionString = '';
      blockedPermssions.map((item, index) => {
        permissionString += item + ',\n';
      });

      Alert.alert(
        'Permissions Required!',
        'Listed below are the permission required to use app features. Please enable persmission(s) from settings.\n\n' +
          permissionString,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              openSettings();
            },
          },
        ],
        { cancelable: false },
      );
    } else if (permissionsToRequest.length > 0) {
      requestPermissions(permissionsToRequest).then((results) => {
        console.log(
          'PermissionManager',
          'checkPermissionStatus',
          'requestPermissions-then',
          results,
        );
      });
    }
  });
};

export const requestPermissions = async (permissionsToRequest: any) => {
  console.log('PermissionManager', 'checkPermissionStatus', permissionsToRequest);
  const permissionsStatus = [];
  for (let index = 0; index < permissionsToRequest.length; index++) {
    const item = permissionsToRequest[index];

    permissionsStatus.push(await request(item));
  }

  return permissionsStatus;
};

export default {
  checkPermissionStatus,
};
