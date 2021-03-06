import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

import CartItem from "./CartItem";
import Card from "../UI/Card";
const OrderItem = props => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetail ? "Hide Details" : "Show Details"}
        onPress={() => {
          setShowDetail(prevState => !prevState);
        }}
      />
      {showDetail && (
        <View style={styles.detailItems}>
          {props.items.map(item => (
            <CartItem
              key={item.productId}
              quantity={item.quantity}
              title={item.productTitle}
              amount={item.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888"
  },
  detailItems: {
    width: "100%"
  }
});
export default OrderItem;
