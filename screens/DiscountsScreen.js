// screens/DiscountsScreen.js

import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Button, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DiscountsScreen({ navigation }) {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Лог токена после загрузки экрана (для отладки)
  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      if (token) {
        console.log("TOKEN:", token);
      } else {
        console.log("NO TOKEN");
      }
    });
  }, []);

  // Основная функция загрузки скидок
  const fetchDiscounts = useCallback(async (showAlertOnError = true) => {
    setError(null);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("Токен не найден");
      }
      const response = await fetch("http://62.84.102.222:8000/discounts", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка загрузки данных: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      setDiscounts(data);
    } catch (err) {
      setError(err.message);
      if (showAlertOnError) {
        Alert.alert("Ошибка", err.message);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDiscounts(false);
  }, [fetchDiscounts]);

  const handlePress = (discount) => {
    navigation.navigate("DiscountDetail", { discount });
  };

  // Логика выхода
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    navigation.replace("Login");
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Загрузка скидок...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Button title="Выйти" color="#d9534f" onPress={handleLogout} />
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Повторить" onPress={() => { setLoading(true); fetchDiscounts(); }} />
      </View>
    );
  }

  if (!discounts.length) {
    return (
      <View style={styles.centered}>
        <Button title="Выйти" color="#d9534f" onPress={handleLogout} />
        <Text style={{ marginTop: 16 }}>Скидок пока нет</Text>
        <Button title="Обновить" onPress={() => { setLoading(true); fetchDiscounts(); }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Выйти" color="#d9534f" onPress={handleLogout} />
      <Text style={styles.title}>Доступные скидки</Text>
      <FlatList
        data={discounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.discountItem}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.discountTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={discounts.length === 0 ? { flex: 1 } : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  discountItem: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 10, marginBottom: 12 },
  discountTitle: { fontSize: 18, fontWeight: "bold" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { color: "#d9534f", marginBottom: 12, fontSize: 16, textAlign: "center" },
  loadingText: { marginTop: 16, fontSize: 16, color: "#888" }
});