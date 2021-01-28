import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  DrawerLayoutAndroidComponent,
  InputAccessoryView,
} from 'react-native';
import {API_URL} from '@env';

const ShopScreen = ({navigation}) => {
  // const BASE_URL = 'http://192.168.1.10:2005';
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getDataCategory();
  }, []);

  const getDataCategory = () => {
    axios
      .get(`${API_URL}/categories`)
      .then((res) => {
        const category = res.data.data;
        console.log('Category', category);
        setCategory(category);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Catalog', {data: category})}>
          <Text style={{color: 'white'}}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>
        <Text style={{color: 'grey', fontSize: 16, marginTop: 30}}>
          Choose Category
        </Text>
        {category.map(({id_categories, category_name, id}) => {
          return (
            <View style={styles.garis} key={id_categories}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Cataloge', {
                    itemId: id_categories,
                    categories: category_name,
                  })
                }>
                <Text style={{fontSize: 16, marginHorizontal: 10}}>{category_name}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 15,
  },

  button: {
    width: '100%',
    height: 48,
    backgroundColor: 'red',
    // color: 'white',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 20,
  },

  garis: {
    borderBottomColor: '#9B9B9B',
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'center',
    marginTop: 10,
  },
});
