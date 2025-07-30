import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function DiscountDetailScreen() {
  const route = useRoute();
  const { discount } = route.params;

  if (!discount) return <Text>Скидка не найдена</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{discount.title}</Text>
      <Text style={styles.desc}>{discount.description}</Text>
      <Text style={styles.price}>
        Цена: {discount.price} ₽ (было {discount.old_price} ₽)
      </Text>
      {discount.category_id && (
        <Text style={styles.field}>Категория: {discount.category_id}</Text>
      )}
      {discount.store_id && (
        <Text style={styles.field}>Магазин: {discount.store_id}</Text>
      )}
      {discount.seller_id && (
        <Text style={styles.field}>Продавец: {discount.seller_id}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  desc: { fontSize: 16, marginBottom: 16 },
  price: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  field: { fontSize: 16, marginBottom: 6, color: "#888" },
});