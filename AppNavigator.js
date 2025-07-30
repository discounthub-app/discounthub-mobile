// AppNavigator.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import DiscountsScreen from "./screens/DiscountsScreen";
import DiscountDetailScreen from "./screens/DiscountDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Вход" }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Регистрация" }} />
        <Stack.Screen name="Discounts" component={DiscountsScreen} options={{ title: "Discounts" }} />
        <Stack.Screen name="DiscountDetail" component={DiscountDetailScreen} options={{ title: "Детали скидки" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}