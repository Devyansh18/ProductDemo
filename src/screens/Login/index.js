import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import styles from './styles';
const {width, height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RNToasty} from 'react-native-toasty';


const Login = ({navigation, setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingIndicator, setLoadingIndicator] = useState(false);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  };
  const handleLogin = async () => {
    setLoadingIndicator(true);
    try {
      // console.log(email, password);
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      // console.log(response?.data?.token);
      const token = response?.data?.token;
      if (token) {
        await AsyncStorage.setItem('userToken', token);
        setToken(true);
        navigation.navigate('Home');
        RNToasty.Show({
          title: 'Login Successfully',
          // fontFamily: 'Arial',
          position: 'center',
        })
      } else {
        RNToasty.Show({
          title: ('Login Failed', 'Invalid credentials'),
          position: 'center',
        })
      }
    } catch (error) {
   
      RNToasty.Error({
        title: error?.response?.data?.error,
      });
    } finally {
      setLoadingIndicator(false);
    }
  };
  // TOKEN : QpwL5tke4Pnpja7X4
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={require('../../assets/productImage.jpg')}
        style={{alignSelf: 'center', marginTop: height * 0.1}}
      />
      <Text
        style={styles.loginText}>
        Login
      </Text>
      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/email.png')}
          style={styles.emailIcon}
        />
        <TextInput
          placeholder="Email ID"
          keyboardType={'email-address'}
          onChangeText={text => setEmail(text)}
          placeholderTextColor="gray"
          style={styles.emailInput}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image
          source={require('../../assets/password.png')}
          style={styles.emailIcon}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="gray"
          style={styles.emailInput}
        />
      </View>
      <TouchableOpacity
        style={styles.forgotBox}>
        <Text
          style={styles.forgotText}>
          Forgot password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginBox}
        onPress={handleLogin}
        disabled={loadingIndicator}>
        {loadingIndicator ? (
          <ActivityIndicator
            size={22}
            color={'white'}
            style={{marginRight: width * 0.04}}
          />
        ) : (
          <Text
            style={styles.login}>
            Login
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;
