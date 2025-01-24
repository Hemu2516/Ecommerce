import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';

const CartScreen = () => {
  interface CartItem {
    id: number;
    productVariant: {
      name: string;
    };
    quantity: number;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    apiClient.get('/cart').then(response => {
      setCartItems(response.data);
    });
  }, []);

  const renderCartItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <Text>{item.productVariant.name}</Text>
      <Text>Quantity: {item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cartItem: { padding: 16, backgroundColor: '#f0f0f0', marginBottom: 10, borderRadius: 5 },
});

export default CartScreen;
