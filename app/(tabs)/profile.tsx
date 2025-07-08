import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimView = Animatable.View as unknown as React.ComponentType<any>;

const INTERESTS = [
  'Digital Payments',
  'Banking Infrastructure',
  'Lending & Credit',
  'Blockchain & Web3',
  'Cybersecurity',
  'RegTech',
  'Wealth Tech',
  'Insurance Innovation',
  'Data & Analytics',
  'Venture Capital',
  'Startup',
  'E-Commerce',
  'Tech Talent',
  'Consulting',
  'Media',
];

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [bio, setBio] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [chipScales, setChipScales] = useState<{ [key: string]: number }>({});

  const toggleInterest = (interest: string) => {
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
    setChipScales((prev) => ({ ...prev, [interest]: 0.92 }));
    setTimeout(() => setChipScales((prev) => ({ ...prev, [interest]: 1 })), 120);
  };

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnimView animation="fadeInDown" duration={700} style={styles.heroContainer}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.desc}>
            Tell us about yourself and your interests. Your profile helps us match you with the best networking opportunities.
          </Text>
        </AnimView>
        <AnimView animation="fadeInUp" delay={200} duration={600} style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#b0b8c1"
          />
        </AnimView>
        <AnimView animation="fadeInUp" delay={300} duration={600} style={styles.formGroup}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="CEO, Founder, ..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#b0b8c1"
          />
        </AnimView>
        <AnimView animation="fadeInUp" delay={400} duration={600} style={styles.formGroup}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            placeholder="Company name"
            value={company}
            onChangeText={setCompany}
            placeholderTextColor="#b0b8c1"
          />
        </AnimView>
        <AnimView animation="fadeInUp" delay={500} duration={600} style={styles.formGroup}>
          <Text style={styles.label}>Short Bio</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
            multiline
            placeholderTextColor="#b0b8c1"
          />
        </AnimView>
        <AnimView animation="fadeInUp" delay={600} duration={600}>
          <Text style={styles.interestsTitle}>Interests</Text>
          <View style={styles.interestsGrid}>
            {INTERESTS.map((interest, idx) => (
              <AnimView
                key={interest}
                animation="fadeInUp"
                delay={700 + idx * 40}
                duration={500}
                style={{ transform: [{ scale: chipScales[interest] ?? 1 }] }}
              >
                <TouchableOpacity
                  style={[styles.interestBtn, selected.includes(interest) && styles.interestBtnSelected]}
                  onPress={() => toggleInterest(interest)}
                  activeOpacity={0.7}
                >
                  <Text style={selected.includes(interest) ? styles.interestTextSelected : styles.interestText}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              </AnimView>
            ))}
          </View>
        </AnimView>
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
    paddingTop: 36,
    paddingBottom: 18,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
    color: '#232946',
    letterSpacing: 0.8,
    lineHeight: 38,
    fontFamily: 'System', // iOS/Android default modern font
  },
  desc: {
    textAlign: 'center',
    color: '#6c7a89',
    fontSize: 15,
    marginBottom: 0,
    marginTop: 2,
    lineHeight: 22,
    fontWeight: '400',
  },
  formGroup: {
    marginBottom: 18,
    paddingHorizontal: 20,
  },
  label: {
    color: '#4a4a68',
    fontWeight: '500',
    marginBottom: 6,
    fontSize: 15,
  },
  input: {
    backgroundColor: '#f7f9fa',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: '#232946',
  },
  interestsTitle: {
    marginTop: 18,
    marginBottom: 8,
    color: '#232946',
    fontWeight: '600',
    fontSize: 16,
    paddingHorizontal: 20,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  interestBtn: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    margin: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  interestBtnSelected: {
    backgroundColor: '#e3f0fa',
    borderColor: '#0a7ea4',
  },
  interestText: {
    color: '#4a4a68',
    fontWeight: '500',
    fontSize: 14,
  },
  interestTextSelected: {
    color: '#0a7ea4',
    fontWeight: '700',
    fontSize: 14,
  },
}); 