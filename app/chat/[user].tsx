import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const DUMMY_MESSAGES = [
  { from: 'them', text: 'Hi! Great to connect with you at the event.' },
  { from: 'me', text: 'Hi! Likewise, your work in fintech is inspiring.' },
  { from: 'them', text: 'Thank you! Are you interested in partnerships?' },
];

export default function ChatScreen() {
  const { user } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState(DUMMY_MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'me', text: input }]);
      setInput('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ThemedView style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ThemedText style={styles.backBtnText}>{'< Back'}</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.header}>Chat with {user}</ThemedText>
        <ScrollView style={styles.messages} contentContainerStyle={{ gap: 12 }}>
          {messages.map((msg, idx) => (
            <View
              key={idx}
              style={msg.from === 'me' ? styles.myMsgRow : styles.theirMsgRow}
            >
              <ThemedView style={msg.from === 'me' ? styles.myMsg : styles.theirMsg}>
                <ThemedText style={msg.from === 'me' ? styles.myMsgText : styles.theirMsgText}>{msg.text}</ThemedText>
              </ThemedView>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <ThemedText style={styles.sendBtnText}>Send</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    backgroundColor: 'transparent',
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  backBtnText: {
    color: '#0a7ea4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
  },
  messages: {
    flex: 1,
    marginBottom: 12,
  },
  myMsgRow: {
    alignItems: 'flex-end',
  },
  theirMsgRow: {
    alignItems: 'flex-start',
  },
  myMsg: {
    backgroundColor: '#0a7ea4',
    borderRadius: 14,
    padding: 10,
    maxWidth: '80%',
  },
  theirMsg: {
    backgroundColor: '#e0e0e0',
    borderRadius: 14,
    padding: 10,
    maxWidth: '80%',
  },
  myMsgText: {
    color: '#fff',
    fontSize: 15,
  },
  theirMsgText: {
    color: '#222',
    fontSize: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sendBtn: {
    backgroundColor: '#0a7ea4',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 