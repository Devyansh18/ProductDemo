import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CardComponent from '../../components/card';
import ProductsComponent from '../../components/card';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './styles';
import {useFocusEffect} from '@react-navigation/native';
import { RNToasty } from 'react-native-toasty';

const {width, height} = Dimensions.get('window');

const Home = ({navigation, setToken}) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState('');

  useEffect(() => {
    loadProducts();
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(false);
      navigation.navigate('Login');
    } catch (e) {
      console.log(e);
    }
  };

  const loadProducts = async () => {
    const storedProducts = await AsyncStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  };

  const handleDeleteProduct = id => {
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id),
      RNToasty.Show({
        title: 'Product Deleted!',
        // fontFamily: 'Arial',
        position: 'center',
      })
    );
  };

  // console.log('products.length', products.length);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // const accesories = [
  //   {
  //     id: 1,
  //     image: require('../../assets/productImage.jpg'),
  //     name: 'AIAIAI 3.5mm Jack 2m',
  //     price: '$25.00',
  //   },
  //   {
  //     id: 2,
  //     image: require('../../assets/productImage.jpg'),
  //     name: 'AIAIAI 3.5mm Jack 1.5mm',
  //     price: '$15.00',
  //   },
  // ];

  //   const [data, setData] = useState(products);
  // const [data2, setData2] = useState(accesories);
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="chevron-back" size={25} color="gray" />
          </TouchableOpacity>

          {!visible && (
            <TextInput
              placeholder="Search products"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchText}
              placeholderTextColor={'lightgray'}
            />
          )}

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setVisible(!visible)}>
            <Ionicons name="search" size={25} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.shopName}>Hi-Fi Shop & Service</Text>
        <Text style={styles.shopDetail}>
          Audio shop on Rustaveli Ave 57{'/n'}
          This shop offers both products and services
        </Text>
        {/* <Text
          style={{
            color: 'lightgray',
            marginLeft: width * 0.05,
          }}>
          
        </Text> */}
        <View style={styles.productsBox}>
          <Text style={styles.products}>
            Products
            <Text style={styles.length}> {products.length}</Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
        </View>

        {products.length > 0 ? (
          <FlatList
            data={filteredProducts}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <ProductsComponent
                data={{
                  ...item,
                  image: item.image, // This should be the base64 string or local URI
                }}
                onDelete={handleDeleteProduct}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.noProduct}>No Product Found</Text>
          </View>
        )}

        <View>
          <TouchableOpacity
            style={styles.addBox}
            onPress={() => navigation.navigate('AddProduct')}>
            <AntDesign name="pluscircle" size={50} color="#1e7df0" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
