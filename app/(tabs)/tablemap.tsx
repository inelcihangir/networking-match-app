import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Dimensions, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

const TABLE_STATUSES = ['available', 'reserved', 'full'] as const;
type TableStatus = typeof TABLE_STATUSES[number];

const TABLES: { id: number; status: TableStatus }[] = [
  { id: 1, status: 'available' },
  { id: 2, status: 'reserved' },
  { id: 3, status: 'full' },
  { id: 4, status: 'available' },
  { id: 5, status: 'reserved' },
  { id: 6, status: 'full' },
  { id: 7, status: 'available' },
  { id: 8, status: 'available' },
  { id: 9, status: 'reserved' },
  { id: 10, status: 'full' },
  { id: 11, status: 'available' },
  { id: 12, status: 'reserved' }, // örnek: dolu masa sayısı artırıldı
];

const STATUS_COLORS: Record<TableStatus, [string, string]> = {
  available: ['#e0f7fa', '#b2ebf2'],
  reserved: ['#fff3e0', '#ffe0b2'],
  full: ['#fbe9e7', '#ffccbc'],
};

const STATUS_LABELS: Record<TableStatus, string> = {
  available: 'Boş',
  reserved: 'Rezerve',
  full: 'Dolu',
};

const getNumColumns = () => {
  const width = Dimensions.get('window').width;
  if (width > 700) return 5;
  if (width > 500) return 4;
  return 3;
};

export default function TableMapScreen() {
  const router = useRouter();
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get('window').width);
  const numColumns = getNumColumns();

  React.useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => sub?.remove();
  }, []);

  const handleTablePress = (table: { id: number; status: TableStatus }) => {
    if (table.status === 'full') {
      Alert.alert('Dolu Masa', 'Bu masa şu anda dolu. Lütfen başka bir masa seçin.');
      return;
    }
    router.push({ pathname: '/table/[id]', params: { id: String(table.id) } });
  };

  const renderItem = ({ item, index }: { item: { id: number; status: TableStatus }, index: number }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={100 + index * 40}
      duration={500}
      style={{ flex: 1, alignItems: 'center' }}
    >
      <TouchableOpacity
        key={item.id}
        style={styles.cardWrap}
        activeOpacity={item.status === 'full' ? 1 : 0.85}
        onPress={() => handleTablePress(item)}
        disabled={item.status === 'full'}
      >
        <ThemedView style={[
          styles.card,
          { backgroundColor: STATUS_COLORS[item.status][0], borderColor: STATUS_COLORS[item.status][1] },
          item.status === 'full' && styles.cardFull,
        ]}>
          <Text style={styles.tableNum}>Masa {item.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status][1] }] }>
            <Text style={styles.statusText}>{STATUS_LABELS[item.status]}</Text>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.header}>Masa Planı</ThemedText>
      <ThemedText style={styles.desc}>
        Networking buluşmaları için masa düzenini aşağıdan inceleyebilir, uygun masalara tıklayarak detay görebilirsin.
      </ThemedText>
      <FlatList
        data={TABLES}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        key={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 32,
    backgroundColor: '#f7f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#232946',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.8,
    lineHeight: 36,
    fontFamily: 'System',
  },
  desc: {
    textAlign: 'center',
    color: '#6c7a89',
    fontSize: 15,
    marginBottom: 18,
    lineHeight: 20,
    fontWeight: '400',
  },
  grid: {
    paddingHorizontal: 4,
    paddingBottom: 24,
    gap: 10,
  },
  cardWrap: {
    flex: 1,
    alignItems: 'center',
    margin: 6,
    minWidth: 90,
    maxWidth: 120,
  },
  card: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 2,
    marginBottom: 4,
  },
  cardFull: {
    opacity: 0.55,
  },
  tableNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#232946',
    marginBottom: 6,
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 2,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#232946',
  },
}); 