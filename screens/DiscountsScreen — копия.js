// screens/DiscountsScreen.js

import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const MOCK_DISCOUNTS = [
  { id: "1", title: "Скидка 10% в Магнит", description: "Только сегодня!" },
  { id: "2", title: "2 по цене 1 в Перекрёстке", description: "До конца недели" },
  { id: "3", title: "50% на кофе в KFC", description: "С 10 до 12 утра" },
];

export default function DiscountsScreen({ navigation }) {
  const handlePress = (discount) => {
    navigation.navigate("DiscountDetail", { discount });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Доступные скидки</Text>
      <FlatList
        data={MOCK_DISCOUNTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.discountItem}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.discountTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  discountItem: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 10, marginBottom: 12 },
  discountTitle: { fontSize: 18, fontWeight: "bold" },
});