import {
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  insertNewItem,
  queryAllItems,
  deleteItem,
  updateItem,
} from '../database/allSchemas';
import {
  Button,
  CheckBox,
  Input,
  Text,
  Modal,
  Datepicker,
} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      id: 0,
      creationDate: null,
      done: false,
      title: '',
      location: '',
      deadline: new Date(),
      repeating: false,
      items: [],
    };
  }

  addNewItem = () => {
    this.setState(
      {
        creationDate: new Date(),
        id: Date.now(),
      },
      () => {
        const newItem = {
          id: this.state.id,
          creationDate: this.state.creationDate,
          done: this.state.done,
          title: this.state.title,
          location: this.state.location,
          deadline: this.state.deadline,
          repeating: this.state.repeating,
        };
        insertNewItem(newItem);
        this.setState({
          modalOpen: false,
          id: 0,
          creationDate: new Date(),
          done: false,
          title: '',
          location: '',
          deadline: new Date(),
          repeating: false,
        });
        Toast.show({
          type: 'success',
          text1: 'Başarı',
          text2: 'Madde Eklendi',
        });
        this.getAllItems();
      },
    );
  };

  getAllItems = async () => {
    const items = await queryAllItems();
    this.setState({items});
  };

  updateListItem = async () => {
    try {
      const item = {
        id: this.state.id,
        creationDate: this.state.creationDate,
        done: this.state.done,
        title: this.state.title,
        location: this.state.location,
        deadline: this.state.deadline,
        repeating: this.state.repeating,
      };
      await updateItem(item);
      Toast.show({
        type: 'success',
        text1: 'Başarı',
        text2: 'Madde Güncellendi',
      });
      this.setState({
        modalOpen: false,
        id: 0,
        creationDate: new Date(),
        done: false,
        title: '',
        location: '',
        deadline: new Date(),
        repeating: false,
      });
      this.getAllItems();
    } catch (error) {
      console.error(error);
    }
  };
  async finishItem(item, check) {
    const updatedItem = {
      id: item.id,
      creationDate: item.creationDate,
      done: check,
      title: item.title,
      location: item.location,
      deadline: item.deadline,
      repeating: item.repeating,
    };
    await updateItem(updatedItem);
    if (check) {
      Toast.show({
        type: 'success',
        text1: 'Başarı',
        text2: 'Madde Tamamlandı!',
      });
    }
    this.setState({
      modalOpen: false,
      id: 0,
      creationDate: new Date(),
      done: false,
      title: '',
      location: '',
      deadline: new Date(),
      repeating: false,
    });
    this.getAllItems();
  }
  deleteListItem = async id => {
    await deleteItem(id);
    this.getAllItems();
    Toast.show({
      type: 'success',
      text1: 'Başarı',
      text2: 'Madde Silindi',
    });
  };

  componentDidMount() {
    this.getAllItems();
  }

  showDeleteAlert = id => {
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
          onPress: () => this.deleteListItem(id),
        },
      ],
      {cancelable: false},
    );
  };

  renderItem(item) {
    return (
      <View style={[styles.itemContainer, {opacity: item.done ? 0.2 : 1}]}>
        <View style={[styles.itemTopRow, {justifyContent: 'space-between'}]}>
          <View style={[styles.itemTopRow, {alignItems: 'center'}]}>
            <CheckBox
              checked={item.done}
              onChange={nextChecked => {
                this.finishItem(item, nextChecked);
              }}></CheckBox>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.itemTopRow}>
            <TouchableOpacity
              disabled={item.done}
              onPress={() => {
                this.setState(
                  {
                    id: item.id,
                    creationDate: item.creationDate,
                    done: item.done,
                    title: item.title,
                    location: item.location,
                    deadline: item.deadline,
                    repeating: item.repeating,
                  },

                  () => {
                    this.setState({modalOpen: true});
                  },
                );
              }}>
              <Ionicons name="pencil" size={25} color="tomato" />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={item.done}
              style={{marginLeft: 10}}
              onPress={() => {
                this.showDeleteAlert(item.id);
              }}>
              <Ionicons name="trash" size={25} color="tomato" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.itemTopRow}>
          <Text style={styles.title}>
            Bitiş Tarihi: {new Date(item.deadline).toLocaleDateString()}
          </Text>
          <Text style={styles.title}>Konum: {item.location}</Text>
        </View>
      </View>
    );
  }

  render() {
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
                this.setState({modalOpen: true});
              }}>
              <Ionicons name="add-circle" size={30} color="tomato" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.items}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
        <Modal
          backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}
          onBackdropPress={() => {
            this.setState({
              modalOpen: false,
              id: 0,
              creationDate: new Date(),
              done: false,
              title: '',
              location: '',
              deadline: new Date(),
              repeating: false,
            });
          }}
          visible={this.state.modalOpen}>
          <View style={styles.modal}>
            <Text style={styles.text} category="h4">
              {this.state.id !== 0 ? 'Maddeyi Güncelle' : 'Yeni Madde Ekle'}
            </Text>
            <Input
              placeholder="Başlık"
              value={this.state.title}
              onChangeText={nextValue =>
                this.setState({
                  title: nextValue,
                })
              }
            />
            <Input
              placeholder="Nerede Yapılacak?"
              value={this.state.location}
              onChangeText={nextValue =>
                this.setState({
                  location: nextValue,
                })
              }
            />
            <CheckBox
              checked={this.state.repeating}
              onChange={nextChecked =>
                this.setState({
                  repeating: nextChecked,
                })
              }>
              {`Tekrar ediyor mu?`}
            </CheckBox>
            <Datepicker
              style={{width: '100%'}}
              label="Bitiş Tarihi"
              date={this.state.deadline}
              onSelect={nextDate =>
                this.setState({
                  deadline: nextDate,
                })
              }
            />
            <Button
              onPress={() => {
                this.state.id !== 0 ? this.updateListItem() : this.addNewItem();
              }}
              style={styles.button}
              disabled={this.state.title != '' ? false : true}>
              {this.state.id !== 0 ? 'Güncelle' : 'Ekle'}
            </Button>
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}

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
