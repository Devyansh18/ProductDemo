import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deleteProduct = async id => {
  const updatedProducts = products.filter(product => product.id !== id);
  setProducts(updatedProducts);
  await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
};

const ProductsComponent = ({data, onDelete}) => {
  const {id, image, name, price} = data;
  // console.log("image",image?.path);
  const handleDelete = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [];

      products = products.filter(product => product.id !== id);

      await AsyncStorage.setItem('products', JSON.stringify(products));

      onDelete(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageBox}>
        <Image
          source={
            image ? {uri: image?.path} : require('../assets/productImage.jpg')
          }
          style={styles.imageStyle}
        />
        <TouchableOpacity style={styles.deleteBox} onPress={handleDelete}>
          <AntDesign name="delete" size={25} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

export default ProductsComponent;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.02,
    width: width * 0.42,
    height: height * 0.25,
  },
  imageBox: {
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    width: width * 0.42,
    height: height * 0.17,
    borderRadius: 10,
  },
  imageStyle: {
    height: height * 0.1,
    width: width * 0.25,
    alignSelf: 'center',
    marginHorizontal: width * 0.08,
  },
  deleteBox: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  name: {
    color: 'black',
    marginLeft: width * 0.005,
    marginTop: height * 0.005,
    fontSize: width * 0.03,
  },
  price: {
    color: 'lightgray',
    marginLeft: width * 0.005,
    marginTop: height * 0.005,
    fontSize: width * 0.03,
  },
});
