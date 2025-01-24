import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import apiClient from '../api/apiClient';

const HomeScreen = ({ navigation }: any) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get('/categories').then(response => {
      setCategories(response.data);
    });
  }, []);

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity
      style={styles.category}
      onPress={() => navigation.navigate('Category', { categoryId: item.id })}
    >
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  category: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5 },
  categoryName: { fontSize: 16, fontWeight: 'bold' },
});

export default HomeScreen;
