import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: 'center',
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <FontAwesome name="plus-circle" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color }) => <FontAwesome name="line-chart" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
