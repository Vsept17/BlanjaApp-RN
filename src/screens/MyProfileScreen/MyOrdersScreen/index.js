import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from '../../../components/';
import axios from 'axios';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';

const MyOrders = ({navigation}) => {
  const token = useSelector((state) => state.authReducer.token);
  const [orders, setOrders] = useState([]);
  const getMyOrders = () => {
    axios
      .get(`${API_URL}/orders`, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        const getOrders = res.data.data;
        setOrders(getOrders);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMyOrders(orders);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text
        children="My Orders"
        size="xl3"
        style={{fontWeight: 'bold', marginBottom: 25}}
      />
      {orders.map(({id, transaction_code, total, user_id}) => {
        return (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('OrderDetails',{
              itemId: id,
              orderCode: transaction_code,
              total: total,
              user_id: user_id
            })}
            key={id}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  children="Order No. "
                  size="l"
                  type="Bold"
                  style={styles.textOrder}></Text>
                <Text
                  children={transaction_code}
                  size="m"
                  type="Bold"
                  style={styles.textOrder}
                />
              </View>
              <Text
                children="05-12-2019"
                size="m"
                color="gray"
                style={styles.textOrder}
              />
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  children="Tracking number: "
                  style={styles.textOrder}
                  color="gray"
                />
                <Text children="IW3475453455" style={styles.textOrder} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  children="Quantity: "
                  style={styles.textOrder}
                  color="gray"
                />
                <Text children="3" style={styles.textOrder} />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  children="Total amount: "
                  style={styles.textOrder}
                  color="gray"
                />
                <Text children={total} style={styles.textOrder} />
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text children="Delivered" color="green" />
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    elevation: 16,
    //   shadowRadius: 10,
    //   shadowOpacity: 0.1,
    //   shadowOffset:{
    //       width: 0,
    //       height: 8,
    //   },
    //   shadowColor: 'red',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 10,
  },
  textOrder: {
    marginVertical: 5,
  },
});
