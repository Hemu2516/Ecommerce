import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    apiClient.get('/wishlist').then(response => {
      setWishlist(response.data);
    });
  }, []);

  const removeFromWishlist = (id: number) => {
    apiClient.delete(`/wishlist/${id}`).then(() => {
      setWishlist(wishlist.filter((item: any) => item.id !== id));
    });
  };

  const renderWishlistItem = ({ item }: any) => (
    <View style={styles.item}>
      <Text>{item.product.name}</Text>
      <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
  removeText: { color: 'red', marginTop: 8 },
});

export default WishlistScreen;
