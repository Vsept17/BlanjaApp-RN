import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
// import {API_URL} from '@env';
import {API_URL} from '@env';
import {log} from 'react-native-reanimated';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductSeller = ({navigation, route}) => {
  //   const {itemId} = route.params;
  const [product, setProduct] = useState([]);
  const token = useSelector((state) => state.authReducer.token);

  useEffect(() => {
    getProductsSeller();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductsSeller();
    });
    return unsubscribe;
  }, [navigation]);

  const getProductsSeller = () => {
    axios
      .get(`${API_URL}/products/user?keyword=created_at DESC`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const product = res.data.data;
        console.log('Anjim', product);
        setProduct(product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    Alert.alert(
      'Delete Product',
      'Are Sure Want Delete ?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const config = {
              headers: {
                'x-access-token': 'Bearer ' + token,
              },
            };
            await axios
              .delete(`${API_URL}/products/${id}`, config)
              .then((res) => console.log(res.data))
              .catch((err) => {
                console.log(err);
              });
            console.log('klick delete OK' + id);
            getProduct();
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={product}
        style={StyleSheet.gridView}
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UpdateProduct', {
                Itemid: item.id,
                Name: item.product_name,
                Category: item.category_id,
                Size: item.size_id,
                Color: item.color_id,
                Condition: item.condition_id,
                Price: item.product_price,
                Qty: item.product_qty,
                Desc: item.product_desc,
                Photo: item.product_photo,
                Status: item.status_product_id,
              })
            }>
            <View style={[styles.itemContainer]}>
              <Image
                source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
                style={{
                  borderRadius: 10,
                  width: '100%',
                  height: 170,
                }}
                resizeMode="contain"
              />
              <Text style={styles.itemName}>{item.product_name}</Text>
              <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  width: 80,
                  borderRadius: 10,
                  alignItems: 'center',
                  marginTop: 10,
                }}
                onPress={() => {
                  deleteProduct(item.id);
                }}>
                <Text style={{color: 'white'}}>delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
    marginTop: 90,
    marginBottom: 20,
  },
  itemName: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#000000',
  },
});

export default ProductSeller;

// import React, {useState, useEffect, createRef} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Button,
//   Image,
// } from 'react-native';
// import {FlatGrid} from 'react-native-super-grid';
// import axios from 'axios';
// import ActionSheet from 'react-native-actions-sheet';
// import {useSelector} from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {API_URL} from '@env';

// const ProductSeller = ({navigation, route}) => {
//   //   const {itemId} = route.params;
//   const [product, setProduct] = useState([]);
//   const token = useSelector((state) => state.authReducer.token);
//   console.log("product", product);
//   // console.log("search", isSearching);

//   useEffect(() => {
//     getProductsSeller();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getProductsSeller();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const getProductsSeller = () => {
//     axios
//       .get(`${API_URL}/products/user?keyword=created_at DESC`, {
//         headers: {
//           'x-access-token': 'Bearer ' + token,
//         },
//       })
//       .then((res) => {
//         const product = res.data.data;
//         console.log('Anjim', product);
//         setProduct(product);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <FlatGrid
//         itemDimension={130}
//         data={product}
//         style={StyleSheet.gridView}
//         spacing={10}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() =>
//               navigation.navigate('DetailProduct', {
//                 itemId: item.id,
//                 categories: item.category_name,
//               })
//             }>
//             <View style={[styles.itemContainer]}>
//               <Image
//                 source={{uri: `${JSON.parse(item.product_photo).shift()}`}}
//                 style={{
//                   borderRadius: 10,
//                   width: '100%',
//                   height: 170,
//                 }}
//                 resizeMode="contain"
//               />
//               <Text style={styles.itemName}>{item.product_name}</Text>
//               <Text style={styles.itemCode}>Rp.{item.product_price}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   gridView: {
//     marginTop: 10,
//     flex: 1,
//   },
//   itemContainer: {
//     justifyContent: 'flex-end',
//     borderRadius: 5,
//     padding: 10,
//     height: 150,
//     marginTop: 30,
//     marginBottom: 20,
//   },
//   itemName: {
//     fontSize: 16,
//     color: '#000000',
//     fontWeight: 'bold',
//   },
//   itemCode: {
//     fontWeight: '600',
//     fontSize: 12,
//     color: '#000000',
//   },
// });

// export default ProductSeller;
