// src/components/ProductCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    description?: string;
  };
  onPress: () => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      {product.description && <Text style={styles.description}>{product.description}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductCard;
