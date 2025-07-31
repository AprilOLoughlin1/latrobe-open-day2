import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Club {
  id: number;
  name: string;
  type: 'public' | 'private';
  members: number;
  icon: string;
  description: string;
}

const clubs: Club[] = [
  {
    id: 1,
    name: 'Computer Science Society',
    type: 'public',
    members: 156,
    icon: '💻',
    description: 'Technology enthusiasts and coding professionals',
  },
  {
    id: 2,
    name: 'Photography Club',
    type: 'public',
    members: 89,
    icon: '📸',
    description: 'Capture moments and learn photography skills',
  },
  {
    id: 3,
    name: 'Debate Society',
    type: 'private',
    members: 67,
    icon: '🎙️',
    description: 'Develop public speaking and critical thinking',
  },
  {
    id: 4,
    name: 'Environmental Awareness Group',
    type: 'public',
    members: 124,
    icon: '🌿',
    description: 'Promote sustainability and environmental consciousness',
  },
  {
    id: 5,
    name: 'Music Ensemble',
    type: 'private',
    members: 45,
    icon: '🎵',
    description: 'Create and perform music together',
  },
  {
    id: 6,
    name: 'International Students Association',
    type: 'public',
    members: 203,
    icon: '🌏',
    description: 'Support and connect international students',
  },
  {
    id: 7,
    name: 'Chess Club',
    type: 'public',
    members: 78,
    icon: '♟️',
    description: 'Strategic thinking and friendly competition',
  },
  {
    id: 8,
    name: 'Creative Writing Circle',
    type: 'private',
    members: 34,
    icon: '✍️',
    description: 'Express creativity through writing',
  },
  {
    id: 9,
    name: 'Sports and Fitness Club',
    type: 'public',
    members: 167,
    icon: '🏃‍♂️',
    description: 'Stay active and healthy together',
  },
  {
    id: 10,
    name: 'Business and Entrepreneurship Society',
    type: 'private',
    members: 92,
    icon: '💼',
    description: 'Develop business skills and network',
  },
];

const ClubCard = ({ club }: { club: Club }) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{club.icon}</Text>
        </View>
        <View style={styles.cardInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.clubName}>{club.name}</Text>
            <View style={[
              styles.typeBadge,
              { backgroundColor: club.type === 'public' ? '#4CAF50' : '#F44336' }
            ]}>
              <Text style={styles.typeText}>
                {club.type.toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{club.description}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.membersContainer}>
          <Text style={styles.membersIcon}></Text>
          <Text style={styles.membersText}>{club.members} members</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function ClubsScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [clubsData, setClubsData] = useState<Club[]>([]);

  useEffect(() => {
    // Simulate loading time
    const loadClubs = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      setClubsData(clubs);
      setIsLoading(false);
    };

    loadClubs();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Student Clubs & Societies</Text>
          <Text style={styles.subtitle}>Discover and join amazing communities</Text>
        </View>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loaderText}>Loading clubs...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Clubs & Societies</Text>
        <Text style={styles.subtitle}>Discover and join amazing communities</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {clubsData.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    flexWrap: 'wrap',
  },
  clubName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
    fontFamily: 'Poppins-SemiBold',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  membersText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
  },
});
