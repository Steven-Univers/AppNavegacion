// app/(tabs)/character/[id].tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

type CharacterDetail = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  // Añade más campos según tu API
};

export default function CharacterDetail() {
  // useLocalSearchParams() obtiene los parámetros pasados en la URL, en este caso { id }
  const { id } = useLocalSearchParams();

  const [character, setCharacter] = useState<CharacterDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.example.com/characters/${id}`)
      .then(response => {
        setCharacter(response.data);
      })
      .catch(error => console.error("Error al cargar detalle:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!character) {
    return (
      <View style={styles.centered}>
        <Text>No se encontró el personaje.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Muestra la imagen si existe */}
      {character.image && (
        <Image source={{ uri: character.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{character.name}</Text>
      <Text style={styles.description}>{character.description || "Sin descripción"}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300, marginBottom: 16, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  description: { fontSize: 16, lineHeight: 24 },
});
