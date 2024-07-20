import {
  View,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import { RNToasty } from 'react-native-toasty';

const {width, height} = Dimensions.get('window');

const AddProduct = ({navigation}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const addProduct = async () => {
    if (!name.trim || !price.trim()) {
      // Alert.alert('Error', 'Please enter both product name and price.');
      RNToasty.Show({
        title: 'Please enter both product name and price.',
        // fontFamily: 'Arial',
        position: 'center',
      })
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      price,
      image,
    };

    const existingProducts =
      JSON.parse(await AsyncStorage.getItem('products')) || [];

    if (
      existingProducts.some(
        product => product.name.toLowerCase() === name.trim().toLowerCase(),
      )
    ) {
      
      RNToasty.Show({
        title: 'A product with this name already exists.',
        // fontFamily: 'Arial',
        position: 'center',
      })
      return;
    }

    const updatedProducts = [...existingProducts, newProduct];
    await AsyncStorage.setItem('products', JSON.stringify(updatedProducts));
    navigation.navigate('Home', {image: image ? image.path : null});
  };

  const handleImagePick = () => {
    ImagePicker.openPicker({
      width: width * 1,
      height: height * 0.5,
      cropping: true,
    }).then(selectedImage => {
      setImage(selectedImage);
      setImage(`data:image/jpeg;base64,${base64String}`);
    });
  };
  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.inputContainer}>
        <TextInput
          placeholder=" Enter Product Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="gray"
          style={styles.inputStyle}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholderTextColor="gray"
          style={styles.inputStyle}
        />
      </View> */}
       <Text style={styles.shopName}>Add Product</Text>
            <View style={styles.inputContainer}>
           
        <TextInput
          placeholder="Enter Product Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="gray"
          style={styles.emailInput}
        />
      </View>

      <View style={styles.inputContainer}>
      
        <TextInput
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholderTextColor="gray"
          style={styles.emailInput}
        />
      </View>
      {image && (
        <View>
          <Text style={styles.urlText}>
            Image URL:{' '}
            <Text style={{color: 'Componentgray'}}>{image.path}</Text>
          </Text>
        </View>
      )}
      <TouchableOpacity style={styles.imagePickerBox} onPress={handleImagePick}>
        <Text style={styles.chooseText}>Choose Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.imagePickerBox1} onPress={addProduct}>
        <Text style={styles.chooseText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddProduct;
