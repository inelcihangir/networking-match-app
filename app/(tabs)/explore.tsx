import React from 'react';
import { StyleSheet, View, ScrollView, Text, Linking } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimView = Animatable.View as unknown as React.ComponentType<any>;

const EVENT_FEATURES = [
  {
    icon: '🗓️',
    title: 'Etkinlik Programı',
    desc: 'Tüm oturumlar, saatler ve salonlar burada. Programı inceleyin ve ilginizi çeken oturumları kaçırmayın.',
  },
  {
    icon: '🎤',
    title: 'Konuşmacılar',
    desc: 'Etkinliğin önde gelen konuşmacılarını ve kısa biyografilerini keşfedin.',
  },
  {
    icon: '🗺️',
    title: 'Salon & Masa Haritası',
    desc: 'Salon ve masa planını görüntüleyin, kolayca yolunuzu bulun.',
  },
  {
    icon: '📢',
    title: 'Duyurular',
    desc: 'Organizatörden en güncel bilgilere ve önemli duyurulara ulaşın.',
  },
  {
    icon: '📶',
    title: 'WiFi Bilgisi',
    desc: 'Ağ: Fintech2024\nŞifre: networking',
  },
  {
    icon: '☎️',
    title: 'Destek & İletişim',
    desc: 'Her türlü sorunuz için destek ekibimize ulaşın: +90 555 123 45 67',
    onPress: () => Linking.openURL('tel:+905551234567'),
  },
  {
    icon: '📄',
    title: 'Kurallar & SSS',
    desc: 'Etkinlik kuralları ve sıkça sorulan sorulara göz atın.',
  },
];

export default function ExploreScreen() {
  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnimView animation="fadeInDown" duration={700} style={styles.heroContainer}>
          <Text style={styles.title}>Etkinlik Özellikleri</Text>
          <Text style={styles.desc}>
            Fintech etkinliğinizde işinizi kolaylaştıracak tüm özellikler burada. Programdan haritaya, duyurulardan desteğe kadar her şey elinizin altında.
          </Text>
        </AnimView>
        <View style={styles.grid}>
          {EVENT_FEATURES.map((item, idx) => (
            <AnimView
              key={item.title}
              animation="fadeInUp"
              delay={300 + idx * 80}
              duration={600}
              style={styles.infoCard}
            >
              <Text style={styles.infoIcon}>{item.icon}</Text>
              <Text style={styles.infoTitle}>{item.title}</Text>
              <Text style={styles.infoDesc}>{item.desc}</Text>
            </AnimView>
          ))}
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
    fontFamily: 'System',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#f7f9fa',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
    width: 240,
    marginBottom: 8,
    shadowColor: '#232946',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: 10,
    color: '#4a4a68',
    opacity: 0.7,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#232946',
    marginBottom: 6,
    textAlign: 'center',
  },
  infoDesc: {
    fontSize: 14,
    color: '#6c7a89',
    textAlign: 'center',
    lineHeight: 20,
  },
});
