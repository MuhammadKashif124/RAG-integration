import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Card, Title, Paragraph, List, Divider } from 'react-native-paper';
import { PitchOutput } from '../types';

interface PitchResultProps {
  result: PitchOutput | null;
}

const PitchResult: React.FC<PitchResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Title style={styles.title}>Your Generated Pitch</Title>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Elevator Pitch</Title>
          <Paragraph>{result.elevator_pitch}</Paragraph>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Full Pitch</Title>
          <Paragraph>{result.full_pitch}</Paragraph>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Market Insights</Title>
          <Paragraph>{result.market_insights}</Paragraph>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Identified Competitors</Title>
          {result.identified_competitors.map((competitor, index) => (
            <View key={index} style={styles.competitorContainer}>
              {index > 0 && <Divider style={styles.divider} />}
              <List.Item
                title={competitor.name}
                description={competitor.description}
                titleStyle={styles.competitorName}
                descriptionNumberOfLines={10}
                descriptionStyle={styles.competitorDescription}
              />
              
              {competitor.strengths.length > 0 && (
                <View style={styles.listSection}>
                  <Paragraph style={styles.listTitle}>Strengths:</Paragraph>
                  {competitor.strengths.map((strength, idx) => (
                    <List.Item
                      key={idx}
                      title={strength}
                      left={() => <List.Icon icon="check" />}
                      titleStyle={styles.listItem}
                      titleNumberOfLines={5}
                      titleEllipsizeMode="tail"
                    />
                  ))}
                </View>
              )}
              
              {competitor.weaknesses.length > 0 && (
                <View style={styles.listSection}>
                  <Paragraph style={styles.listTitle}>Weaknesses:</Paragraph>
                  {competitor.weaknesses.map((weakness, idx) => (
                    <List.Item
                      key={idx}
                      title={weakness}
                      left={() => <List.Icon icon="close" />}
                      titleStyle={styles.listItem}
                      titleNumberOfLines={5}
                      titleEllipsizeMode="tail"
                    />
                  ))}
                </View>
              )}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: Platform.OS === 'android' ? 80 : 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  competitorContainer: {
    marginVertical: 8,
  },
  competitorName: {
    fontWeight: 'bold',
  },
  competitorDescription: {
    flexWrap: 'wrap',
  },
  divider: {
    marginVertical: 8,
  },
  listSection: {
    marginLeft: 16,
    marginTop: 4,
  },
  listTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'android' ? 80 : 16,
  },
});

export default PitchResult; 