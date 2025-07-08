import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const STATUS_LABELS = {
  available: 'Boş',
  reserved: 'Rezerve',
  full: 'Dolu',
};
const STATUS_COLORS = {
  available: ['#e0f7fa', '#b2ebf2'],
  reserved: ['#fff3e0', '#ffe0b2'],
  full: ['#fbe9e7', '#ffccbc'],
};

// Dummy buluşma verisi
const MEETINGS = {
  2: {
    status: 'reserved',
    time: '14:30 - 15:00',
    people: [
      {
        name: 'Alice Johnson',
        title: 'CEO',
        company: 'FinTechX',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      },
      {
        name: 'Bob Lee',
        title: 'CTO',
        company: 'BlockChainify',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
    ],
  },
  3: {
    status: 'full',
    time: '15:00 - 15:30',
    people: [
      {
        name: 'Carla Smith',
        title: 'Investor',
        company: 'VC Partners',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      },
      {
        name: 'David Kim',
        title: 'Head of Analytics',
        company: 'DataWise',
        avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      },
      {
        name: 'Elena Petrova',
        title: 'RegTech Lead',
        company: 'ComplyNow',
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
      },
    ],
  },
};

export default function TableDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const tableId = Number(id);
  const meeting = MEETINGS[tableId as keyof typeof MEETINGS];
  const status = meeting?.status || 'available';
  const statusColors = STATUS_COLORS[status as keyof typeof STATUS_COLORS];

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ThemedText style={styles.backBtnText}>{'< Masa Planı'}</ThemedText>
      </TouchableOpacity>
      <View style={[styles.tableCard, { backgroundColor: statusColors[0], borderColor: statusColors[1] }] }>
        <ThemedText type="title" style={styles.tableNum}>Masa {tableId}</ThemedText>
        <View style={[styles.statusBadge, { backgroundColor: statusColors[1] }] }>
          <ThemedText style={styles.statusText}>{STATUS_LABELS[status as keyof typeof STATUS_LABELS]}</ThemedText>
        </View>
        {meeting?.time && (
          <ThemedText style={styles.timeText}>Buluşma Saati: {meeting.time}</ThemedText>
        )}
      </View>
      {meeting?.people && (
        <View style={styles.peopleSection}>
          <ThemedText type="subtitle" style={styles.peopleTitle}>Buluşacak Kişiler</ThemedText>
          <View style={styles.peopleGrid}>
            {meeting.people.map((person) => (
              <View key={person.name} style={styles.personCard}>
                <View style={styles.avatarWrap}>
                  <View style={styles.avatarShadow} />
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarEmoji}>👤</Text>
                  </View>
                  {/* <Image source={{ uri: person.avatar }} style={styles.avatar} /> */}
                </View>
                <ThemedText style={styles.personName}>{person.name}</ThemedText>
                <ThemedText style={styles.personTitle}>{person.title} @ {person.company}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      )}
      {status === 'available' && (
        <ThemedText style={styles.infoText}>Bu masa şu an boş. Eşleşme sonrası buluşma burada gerçekleşebilir.</ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 36,
    alignItems: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backBtnText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCard: {
    width: 180,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 2,
    marginBottom: 18,
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  tableNum: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#232946',
    marginBottom: 8,
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 2,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#232946',
  },
  timeText: {
    fontSize: 16,
    color: '#0a7ea4',
    fontWeight: '600',
    marginTop: 4,
  },
  peopleSection: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  peopleTitle: {
    marginBottom: 8,
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 18,
  },
  peopleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    justifyContent: 'center',
  },
  personCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    margin: 6,
    width: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  avatarWrap: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3e9f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 28,
  },
  avatarShadow: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#b2ebf2',
    opacity: 0.2,
    top: 4,
    left: 4,
    zIndex: -1,
  },
  personName: {
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 15,
  },
  personTitle: {
    color: '#0a7ea4',
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 13,
  },
  infoText: {
    marginTop: 18,
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },
}); 