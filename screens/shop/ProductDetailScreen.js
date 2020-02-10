import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
  const productId = props.navigation.getParam("productId");
  const product = useSelector(state =>
    state.products.availableProducts.find(p => p.id === productId)
  );
  
  return (
    <View>
      <Text>Product Detail Screen</Text>
      <Text>{product.title} </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductDetailScreen;
