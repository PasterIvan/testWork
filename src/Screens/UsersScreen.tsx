import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {UserType} from '../types/stateTypes';
import FastImage from 'react-native-fast-image';
import {usersAPI} from '../api/usersApi';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UsersScreenProps} from '../types/navigationType';
import {GAP, IMAGE_SIZE, results} from '../constance';
import Modal from 'react-native-modal/dist/modal';

export const UsersScreen = ({navigation}: UsersScreenProps) => {
  const insets = useSafeAreaInsets();

  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [message, setMessage] = useState<string>('');

  const renderUsers: ListRenderItem<UserType> = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('User', {imageURL: item.picture.large});
        }}>
        <FastImage style={styles.image} source={{uri: item.picture.medium}} />
      </Pressable>
    );
  };

  const getUsers = useCallback(async () => {
    setIsRefreshing(true);
    setPage(1);
    try {
      const res = await usersAPI.getUsers({seed: 'abs', page, results});
      setUsers(res.data.results);
      setPage(prevState => prevState + 1);
    } catch (err) {
      setMessage(err.response.data);
      setIsError(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [users]);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await usersAPI.getUsers({seed: 'abs', page, results});
      setUsers(prevState => [...prevState, ...res.data.results]);
      setPage(prevState => prevState + 1);
    } catch (err) {
      setMessage(err.response.data);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [page, users]);

  const closeError = () => setIsError(false);

  useEffect(() => {
    (async () => {
      await getUsers();
    })();
  }, []);

  return (
    <View>
      <StatusBar barStyle={'dark-content'} />
      <FlatList
        data={users}
        contentContainerStyle={[
          styles.flatList,
          {paddingTop: insets.top + GAP, paddingBottom: insets.bottom},
        ]}
        renderItem={renderUsers}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapperStyle}
        keyExtractor={(item: UserType) => item?.id?.value}
        onEndReached={loadUsers}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          <View>{isLoading && <ActivityIndicator />}</View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={getUsers}
            colors={['#fff']} // for android
            tintColor={'#000'} // for ios
          />
        }
      />
      <Modal
        isVisible={isError}
        hasBackdrop={false}
        style={styles.modal}
        propagateSwipe={true}
        panResponderThreshold={1}
        swipeThreshold={50}
        swipeDirection={['down']}
        onSwipeComplete={closeError}>
        <View style={styles.container}>
          <View style={styles.mark}>
            <Text style={styles.markText}>!</Text>
          </View>
          <Text style={styles.message}>{message}</Text>
          <Pressable
            hitSlop={15}
            onPress={closeError}
            style={[styles.cross, styles.mark]}>
            <Text style={styles.markText}>X</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    gap: GAP,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  columnWrapperStyle: {
    gap: GAP,
    justifyContent: 'space-between',
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 10,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 15,
    backgroundColor: 'red',
    borderRadius: 5,
  },

  modal: {
    justifyContent: 'flex-end',
    marginBottom: 60,
  },

  cross: {
    position: 'absolute',
    top: -15,
    right: -10,
    backgroundColor: 'red',
  },

  mark: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    marginHorizontal: 10,
    marginRight: 0,
    marginVertical: 5,
  },

  markText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  message: {
    color: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '600',
  },
});
