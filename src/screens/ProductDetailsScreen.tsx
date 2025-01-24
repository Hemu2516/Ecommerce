import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';

const ProductDetailsScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    apiClient.get(`/products/${productId}`).then(response => {
      setProduct(response.data);
    });
  }, [productId]);

  const addToCart = () => {
    apiClient.post(`/cart/${productId}`, { quantity: 1 });
    navigation.navigate('Cart');
  };

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 16, marginBottom: 16 },
});

export default ProductDetailsScreen;
