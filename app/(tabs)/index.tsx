import { StyleSheet, View, ScrollView, Text, Dimensions, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const EXHIBITORS = [
  { label: 'Digital Payments & Wallets', icon: '💳', color: '#f5f7fa' },
  { label: 'Banking Infrastructure', icon: '🏦', color: '#f0f4f8' },
  { label: 'Lending & Credit', icon: '💰', color: '#f7f9fa' },
  { label: 'Blockchain & Web3', icon: '⛓️', color: '#f3f6fa' },
  { label: 'Cybersecurity & Fraud Prevention', icon: '🛡️', color: '#f6f8fa' },
];

const PARTICIPANTS = [
  { label: 'Startup Founders & Entrepreneurs', icon: '🧑‍💼', color: '#f5f7fa' },
  { label: 'Banking & Financial Leaders', icon: '👔', color: '#f0f4f8' },
  { label: 'Investors & VCs', icon: '💼', color: '#f7f9fa' },
  { label: 'Regulators & Policy Makers', icon: '⚖️', color: '#f3f6fa' },
  { label: 'Tech Talents', icon: '💻', color: '#f6f8fa' },
];

const SCREEN_WIDTH = Dimensions.get('window').width;
const isTablet = SCREEN_WIDTH > 700;
const CARD_WIDTH = isTablet ? 260 : SCREEN_WIDTH > 500 ? 200 : (SCREEN_WIDTH - 64) / 2;

export default function HomeScreen() {
  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Text style={styles.title}>Connecting Global Fintech Ecosystem</Text>
          <Text style={styles.slogan}>AI-Powered Networking for Visionary Leaders</Text>
          <Text style={styles.desc}>
            Discover, connect and grow with the world’s leading fintech professionals. Explore the categories below.
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXHIBITORS</Text>
          <View style={styles.grid}>
            {EXHIBITORS.map((item) => (
              <View key={item.label} style={[styles.card, { backgroundColor: item.color }] }>
                <Text style={styles.emoji}>{item.icon}</Text>
                <Text style={styles.cardText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PARTICIPANTS</Text>
          <View style={styles.grid}>
            {PARTICIPANTS.map((item) => (
              <View key={item.label} style={[styles.card, { backgroundColor: item.color }] }>
                <Text style={styles.emoji}>{item.icon}</Text>
                <Text style={styles.cardText}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 32,
    paddingTop: 0,
  },
  heroContainer: {
    alignItems: 'center',
    paddingTop: isTablet ? 48 : 32,
    paddingBottom: isTablet ? 24 : 16,
    paddingHorizontal: isTablet ? 48 : 16,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: isTablet ? 40 : 28,
    fontWeight: '700',
    marginBottom: 8,
    color: '#232946',
    letterSpacing: 0.2,
    lineHeight: isTablet ? 48 : 34,
  },
  slogan: {
    textAlign: 'center',
    color: '#4a4a68',
    marginBottom: 8,
    fontSize: isTablet ? 22 : 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  desc: {
    textAlign: 'center',
    color: '#6c7a89',
    fontSize: isTablet ? 16 : 14,
    marginBottom: 0,
    marginTop: 2,
    lineHeight: isTablet ? 26 : 20,
    fontWeight: '400',
  },
  section: {
    marginTop: isTablet ? 36 : 24,
    marginBottom: 0,
    paddingHorizontal: isTablet ? 32 : 12,
  },
  sectionTitle: {
    marginBottom: 18,
    fontSize: isTablet ? 22 : 18,
    fontWeight: '700',
    color: '#232946',
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: isTablet ? 32 : 16,
    justifyContent: 'center',
  },
  card: {
    minWidth: 120,
    maxWidth: '100%',
    width: CARD_WIDTH,
    borderRadius: 18,
    paddingVertical: isTablet ? 32 : 18,
    paddingHorizontal: isTablet ? 18 : 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 12,
    shadowColor: '#232946',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  emoji: {
    fontSize: isTablet ? 32 : 24,
    marginBottom: 10,
    color: '#4a4a68',
    opacity: 0.7,
  },
  cardText: {
    textAlign: 'center',
    fontSize: isTablet ? 16 : 14,
    fontWeight: '500',
    color: '#232946',
    letterSpacing: 0.05,
    lineHeight: isTablet ? 22 : 18,
  },
});
