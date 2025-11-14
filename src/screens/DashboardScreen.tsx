import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../store/authStore';

const DashboardScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <View className="flex-1 bg-secondary p-6">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-primary">
          Olá, {user?.name}
        </Text>
        <TouchableOpacity 
          onPress={logout}
          className="bg-primary p-2 rounded"
        >
          <Text className="text-white">Sair</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-secondary-light p-4 rounded">
        <Text className="text-white">
          Bem-vindo ao Inside Notes. Selecione uma opção abaixo:
        </Text>
      </View>
    </View>
  );
};

export default DashboardScreen;
