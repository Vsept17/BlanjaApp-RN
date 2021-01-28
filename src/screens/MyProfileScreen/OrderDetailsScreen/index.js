import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text, ButtonSubmit} from '../../../components';

const OrderDetails = ({navigation, route}) => {
  const {itemId, orderCode, total, user_id} = route.params;

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row',}}>
            <Text
              children="Order No. "
              size="l"
              type="Bold"
              style={styles.textOrderNo}
            />
            <Text
              children={orderCode}
              size="l"
              type="Bold"
              style={styles.textOrderNo}
            />
          </View>
          <Text
            children="05-12-2019"
            size="m"
            color="gray"
            style={styles.textOrderNo}
          />
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text
              children="Tracking number: "
              style={styles.textOrderNo}
              color="gray"
            />
            <Text children="IW3475453455" style={styles.textOrderNo} />
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            children="3"
            style={styles.textOrderNo}
            style={{fontWeight: 'bold'}}
          />
          <Text
            children=" Items"
            style={styles.textOrderNo}
            style={{fontWeight: 'bold'}}
          />
        </View>

        <View style={styles.card}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={styles.img}
                source={require('../../../assets/images/womanorder.png')}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <Text children="Pullover" size="l" style={styles.textOrder} />
              <Text children="Mango" color="gray" style={styles.textOrder} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    children="Color: "
                    color="gray"
                    style={styles.textOrder}
                  />
                  <Text children="Gray" style={styles.textOrderValue} />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    children="Size: "
                    color="gray"
                    style={styles.textOrder}
                  />
                  <Text children="L" style={styles.textOrderValue} />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    children="Units: "
                    color="gray"
                    style={styles.textOrder}
                  />
                  <Text children="1" style={styles.textOrderValue} />
                </View>
                <View style={{alignContent: 'flex-end'}}>
                  <Text children="$ 51" style={styles.textOrderValue} />
                </View>
              </View>
            </View>
          </View>
        </View>

        <Text
          children="Order information"
          size="l"
          style={{fontWeight: '700', marginBottom: 15}}
        />
        <View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Shipping Address: " color="gray" size="l" />
            <Text
              children="3 Newbridge Court, Chino Hills CA 91709, United States"
              color="black"
              size="l"
              style={{flexShrink: 1}}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Payment method: " color="gray" size="l" />
            <Text
              children="7823 2525 4602 2829"
              color="black"
              size="l"
              style={{right: -2}}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Delivery method: " color="gray" size="l" />
            <Text
              children="FedEx, 3 days, $ 15"
              color="black"
              size="l"
              style={{right: -6}}
            />
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text children="Discount: " color="gray" size="l" />
            <Text
              children="10%, Personal promo code"
              color="black"
              size="l"
              style={{right: -60}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text children="Total Amount: " color="gray" size="l" />
            <View>
              <Text
                children="$ 133"
                color="black"
                size="l"
                style={{right: -30}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          marginHorizontal: 10,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        <View>
          <ButtonSubmit
            title="Reorder"
            style={styles.btn}
            color="black"
            bg="white"
          />
        </View>
        <View>
          <ButtonSubmit title="Leave feddback" style={styles.btn} bg="red" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#E5E5E5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  card: {
    height: 160,
    paddingRight: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 20,
  },
  cardOrder: {
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
  img: {
    width: 130,
    height: 200,
    overflow: 'hidden',
  },
  textOrderNo: {
    marginVertical: 5,
  },
  textOrder: {
    marginVertical: 5,
    marginLeft: 15,
  },
  textOrderValue: {
    marginVertical: 5,
    // paddingStart:15,
  },
  btn: {
    width: '50%',
    paddingHorizontal: 0,
  },
});

export default OrderDetails;
