import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Text from '../../../components/Text';
import {ButtonSubmit} from '../../../components/index';
import {Picker} from '@react-native-picker/picker';
import FormInput from 'react-native-outline-input';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {API_URL} from '@env';

const AddingShippingAddress = ({navigation}) => {
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const token = useSelector((state) => state.authReducer.token);

  console.log(fullname,address, city, state);

  const handleSubmit = async () => {
    const data = {
      fullname: fullname,
      address: address,
      city: city,
      state: state,
      zip_code: zipCode,
      country: country,
    };
    axios
      .post(`${API_URL}/address`, data, {
        headers: {
          'x-access-token': 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('Success');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.input}>
        <FormInput
          value={fullname}
          onChangeText={(fullname) => setFullname(fullname)}
          label="Full Name"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={address}
          onChangeText={(address) => setAddress(address)}
          label="Address"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={city}
          onChangeText={(city) => setCity(city)}
          label="City"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={state}
          onChangeText={(state) => setState(state)}
          label="State/Province/Region"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <FormInput
          value={zipCode}
          onChangeText={(zipCode) => setZipCode(zipCode)}
          label="Zip Code (Postal Code)"
          passiveBorderColor="white"
          activeBorderColor="black"
          activeLabelColor="black"
          style={styles.form1}
        />
      </View>
      <View style={styles.input}>
        <Picker
          mode="dropdown"
          selectedValue={country}
          onValueChange={(country) => setCountry(country)}
          style={{
            color: 'gray',
            height: 58,
            backgroundColor: 'white',
            width: '98%',
            borderRadius: 5,
          }}>
          <Picker.Item label="Country" />
          <Picker.Item label="United States" value="United States" />
          <Picker.Item label="Indonesia" value="Indonesia" />
          <Picker.Item label="England" value="England" />
        </Picker>
      </View>
      <ButtonSubmit
        title="Save Address"
        bg="red"
        rippleColor="white"
        onPress={() => navigation.navigate('Profile', handleSubmit())}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 35,
  },
  input: {
    paddingVertical: 15,
  },
});

export default AddingShippingAddress;
