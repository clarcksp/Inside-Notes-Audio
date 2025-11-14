import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuthStore } from '../store/authStore';

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  const handleLogin = () => {
    const STANDARD_EMAIL = 'admin@inside.dev.br';
    const STANDARD_PASSWORD = '1234';

    if (email === STANDARD_EMAIL && password === STANDARD_PASSWORD) {
      login({
        id: '1',
        name: 'Administrador Inside',
        email,
        role: 'admin'
      });
    } else {
      Alert.alert('Erro de Autenticação', 'Credenciais inválidas');
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-secondary">
      <Text className="text-3xl font-bold text-primary mb-6 text-center">
        Inside Notes
      </Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border border-tertiary p-3 rounded mb-4 text-white"
        placeholderTextColor="#808080"
      />
      
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-tertiary p-3 rounded mb-6 text-white"
        placeholderTextColor="#808080"
      />
      
      <TouchableOpacity 
        onPress={handleLogin}
        className="bg-primary p-4 rounded items-center"
      >
        <Text className="text-white font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
