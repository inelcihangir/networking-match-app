import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, FlatList, SafeAreaView, Platform, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';

const AnimView = Animatable.View as unknown as React.ComponentType<any>;

const AVATAR_SIZE = 64;
const SCREEN_WIDTH = Dimensions.get('window').width;
const isTablet = SCREEN_WIDTH > 700;
const CARD_WIDTH = isTablet ? (SCREEN_WIDTH - 72) / 2 : SCREEN_WIDTH - 36;

const TABLES = [1, 2, 3, 4, 5, 6];
const TIMES = ['14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

const USERS = [
  {
    name: 'Alice Johnson',
    title: 'CEO',
    company: 'FinTechX',
    bio: 'Building the next-gen payment solutions.',
    interests: ['Digital Payments', 'Banking Infrastructure'],
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Bob Lee',
    title: 'CTO',
    company: 'BlockChainify',
    bio: 'Web3 enthusiast and blockchain architect.',
    interests: ['Blockchain & Web3', 'Cybersecurity'],
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Carla Smith',
    title: 'Investor',
    company: 'VC Partners',
    bio: 'Investing in disruptive fintech startups.',
    interests: ['Venture Capital', 'Startup'],
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'David Kim',
    title: 'Head of Analytics',
    company: 'DataWise',
    bio: 'Turning data into business value.',
    interests: ['Data & Analytics', 'Wealth Tech'],
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
  {
    name: 'Elena Petrova',
    title: 'RegTech Lead',
    company: 'ComplyNow',
    bio: 'Making compliance simple and smart.',
    interests: ['RegTech', 'Compliance'],
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

const MY_INTERESTS = ['Digital Payments', 'Blockchain & Web3', 'Startup', 'Data & Analytics'];
function getMatchScore(userInterests: string[], myInterests: string[]) {
  return userInterests.filter((i) => myInterests.includes(i)).length;
}

type MatchUser = typeof USERS[number] & { score: number };

type MatchWithMeeting = MatchUser & { table: number; time: string };

function assignTablesAndTimes(matches: MatchUser[]): MatchWithMeeting[] {
  return matches.map((user: MatchUser, idx: number) => ({
    ...user,
    table: TABLES[idx % TABLES.length],
    time: TIMES[idx % TIMES.length],
  }));
}

const getCardWidth = () => {
  const width = Dimensions.get('window').width;
  if (width > 700) return (width - 72) / 2;
  return width - 36;
};

export default function MatchScreen() {
  const router = useRouter();
  const [pressedCard, setPressedCard] = useState<string | null>(null);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const isTablet = screenWidth > 700;

  React.useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });
    return () => sub?.remove();
  }, []);

  const matches = useMemo<MatchWithMeeting[]>(() => {
    const raw: MatchUser[] = USERS.map((user) => ({
      ...user,
      score: getMatchScore(user.interests, MY_INTERESTS),
    }))
      .filter((u) => u.score > 0)
      .sort((a, b) => b.score - a.score);
    return assignTablesAndTimes(raw);
  }, []);

  const renderItem = ({ item, index }: { item: MatchWithMeeting; index: number }) => (
    <AnimView
      animation="fadeInUp"
      delay={200 + index * 80}
      duration={600}
      style={{ alignItems: 'center', flex: 1 }}
    >
      <TouchableOpacity
        activeOpacity={0.92}
        style={{ width: '100%', alignItems: 'center' }}
        onPressIn={() => setPressedCard(item.name)}
        onPressOut={() => setPressedCard(null)}
      >
        <ThemedView style={[styles.card, { width: getCardWidth() }, pressedCard === item.name && styles.cardPressed]}> 
          <View style={styles.avatarWrap}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          </View>
          <ThemedText type="subtitle" style={styles.name}>{item.name}</ThemedText>
          <ThemedText style={styles.title}>{item.title} @ {item.company}</ThemedText>
          <ThemedText style={styles.bio}>{item.bio}</ThemedText>
          <View style={styles.interestsRow}>
            {item.interests.map((i: string) => (
              <View key={i} style={[styles.interestTag, MY_INTERESTS.includes(i) && styles.interestTagMatch]}>
                <ThemedText style={MY_INTERESTS.includes(i) ? styles.interestTextMatch : styles.interestText}>{i}</ThemedText>
              </View>
            ))}
          </View>
          <ThemedText style={styles.matchScore}>Match Score: {item.score}</ThemedText>
          <View style={styles.meetingInfoRow}>
            <ThemedText style={styles.meetingInfo}>Table: {item.table}</ThemedText>
            <ThemedText style={styles.meetingInfo}>Time: {item.time}</ThemedText>
          </View>
          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => router.push(`/profile/${encodeURIComponent(item.name)}`)}
            >
              <ThemedText style={styles.actionBtnText}>View Profile</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.actionBtnChat]}
              onPress={() => router.push(`/chat/${encodeURIComponent(item.name)}`)}
            >
              <ThemedText style={styles.actionBtnText}>Start Chat</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </TouchableOpacity>
    </AnimView>
  );

  return (
    <SafeAreaView style={styles.bg}>
      <AnimView animation="fadeInDown" duration={700} style={styles.headerWrap}>
        <ThemedText type="title" style={styles.header}>AI Matchmaking</ThemedText>
        <ThemedText style={styles.subheader}>
          Your best networking matches based on your interests
        </ThemedText>
      </AnimView>
      <FlatList
        data={matches}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'mobile'}
        columnWrapperStyle={isTablet ? styles.row : undefined}
        contentContainerStyle={[styles.cardsGrid, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 8 : 24 }]}
        ListEmptyComponent={<ThemedText>No matches found. Try selecting more interests in your profile.</ThemedText>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  headerWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingTop: 32,
    paddingBottom: 18,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 30,
    fontWeight: '800',
    color: '#232946',
    letterSpacing: 0.8,
    lineHeight: 38,
    fontFamily: 'System',
  },
  subheader: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#6c7a89',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
    lineHeight: 22,
  },
  cardsGrid: {
    paddingHorizontal: 8,
    paddingBottom: 24,
    gap: 18,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 0,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    shadowOpacity: 0.18,
    elevation: 6,
  },
  avatarWrap: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#e3e9f3',
    overflow: 'hidden',
    shadowColor: '#0a7ea4',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 18,
    color: '#232946',
  },
  title: {
    color: '#0a7ea4',
    marginBottom: 4,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  bio: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 18,
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 6,
    justifyContent: 'center',
  },
  interestTag: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 2,
  },
  interestTagMatch: {
    backgroundColor: '#0a7ea4',
  },
  interestText: {
    color: '#222',
    fontSize: 12,
  },
  interestTextMatch: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  matchScore: {
    marginTop: 4,
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
    justifyContent: 'center',
    width: '100%',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  actionBtnChat: {
    backgroundColor: '#0a7ea4',
  },
  actionBtnText: {
    color: '#222',
    fontWeight: '600',
    fontSize: 15,
  },
  meetingInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 18,
    marginTop: 8,
    marginBottom: 2,
  },
  meetingInfo: {
    backgroundColor: '#e3e9f3',
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 14,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 2,
  },
}); 