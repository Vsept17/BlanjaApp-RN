import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ButtonSubmit, Text} from '../../components';
import {colors} from '../../utils';
import {connect} from 'react-redux';
import {addToCart} from '../../utils/redux/action/cartAction';
import {API_URL} from '@env';

// const BASE_URL = 'http://192.168.1.10:2005';

const DetailProductScreen = ({navigation, route, addToCart}) => {
  const {itemId, item, categories} = route.params;
  const [product, setProduct] = useState({});
  const [cardTwo, setCardTwo] = useState([]);
  const [img, setImg] = useState([]);
  const [qty, setQty] = useState(1);
  const [warna, setWarna] = useState([]);
  const [color, setColor] = useState('');
  const [ukuran, setUkuran] = useState('');
  const [size, setSize] = useState([]);

  console.log('Color', color);
  console.log('Size', ukuran);

  const getProduct = async (itemId) => {
    await axios
      .get(`${API_URL}/products/${itemId}`)
      .then((res) => {
        const product = res.data.data;
        // console.log('Detail ', res.data.data);
        const image = res.data.data.product_photo;
        const images = JSON.parse(image);
        const quantity = res.data.data.product_qty;
        // console.log('QTY', res.data.data.product_qty);
        setQty(quantity);
        setProduct(product);
        setImg(images);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataPopular = () => {
    axios
      .get(`${API_URL}/products?keyword=rating DESC`)
      .then((res) => {
        const cardTwo = res.data.data.products;
        // console.log('DataPopular', cardTwo);
        setCardTwo(cardTwo);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getColor = () => {
    axios
      .get(`${API_URL}/colors`)
      .then((res) => {
        const colors = res.data.data;
        setWarna(colors);
        console.log('Warna', colors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSize = () => {
    axios
      .get(`${API_URL}/sizes`)
      .then((res) => {
        const sizes = res.data.data;
        setSize(sizes);
        console.log('Size', sizes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // code to run on component mount
    // console.log('semangat', itemId);
    getProduct(itemId);
    getDataPopular(itemId);
    getColor();
    getSize();
    // getProducts(item);
    // getDataCard();
  }, [itemId]);

  return (
    <>
      <ScrollView
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: 'white',
          borderRadius: 25,
        }}>
        <View style={styles.container}>
          <Image
            style={styles.img}
            // source={require('../../assets/images/detailproduct.jpeg')}
            // source={{
            //   uri: 'http://192.168.18.29:8007/image/1610299176962-image.jpg',
            // }}
            source={
              product.product_photo
                ? {
                    uri: `${JSON.parse(product.product_photo).shift()}`,
                    resizeMode: 'contain',
                  }
                : null
            }
            resizeMode="contain"
            // source={{uri: `${JSON.parse(product.product_photo).shift()}`}}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 10,
          }}>
          <View style={{marginBottom: 7}}>
            <Text
              children={product.product_name}
              size="l"
              style={{fontWeight: '700'}}
            />
            <Text children={product.category_name} color="gray" size="l" />
          </View>
          <View>
            <Text
              children={
                product.product_price
                  ? `Rp.${product.product_price.toLocaleString('id-ID')}`
                  : null
              }
              style={{fontWeight: '700'}}
              color="red"
              size="xl"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Icon name="star" size={20} color={colors.yellow} />
          <Text children={product.rating} color="gray" />
        </View>
        <View style={{marginBottom: 13}}>
          <Text children={product.product_desc} size="l" />
        </View>

        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text
                children="Color"
                size="l"
                style={{fontWeight: '700', marginLeft: 5}}
              />
              <ScrollView
              horizontal
                style={{flexDirection: 'row', width: '75%'}}>
                {warna.map(({id, color_hexa, color_name}) => {
                  return (
                    <TouchableOpacity
                      key={id}
                      onPress={() => setColor(color_name)}
                      style={{
                        width: 40,
                        height: 40,
                        marginHorizontal: 5,
                        borderRadius: 75,
                        backgroundColor:
                          color_name === color ? color_hexa : 'white',
                        borderWidth: 15,
                        borderColor: color_hexa,
                      }}></TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View style={{alignItems: 'flex-start'}}>
              <Text
                children="Size"
                style={{fontWeight: '700', marginLeft: 5}}
                size="l"
              />
              <ScrollView
              horizontal
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                }}>
                {size.map(({id, size}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 5,
                        borderRadius: 75,
                        backgroundColor: size === ukuran ? 'red' : 'white',
                        borderWidth: 1,
                        borderColor: 'red',
                      }}
                      key={id}
                      onPress={() => setUkuran(size)}>
                      <Text
                        children={size}
                        size="l"
                        style={{
                          marginHorizontal: 4,
                          color: size === ukuran ? 'white' : 'black',
                        }}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
        <View style={styles.separator}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Text
            children="You can also like this"
            size="xl"
            style={{fontWeight: '700'}}
          />
          <Text children="5 items" size="m" color="gray" />
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.slider}>
            {cardTwo.map(
              ({
                product_id,
                product_name,
                product_price,
                product_photo,
                category_name,
                rating,
                id,
              }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailProduct', {
                        itemId: id,
                        categories: category_name,
                      })
                    }
                    style={{paddingHorizontal: 10, marginBottom: 20}}
                    key={id}>
                    <View>
                      <Image
                        // source={require('../../../assets/images/home3.png')}
                        source={{uri: `${JSON.parse(product_photo).shift()}`}}
                        style={{borderRadius: 10, width: 120, height: 170}}
                      />
                      <View style={styles.rating}>
                        <Image
                          source={require('../../assets/images/Star.png')}
                        />

                        <Text children={rating} />
                      </View>
                      <Text children={product_name} />
                      <Text children={product_price} />
                    </View>
                  </TouchableOpacity>
                );
              },
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <View style={{bottom: 0, backgroundColor: 'white', width: '100%'}}>
        <ButtonSubmit
          // onPress={() => {
          //   addToCart(
          //     itemId,
          //     img[0],
          //     product.product_name,
          //     product.product_price,
          //   );
          // }}
          onPress={() =>
            navigation.navigate(
              'Bag',
              addToCart(
                itemId,
                img[0],
                product.product_name,
                product.product_price,
                qty,
                ukuran,
                color,
              ),
            )
          }
          bg="red"
          title="ADD TO CART"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  img: {
    height: 250,
    width: '100%',
    paddingVertical: 10,
  },
  pickColor1: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 75,
    // overflow: 'hidden',
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
  },
  pickColor2: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 75,
    // overflow: 'hidden',
    backgroundColor: '#D84242',
    borderWidth: 2,
    borderColor: 'white',
  },
  pickColor3: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 75,
    // overflow: 'hidden',
    backgroundColor: '#4290D8',
    borderWidth: 2,
    borderColor: 'white',
  },
  pickColor4: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 75,
    // overflow: 'hidden',
    backgroundColor: '#42D86C',
    borderWidth: 2,
    borderColor: 'white',
  },
  pickSize: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 75,
    // overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
  },
  separator: {
    marginVertical: 20,
    opacity: 0.5,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  rating: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },

  slider: {
    marginTop: 5,
    flexDirection: 'row',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id, img, name, prc, qty, ukuran, color) =>
      dispatch(addToCart(id, img, name, prc, qty, ukuran, color)),
  };
};
export default connect(null, mapDispatchToProps)(DetailProductScreen);

// import axios from 'axios';
// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {ButtonSubmit, Text} from '../../components';
// import {colors} from '../../utils';
// import {connect} from 'react-redux';
// import {addToCart} from '../../utils/redux/action/cartAction';
// import {API_URL} from '@env';

// // const BASE_URL = 'http://192.168.1.10:2005';

// const DetailProductScreen = ({navigation, route, addToCart}) => {
//   const {itemId, item, categories} = route.params;
//   const [product, setProduct] = useState({});
//   const [cardTwo, setCardTwo] = useState([]);
//   const [img, setImg] = useState([]);
//   const [qty, setQty] = useState(1);

//   const getProduct = async (itemId) => {
//     await axios
//       .get(`${API_URL}/products/${itemId}`)
//       .then((res) => {
//         const product = res.data.data;
//         // console.log('Detail ', res.data.data);
//         const image = res.data.data.product_photo;
//         const images = JSON.parse(image);
//         const quantity = res.data.data.product_qty;
//         // console.log('QTY', res.data.data.product_qty);
//         setQty(quantity);
//         setProduct(product);
//         setImg(images);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const getDataPopular = () => {
//     axios
//       .get(`${API_URL}/products?keyword=rating DESC`)
//       .then((res) => {
//         const cardTwo = res.data.data.products;
//         // console.log('DataPopular', cardTwo);
//         setCardTwo(cardTwo);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     // code to run on component mount
//     // console.log('semangat', itemId);
//     getProduct(itemId);
//     getDataPopular(itemId);
//     // getProducts(item);
//     // getDataCard();
//   }, [itemId]);

//   return (
//     <>
//       <ScrollView
//         style={{
//           paddingHorizontal: 10,
//           paddingVertical: 10,
//           backgroundColor: 'white',
//           borderRadius: 25,
//         }}>
//         <View style={styles.container}>
//           <Image
//             style={styles.img}
//             // source={require('../../assets/images/detailproduct.jpeg')}
//             // source={{
//             //   uri: 'http://192.168.18.29:8007/image/1610299176962-image.jpg',
//             // }}
//             source={
//               product.product_photo
//                 ? {
//                     uri: `${JSON.parse(product.product_photo).shift()}`,
//                     resizeMode: 'contain',
//                   }
//                 : null
//             }
//             resizeMode="contain"
//             // source={{uri: `${JSON.parse(product.product_photo).shift()}`}}
//           />
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             paddingTop: 10,
//           }}>
//           <View style={{marginBottom: 7}}>
//             <Text
//               children={product.product_name}
//               size="l"
//               style={{fontWeight: '700'}}
//             />
//             <Text children={product.category_name} color="gray" size="l" />
//           </View>
//           <View>
//             <Text
//               children={
//                 product.product_price
//                   ? `Rp.${product.product_price.toLocaleString('id-ID')}`
//                   : null
//               }
//               style={{fontWeight: '700'}}
//               color="red"
//               size="xl"
//             />
//           </View>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 10,
//           }}>
//           <Icon name="star" size={20} color={colors.yellow} />
//           <Text children={product.rating} color="gray" />
//         </View>
//         <View style={{marginBottom: 13}}>
//           <Text children={product.product_desc} size="l" />
//         </View>

//         <View>
//           <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//             <View>
//               <Text
//                 children="Color"
//                 size="l"
//                 style={{fontWeight: '700', marginLeft: 5}}
//               />
//               <View
//                 style={{flexDirection: 'row', justifyContent: 'space-between'}}>
//                 <TouchableOpacity style={styles.pickColor1}></TouchableOpacity>
//                 <TouchableOpacity style={styles.pickColor2}></TouchableOpacity>
//                 <TouchableOpacity style={styles.pickColor3}></TouchableOpacity>
//                 <TouchableOpacity style={styles.pickColor4}></TouchableOpacity>
//               </View>
//             </View>
//             <View style={{alignItems: 'flex-start'}}>
//               <Text
//                 children="Size"
//                 style={{fontWeight: '700', marginLeft: 5}}
//                 size="l"
//               />
//               <View>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}>
//                   <TouchableOpacity style={styles.pickSize}>
//                     <Icon name="minus" size={30} color={colors.black} />
//                   </TouchableOpacity>
//                   <Text
//                     children={product.size}
//                     size="l"
//                     style={{marginHorizontal: 4}}
//                   />
//                   <TouchableOpacity style={styles.pickSize}>
//                     <Icon name="plus" size={30} color={colors.black} />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//         <View style={styles.separator}></View>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             marginBottom: 10,
//           }}>
//           <Text
//             children="You can also like this"
//             size="xl"
//             style={{fontWeight: '700'}}
//           />
//           <Text children="5 items" size="m" color="gray" />
//         </View>
//         <View>
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             style={styles.slider}>
//             {cardTwo.map(
//               ({
//                 product_id,
//                 product_name,
//                 product_price,
//                 product_photo,
//                 category_name,
//                 rating,
//                 id,
//               }) => {
//                 return (
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate('DetailProduct', {
//                         itemId: id,
//                         categories: category_name,
//                       })
//                     }
//                     style={{paddingHorizontal: 10, marginBottom: 20}}
//                     key={id}>
//                     <View>
//                       <Image
//                         // source={require('../../../assets/images/home3.png')}
//                         source={{uri: `${JSON.parse(product_photo).shift()}`}}
//                         style={{borderRadius: 10, width: 120, height: 170}}
//                       />
//                       <View style={styles.rating}>
//                         <Image
//                           source={require('../../assets/images/Star.png')}
//                         />

//                         <Text children={rating} />
//                       </View>
//                       <Text children={product_name} />
//                       <Text children={product_price} />
//                     </View>
//                   </TouchableOpacity>
//                 );
//               },
//             )}
//           </ScrollView>
//         </View>
//       </ScrollView>
//       <View style={{bottom: 0, backgroundColor: 'white', width: '100%'}}>
//         <ButtonSubmit
//           // onPress={() => {
//           //   addToCart(
//           //     itemId,
//           //     img[0],
//           //     product.product_name,
//           //     product.product_price,
//           //   );
//           // }}
//           onPress={() =>
//             navigation.navigate(
//               'Bag',
//               addToCart(
//                 itemId,
//                 img[0],
//                 product.product_name,
//                 product.product_price,
//                 qty,
//                 product.size,
//               ),
//             )
//           }
//           bg="red"
//           title="ADD TO CART"
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     backgroundColor: 'white',
//     borderRadius: 25,
//     borderStyle: 'solid',
//     borderWidth: 1,
//   },
//   img: {
//     height: 250,
//     width: '100%',
//     paddingVertical: 10,
//   },
//   pickColor1: {
//     width: 40,
//     height: 40,
//     marginHorizontal: 5,
//     borderRadius: 75,
//     // overflow: 'hidden',
//     backgroundColor: 'black',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   pickColor2: {
//     width: 40,
//     height: 40,
//     marginHorizontal: 5,
//     borderRadius: 75,
//     // overflow: 'hidden',
//     backgroundColor: '#D84242',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   pickColor3: {
//     width: 40,
//     height: 40,
//     marginHorizontal: 5,
//     borderRadius: 75,
//     // overflow: 'hidden',
//     backgroundColor: '#4290D8',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   pickColor4: {
//     width: 40,
//     height: 40,
//     marginHorizontal: 5,
//     borderRadius: 75,
//     // overflow: 'hidden',
//     backgroundColor: '#42D86C',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   pickSize: {
//     width: 40,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 5,
//     borderRadius: 75,
//     // overflow: 'hidden',
//     backgroundColor: 'white',
//     borderWidth: 2,
//     borderColor: 'white',
//   },
//   separator: {
//     marginVertical: 20,
//     opacity: 0.5,
//     borderBottomColor: 'gray',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },

//   rating: {
//     flexDirection: 'row',
//     marginTop: 6,
//     alignItems: 'center',
//   },

//   slider: {
//     marginTop: 5,
//     flexDirection: 'row',
//   },
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addToCart: (id, img, name, prc, qty, size) =>
//       dispatch(addToCart(id, img, name, prc, qty, size)),
//   };
// };
// export default connect(null, mapDispatchToProps)(DetailProductScreen);
