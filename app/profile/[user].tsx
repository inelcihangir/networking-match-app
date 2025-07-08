import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

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

export default function UserProfileScreen() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const userObj = USERS.find((u) => u.name === user);

  if (!userObj) {
    return <ThemedText>User not found.</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <ThemedText style={styles.backBtnText}>{'< Back'}</ThemedText>
      </TouchableOpacity>
      <Image source={{ uri: userObj.avatar }} style={styles.avatar} />
      <ThemedText type="title" style={styles.name}>{userObj.name}</ThemedText>
      <ThemedText style={styles.title}>{userObj.title} @ {userObj.company}</ThemedText>
      <ThemedText style={styles.bio}>{userObj.bio}</ThemedText>
      <View style={styles.interestsRow}>
        {userObj.interests.map((i) => (
          <View key={i} style={styles.interestTag}>
            <ThemedText style={styles.interestText}>{i}</ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: 'transparent',
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  title: {
    color: '#0a7ea4',
    marginBottom: 4,
    textAlign: 'center',
  },
  bio: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    textAlign: 'center',
  },
  interestsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
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
  interestText: {
    color: '#222',
    fontSize: 12,
  },
}); 