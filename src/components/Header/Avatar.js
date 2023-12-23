import React from "react";
import { Image } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function Avatar({ size, user }) {
  const route = useRoute();

  return (
    <Image
      style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={{ uri: route.params.data.imageUrl }}
      resizeMode="cover"
    />
  );
}
