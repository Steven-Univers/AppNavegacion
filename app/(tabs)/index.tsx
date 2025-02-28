// app/(tabs)/index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Link } from "expo-router";
import axios from "axios";

// Definimos el tipo para TypeScript (opcional, pero recomendado)
type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
};

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacemos la petición a la API de Rick and Morty
    axios.get("https://rickandmortyapi.com/api/character")
      .then(response => {
        // "results" es el array de personajes
        setCharacters(response.data.results);
      })
      .catch(error => console.error("Error al cargar personajes:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity style={styles.item}>
      {/* 
        Link navega a /character/[id]. 
        item.id es el ID del personaje.
      */}
      <Link href={`/(tabs)/character/${item.id}`} asChild>
        <View style={styles.itemContent}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </Link>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  item: {
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
