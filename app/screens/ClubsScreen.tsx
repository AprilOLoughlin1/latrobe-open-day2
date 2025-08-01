import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// club start
interface Club {
  id: string;
  name: string;
  description: string;
  members: number;
  meetingTime?: string;
  location?: string;
}

interface ClubCategory {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  clubs: Club[];
}


const clubCategories: ClubCategory[] = [
  {
    id: 'academics',
    name: 'Academics',
    icon: 'school',
    color: '#4A90E2',
    clubs: [
      {
        id: '1',
        name: 'Computer Science Society',
        description: 'Exploring technology and programming together',
        members: 45,
        meetingTime: 'Every Tuesday 6:00 PM',
        location: 'Engineering Building Room 101'
      },
      {
        id: '2',
        name: 'Mathematics Club',
        description: 'Solving complex problems and mathematical puzzles',
        members: 32,
        meetingTime: 'Every Thursday 5:30 PM',
        location: 'Science Building Room 205'
      },
      {
        id: '3',
        name: 'Physics Society',
        description: 'Understanding the laws that govern our universe',
        members: 28,
        meetingTime: 'Every Monday 7:00 PM',
        location: 'Physics Lab A'
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'football',
    color: '#50C878',
    clubs: [
      {
        id: '4',
        name: 'Basketball Club',
        description: 'Competitive and recreational basketball',
        members: 60,
        meetingTime: 'Every Wednesday 4:00 PM',
        location: 'Sports Complex Court 1'
      },
      {
        id: '5',
        name: 'Soccer Team',
        description: 'University soccer team and training',
        members: 35,
        meetingTime: 'Every Friday 3:30 PM',
        location: 'University Field'
      },
      {
        id: '6',
        name: 'Swimming Club',
        description: 'Swimming lessons and competitive training',
        members: 42,
        meetingTime: 'Every Tuesday 5:00 PM',
        location: 'Aquatic Center'
      }
    ]
  },
  {
    id: 'creative',
    name: 'Creative & Fun',
    icon: 'color-palette',
    color: '#FF6B6B',
    clubs: [
      {
        id: '7',
        name: 'Art Club',
        description: 'Express yourself through various art forms',
        members: 38,
        meetingTime: 'Every Thursday 6:30 PM',
        location: 'Art Studio'
      },
      {
        id: '8',
        name: 'Photography Society',
        description: 'Capture moments and learn photography skills',
        members: 25,
        meetingTime: 'Every Saturday 10:00 AM',
        location: 'Media Center'
      },
      {
        id: '9',
        name: 'Drama Club',
        description: 'Acting, directing, and theatrical productions',
        members: 30,
        meetingTime: 'Every Monday 6:00 PM',
        location: 'Theater Building'
      }
    ]
  },
  {
    id: 'cultural',
    name: 'Cultural & Faith',
    icon: 'globe',
    color: '#9B59B6',
    clubs: [
      {
        id: '10',
        name: 'International Students Association',
        description: 'Connecting students from around the world',
        members: 85,
        meetingTime: 'Every Friday 5:00 PM',
        location: 'Student Center'
      },
      {
        id: '11',
        name: 'Christian Fellowship',
        description: 'Spiritual growth and community building',
        members: 55,
        meetingTime: 'Every Sunday 4:00 PM',
        location: 'Chapel'
      },
      {
        id: '12',
        name: 'Cultural Dance Group',
        description: 'Celebrating diversity through dance',
        members: 40,
        meetingTime: 'Every Wednesday 7:00 PM',
        location: 'Dance Studio'
      }
    ]
  },
  {
    id: 'political',
    name: 'Political',
    icon: 'people',
    color: '#E67E22',
    clubs: [
      {
        id: '13',
        name: 'Student Government',
        description: 'Representing student interests and organizing events',
        members: 15,
        meetingTime: 'Every Tuesday 5:00 PM',
        location: 'Student Union'
      },
      {
        id: '14',
        name: 'Debate Society',
        description: 'Engaging in meaningful discussions and debates',
        members: 35,
        meetingTime: 'Every Thursday 7:00 PM',
        location: 'Debate Hall'
      },
      {
        id: '15',
        name: 'Environmental Club',
        description: 'Promoting sustainability and environmental awareness',
        members: 48,
        meetingTime: 'Every Saturday 2:00 PM',
        location: 'Green Space'
      }
    ]
  },
  {
    id: 'wellbeing',
    name: 'Wellbeing',
    icon: 'heart',
    color: '#E74C3C',
    clubs: [
      {
        id: '16',
        name: 'Mental Health Support Group',
        description: 'Supporting mental health and wellness',
        members: 22,
        meetingTime: 'Every Monday 6:30 PM',
        location: 'Counseling Center'
      },
      {
        id: '17',
        name: 'Yoga Club',
        description: 'Mindfulness and physical wellness through yoga',
        members: 65,
        meetingTime: 'Every Tuesday 7:00 AM',
        location: 'Wellness Center'
      },
      {
        id: '18',
        name: 'Peer Support Network',
        description: 'Student-to-student support and mentoring',
        members: 30,
        meetingTime: 'Every Wednesday 5:30 PM',
        location: 'Student Services'
      }
    ]
  }
];

export default function ClubsScreen() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const renderClubCard = (club: Club) => (
    <View style={styles.clubCard}>
      <View style={styles.clubHeader}>
        <Text style={styles.clubName}>{club.name}</Text>
        <View style={styles.memberCount}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.memberText}>{club.members}</Text>
        </View>
      </View>
      <Text style={styles.clubDescription}>{club.description}</Text>
      {club.meetingTime && (
        <View style={styles.clubDetails}>
          <Ionicons name="time" size={14} color="#666" />
          <Text style={styles.detailText}>{club.meetingTime}</Text>
        </View>
      )}
      {club.location && (
        <View style={styles.clubDetails}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.detailText}>{club.location}</Text>
        </View>
      )}
    </View>
  );

  const renderCategory = (category: ClubCategory) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={[styles.categoryHeader, { backgroundColor: category.color }]}
        onPress={() => toggleCategory(category.id)}
        activeOpacity={0.8}
      >
        <View style={styles.categoryTitle}>
          <Ionicons name={category.icon} size={24} color="white" />
          <Text style={styles.categoryName}>{category.name}</Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.clubCount}>{category.clubs.length} clubs</Text>
          <Ionicons
            name={expandedCategory === category.id ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="white"
          />
        </View>
      </TouchableOpacity>
      
      {expandedCategory === category.id && (
        <View style={styles.clubsList}>
          {category.clubs.map(renderClubCard)}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <Text style={styles.title}>Student Clubs</Text>
        <Text style={styles.subtitle}>Discover and join amazing communities</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {clubCategories.map(renderCategory)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clubCount: {
    fontSize: 14,
    color: 'white',
    marginRight: 8,
  },
  clubsList: {
    padding: 20,
  },
  clubCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e9ecef',
  },
  clubHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  clubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  memberCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  clubDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  clubDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
});
