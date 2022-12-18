import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {insertNewItem, queryAllItems, deleteItem} from '../database/allSchemas';
import {
  Button,
  CheckBox,
  Input,
  Text,
  Modal,
  Datepicker,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useToast} from 'react-native-toast-notifications';

const HomeScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    id: 0,
    creationDate: new Date(),
    done: false,
    title: '',
    location: '',
    deadline: new Date(),
    repeating: false,
  });

  const [items, setItems] = useState([]);
  const toast = useToast();

  const addNewItem = async () => {
    await setNewItem({
      ...newItem,
      creationDate: new Date(),
      id: Date.now(),
    });
    await insertNewItem(newItem);
    await setModalOpen(false);
    toast.show('Madde Eklendi', {
      type: 'success',
      placement: 'top',
      animationType: 'slide-in',
    });
  };

  const getAllItems = async () => {
    const items = await queryAllItems();
    setItems(items);
  };

  const deleteListItem = async id => {
    await deleteItem(id);
    toast.show('Madde Silindi', {
      type: 'danger',
      placement: 'top',
      animationType: 'slide-in',
    });
    getAllItems();
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const showDeleteAlert = id => {
    Alert.alert(
      'Dikkat!',
      'Maddeyi silmek istediğinize emin misiniz?',
      [
        {
          text: 'Hayır',
          onPress: () => console.log('Option 2 pressed'),
        },
        {
          text: 'Evet',
          onPress: () => deleteListItem(id),
        },
      ],
      {cancelable: false},
    );
  };

  const Item = item => {
    console.log('item', item.item);
    return (
      <View style={styles.itemContainer}>
        <View style={[styles.itemTopRow, {justifyContent: 'space-between'}]}>
          <View style={[styles.itemTopRow, {alignItems: 'center'}]}>
            <CheckBox
              checked={item.done}
              onChange={nextChecked => {}}></CheckBox>
            <Text style={styles.title}>{item.item.title}</Text>
          </View>
          <View style={styles.itemTopRow}>
            <TouchableOpacity
              onPress={() => {
                setModalOpen(true);
              }}>
              <Ionicons name="pencil" size={25} color="tomato" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={() => {
                showDeleteAlert(item.item.id);
              }}>
              <Ionicons name="trash" size={25} color="tomato" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.itemTopRow}>
          <Text style={styles.title}>
            Bitiş Tarihi: {new Date(item.item.deadline).toLocaleDateString()}
          </Text>
          <Text style={styles.title}>Konum: {item.item.location}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/images/backgroundPattern.png')}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text} category="h5">
            Bugün Neler Yapılacak?
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalOpen(true);
            }}>
            <Ionicons name="add-circle" size={30} color="tomato" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Modal visible={modalOpen}>
        <View style={styles.modal}>
          <Text style={styles.text} category="h4">
            Yeni Madde Ekle
          </Text>
          <Input
            placeholder="Başlık"
            value={newItem.title}
            onChangeText={nextValue =>
              setNewItem({...newItem, title: nextValue})
            }
          />
          <Input
            placeholder="Nerede Yapılacak?"
            value={newItem.location}
            onChangeText={nextValue =>
              setNewItem({...newItem, location: nextValue})
            }
          />
          <CheckBox
            checked={newItem.repeating}
            onChange={nextChecked =>
              setNewItem({...newItem, repeating: nextChecked})
            }>
            {`Tekrar ediyor mu?`}
          </CheckBox>
          <Datepicker
            style={{width: '100%'}}
            label="Bitiş Tarihi"
            date={newItem.deadline}
            onSelect={nextDate => setNewItem({...newItem, deadline: nextDate})}
          />
          <Button
            onPress={() => {
              addNewItem();
            }}
            style={styles.button}
            disabled={newItem.title != '' ? false : true}>
            Ekle
          </Button>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    height: Dimensions.get('screen').width - 33,
    width: Dimensions.get('screen').width - 33,
    padding: 23,
    borderRadius: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  itemContainer: {
    marginTop: 10,
    width: Dimensions.get('screen').width - 33,
    height: Dimensions.get('screen').height / 8,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: 'lightgrey',
    justifyContent: 'space-around',
  },
  itemTopRow: {
    flexDirection: 'row',
  },
  title: {
    marginLeft: 10,
  },
});
