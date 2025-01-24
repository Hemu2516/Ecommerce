import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';

const CategoryScreen = ({ route, navigation }: any) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    apiClient.get(`/products?categoryId=${categoryId}`).then(response => {
      setProducts(response.data);
    });
  }, [categoryId]);

  const renderProduct = ({ item }: any) => (
    <TouchableOpacity
      style={styles.product}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  product: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
  productName: { fontSize: 16, fontWeight: 'bold' },
});

export default CategoryScreen;
