import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {colors} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {API_URL} from '@env';
import CheckBox from '@react-native-community/checkbox';
import {connect, useSelector} from 'react-redux';
import {
  deleteCart,
  increaseQuantity,
  decreaseQuantity,
  addToCheckout,
  clearCart,
  clearCheckout,
  pickCart,
} from '../../../utils/redux/action/cartAction';
import Kosong from '../../../assets/images/empty-cart.png';
// import axios from 'axios';
// import {API_URL} from '@env';

const BagScreen = ({
  navigation,
  cart,
  deleteCart,
  decreaseQuantity,
  increaseQuantity,
  addToCheckout,
  clearCart,
  pickCart,
}) => {
  const pick = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.authReducer.token);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  if (pick.length !== 0) {
    pick.map((item) =>
      console.log('CHECK', pick.indexOf(item) + ' ' + item.pick),
    );
  }

  const sendData = () => {
    let invoice = Math.floor(Math.random() * 100001) + 1;
    let productId = cart
      .filter((item) => item.pick === true)
      .map((item) => {
        return {
          product_id: item.id,
          product_qty: item.qty,
          sub_total_item: item.qty * item.prc,
        };
      });
    console.log('ITEM DI PICK', productId);

    const kirim = {
      item: productId,
      transaction_code: invoice,
    };

    // axios
    //   .post(`${API_URL}/orders`, kirim, {
    //     headers: {
    //       'x-access-token': 'Bearer ' + (await AsyncStorage.getItem('token')),
    //     },
    //   })
    //   .then((res) => {
    //     console.log('Success', kirim);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    addToCheckout({kirim});
  };

  useEffect(() => {
    let items = 0;
    let prices = 0;

    cart.forEach((item) => {
      if (item.pick) {
        items += item.qty;
        prices += item.qty * item.prc;
      }
      console.log('TOTAL', totalItems);
    });
    setTotalItems(items);
    setTotalPrice(prices);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.bag}>My Bag</Text>
        {/* Card */}
        {cart.length ? (
          cart.map((item) => {
            return (
              <View style={styles.bag2} key={item.id}>
                <CheckBox
                  disabled={false}
                  tintColors={{true: '#DB3022', false: '#9B9B9B'}}
                  value={item.pick}
                  onChange={() => pickCart(item.id)}
                  style={{marginTop: 50}}
                />
                <Image
                  // source={require('../../../assets/images/home3.png')}
                  source={{uri: `${item.img}`}}
                  resizeMode="contain"
                  style={{
                    borderRadius: 10,
                    width: 110,
                    height: 130,
                    // width: '20%',
                    backgroundColor: 'white',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginHorizontal: 10,
                    marginTop: 5,
                  }}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{width: '60%'}}>{item.name}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            Alert.alert(
                              'Delete',
                              'Are you sure to delete item in the bag?',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'OK',
                                  onPress: () => deleteCart(item.id),
                                },
                              ],
                              {cancelable: false},
                            )
                          }>
                          <Icon name="delete" size={25} color={colors.red} />
                        </TouchableOpacity>
                      </View>
                      <View style={{flexDirection: 'row', marginTop: 7}}>
                        <Text>Color: {item.color}</Text>
                        <Text style={{marginLeft: 5}}>
                          Sizes: {item.ukuran}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      // marginTop: 20,
                      alignContent: 'center',
                      // width:'90%'
                      // justifyContent: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        // width: '70%'
                      }}>
                      {item.qty === 1 ? (
                        <TouchableOpacity style={styles.pickSize}>
                          <Icon name="minus" size={20} color={colors.black} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={styles.pickSize}>
                          <Icon
                            name="minus"
                            size={20}
                            color={colors.black}
                            onPress={() => decreaseQuantity(item.id)}
                          />
                        </TouchableOpacity>
                      )}
                      <Text
                        children={item.qty}
                        size="l"
                        style={{marginHorizontal: 4}}
                      />
                      <TouchableOpacity style={styles.pickSize}>
                        <Icon
                          name="plus"
                          size={20}
                          color={colors.black}
                          onPress={() => increaseQuantity(item.id)}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        marginTop: 30,
                        marginLeft: 35,
                        paddingBottom: 30,
                      }}>
                      <Text>{`Rp${(item.prc * item.qty).toLocaleString(
                        'id-ID',
                      )}`}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.empty}>
            <Image
              source={Kosong}
              style={{width: 150, height: 150, alignSelf: 'center'}}
            />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 34,
              }}>
              (MY BAG IS EMPTY)
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottom}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 25,
          }}>
          <Text>Total Amount:</Text>
          <Text>Rp.{totalPrice.toLocaleString('id-ID')}</Text>
        </View>

        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DB3022"
          onPress={() => {
            if (cart.length === 0 && totalItems === 0) {
              return Alert.alert(
                'Bag',
                'Blanja dulu skuy!',
                [
                  {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home'),
                  },
                ],
                {cancelable: true},
              );
            } else if (totalItems === 0 && cart.length !== 0) {
              return Alert.alert(
                'Bag',
                'Please Select your item',
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('Pressed OK'),
                  },
                ],
                {cancelable: true},
              );
            }
            navigation.navigate(
              'CheckOut',
              sendData(),
              totalPrice,
              clearCart(),
            );
          }}
          style={styles.button}>
          <Text>CheckOut</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 15,
  },

  bag: {
    marginTop: 50,
    fontSize: 34,
    fontWeight: 'bold',
  },

  bag2: {
    backgroundColor: '#ffffff',
    // elevation: 10,
    marginTop: 30,
    width: '100%',
    height: 130,
    borderRadius: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  circle: {
    // position: 'absolute',
    // bottom: 10,
    // left: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginRight: 9,
    elevation: 10,
  },

  bottom: {
    width: '100%',
    height: 155,
    backgroundColor: 'white',
    elevation: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 15,
    marginTop: 10,
    // position: 'absolute',
    bottom: 0,
  },

  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    // border: 'none',
    // width: 160,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    // marginLeft: 10,
    width: '100%',
  },
  pickSize: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: 75,
    // overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
  },
  empty: {
    marginVertical: '30%',
  },
});

const mapStateToProps = (state) => {
  console.log('LALAL', state.cart.cart);
  return {
    cart: state.cart.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCart: (id) => dispatch(deleteCart(id)),
    clearCart: () => dispatch(clearCart()),
    clearCheckout: () => dispatch(clearCheckout()),
    increaseQuantity: (id) => dispatch(increaseQuantity(id)),
    decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
    pickCart: (id) => dispatch(pickCart(id)),
    addToCheckout: ({kirim}) => dispatch(addToCheckout({kirim})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BagScreen);

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   Image,
//   TouchableHighlight,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {colors} from '../../../utils';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import CheckBox from '@react-native-community/checkbox';
// import {connect, useSelector} from 'react-redux';
// import {
//   deleteCart,
//   increaseQuantity,
//   decreaseQuantity,
//   addToCheckout,
//   clearCart,
//   clearCheckout,
//   pickCart,
// } from '../../../utils/redux/action/cartAction';
// import Kosong from '../../../assets/images/empty-cart.png';
// // import axios from 'axios';
// // import {API_URL} from '@env';

// const BagScreen = ({
//   navigation,
//   cart,
//   deleteCart,
//   decreaseQuantity,
//   increaseQuantity,
//   addToCheckout,
//   clearCart,
//   pickCart,
// }) => {
//   const pick = useSelector((state) => state.cart.cart);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalItems, setTotalItems] = useState(0);

//   if (pick.length !== 0) {
//     pick.map((item) =>
//       console.log('CHECK', pick.indexOf(item) + ' ' + item.pick),
//     );
//   }

//   const sendData = () => {
//     let invoice = Math.floor(Math.random() * 100001) + 1;
//     let productId = cart
//       .filter((item) => item.pick === true)
//       .map((item) => {
//         return {
//           product_id: item.id,
//           product_qty: item.qty,
//           sub_total_item: item.qty * item.prc,
//         };
//       });
//     console.log('ITEM DI PICK', productId);

//     const kirim = {
//       item: productId,
//       transaction_code: invoice,
//     };

//     // axios
//     //   .post(`${API_URL}/orders`, kirim, {
//     //     headers: {
//     //       'x-access-token': 'Bearer ' + (await AsyncStorage.getItem('token')),
//     //     },
//     //   })
//     //   .then((res) => {
//     //     console.log('Success', kirim);
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//     addToCheckout({kirim});
//   };

//   useEffect(() => {
//     let items = 0;
//     let prices = 0;

//     cart.forEach((item) => {
//       if (item.pick) {
//         items += item.qty;
//         prices += item.qty * item.prc;
//       }
//       console.log('TOTAL', totalItems);
//     });
//     setTotalItems(items);
//     setTotalPrice(prices);
//   }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

//   return (
//     <>
//       <ScrollView style={styles.container}>
//         <Text style={styles.bag}>My Bag</Text>
//         {/* Card */}
//         {cart.length ? (
//           cart.map((item) => {
//             return (
//               <View style={styles.bag2} key={item.id}>
//                 <CheckBox
//                   disabled={false}
//                   tintColors={{true: '#DB3022', false: '#9B9B9B'}}
//                   value={item.pick}
//                   onChange={() => pickCart(item.id)}
//                   style={{marginTop: 50}}
//                 />
//                 <Image
//                   // source={require('../../../assets/images/home3.png')}
//                   source={{uri: `${item.img}`}}
//                   resizeMode="contain"
//                   style={{
//                     borderRadius: 10,
//                     width: 110,
//                     height: 130,
//                     // width: '20%',
//                     backgroundColor: 'white',
//                   }}
//                 />
//                 <View
//                   style={{
//                     flexDirection: 'column',
//                     marginHorizontal: 10,
//                     marginTop: 5,
//                   }}>
//                   <View>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                       }}>
//                       <View>
//                         <Text>{item.name}</Text>
//                         <View style={{flexDirection: 'row', marginTop: 7}}>
//                           <Text>Color: grey</Text>
//                           <Text style={{marginLeft: 5}}>
//                             Sizes: {item.size}
//                           </Text>
//                         </View>
//                       </View>
//                       <TouchableOpacity
//                         onPress={() =>
//                           Alert.alert(
//                             'Delete',
//                             'Are you sure to delete item in the bag?',
//                             [
//                               {
//                                 text: 'Cancel',
//                                 onPress: () => console.log('Cancel Pressed'),
//                                 style: 'cancel',
//                               },
//                               {
//                                 text: 'OK',
//                                 onPress: () => deleteCart(item.id),
//                               },
//                             ],
//                             {cancelable: false},
//                           )
//                         }>
//                         <Icon name="delete" size={30} color={colors.red} />
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       marginTop: 20,
//                       alignContent: 'center',
//                       justifyContent: 'center',
//                     }}>
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                       }}>
//                       {item.qty === 1 ? (
//                         <TouchableOpacity style={styles.pickSize}>
//                           <Icon name="minus" size={20} color={colors.black} />
//                         </TouchableOpacity>
//                       ) : (
//                         <TouchableOpacity style={styles.pickSize}>
//                           <Icon
//                             name="minus"
//                             size={20}
//                             color={colors.black}
//                             onPress={() => decreaseQuantity(item.id)}
//                           />
//                         </TouchableOpacity>
//                       )}
//                       <Text
//                         children={item.qty}
//                         size="l"
//                         style={{marginHorizontal: 4}}
//                       />
//                       <TouchableOpacity style={styles.pickSize}>
//                         <Icon
//                           name="plus"
//                           size={20}
//                           color={colors.black}
//                           onPress={() => increaseQuantity(item.id)}
//                         />
//                       </TouchableOpacity>
//                     </View>
//                     <View
//                       style={{
//                         marginTop: 30,
//                         marginLeft: 80,
//                         paddingBottom: 30,
//                       }}>
//                       <Text>{`Rp${(item.prc * item.qty).toLocaleString(
//                         'id-ID',
//                       )}`}</Text>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             );
//           })
//         ) : (
//           <View style={styles.empty}>
//             <Image
//               source={Kosong}
//               style={{width: 150, height: 150, alignSelf: 'center'}}
//             />
//             <Text
//               style={{
//                 textAlign: 'center',
//                 fontWeight: 'bold',
//                 fontSize: 34,
//               }}>
//               (MY BAG IS EMPTY)
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//       <View style={styles.bottom}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             marginTop: 25,
//           }}>
//           <Text>Total Amount:</Text>
//           <Text>Rp.{totalPrice.toLocaleString('id-ID')}</Text>
//         </View>

//         <TouchableHighlight
//           activeOpacity={0.6}
//           underlayColor="#DB3022"
//           onPress={() => {
//             if (cart.length === 0 && totalItems === 0) {
//               return Alert.alert(
//                 'Bag',
//                 'Blanja dulu skuy!',
//                 [
//                   {
//                     text: 'OK',
//                     onPress: () => navigation.navigate('Home'),
//                   },
//                 ],
//                 {cancelable: true},
//               );
//             } else if (totalItems === 0 && cart.length !== 0) {
//               return Alert.alert(
//                 'Bag',
//                 'Please Select your item',
//                 [
//                   {
//                     text: 'OK',
//                     onPress: () => console.log('Pressed OK'),
//                   },
//                 ],
//                 {cancelable: true},
//               );
//             }
//             navigation.navigate('CheckOut', sendData(), clearCart(), totalPrice);
//           }}
//           style={styles.button}>
//           <Text>CheckOut</Text>
//         </TouchableHighlight>
//       </View>
//     </>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     backgroundColor: '#e5e5e5',
//     paddingHorizontal: 15,
//   },

//   bag: {
//     marginTop: 50,
//     fontSize: 34,
//     fontWeight: 'bold',
//   },

//   bag2: {
//     backgroundColor: '#ffffff',
//     // elevation: 10,
//     marginTop: 30,
//     width: '100%',
//     height: 130,
//     borderRadius: 10,
//     flexDirection: 'row',
//     // justifyContent: 'space-between',
//   },

//   circle: {
//     // position: 'absolute',
//     // bottom: 10,
//     // left: 5,
//     backgroundColor: 'white',
//     borderRadius: 30,
//     borderWidth: 1,
//     borderColor: 'black',
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 25,
//     marginRight: 9,
//     elevation: 10,
//   },

//   bottom: {
//     width: '100%',
//     height: 155,
//     backgroundColor: 'white',
//     elevation: 10,
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//     paddingHorizontal: 15,
//     marginTop: 10,
//     // position: 'absolute',
//     bottom: 0,
//   },

//   button: {
//     backgroundColor: 'white',
//     borderRadius: 50,
//     borderWidth: 1,
//     borderColor: 'black',
//     // border: 'none',
//     // width: 160,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 25,
//     // marginLeft: 10,
//     width: '100%',
//   },
//   pickSize: {
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 2,
//     borderRadius: 75,
//     // overflow: 'hidden',
//     backgroundColor: 'white',
//     borderWidth: 2,
//     borderColor: 'black',
//   },
//   empty: {
//     marginVertical: '30%',
//   },
// });

// const mapStateToProps = (state) => {
//   console.log('LALAL', state.cart.cart);
//   return {
//     cart: state.cart.cart,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteCart: (id) => dispatch(deleteCart(id)),
//     clearCart: () => dispatch(clearCart()),
//     clearCheckout: () => dispatch(clearCheckout()),
//     increaseQuantity: (id) => dispatch(increaseQuantity(id)),
//     decreaseQuantity: (id) => dispatch(decreaseQuantity(id)),
//     pickCart: (id) => dispatch(pickCart(id)),
//     addToCheckout: ({kirim}) => dispatch(addToCheckout({kirim})),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BagScreen);
