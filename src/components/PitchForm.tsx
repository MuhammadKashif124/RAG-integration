import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Keyboard, Platform } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { PitchInput } from '../types';
import { samplePitchInput } from '../utils/sampleData';

interface PitchFormProps {
  onSubmit: (data: PitchInput) => void;
  isLoading: boolean;
}

const PitchForm: React.FC<PitchFormProps> = ({ onSubmit, isLoading }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [formData, setFormData] = useState<PitchInput>({
    startup_name: '',
    problem_description: '',
    solution_description: '',
    business_model: '',
    target_customer: '',
    competitors: '',
    differentiators: '',
    current_stage: '',
    funding_details: '',
    investor_type: '',
    market_impact: '',
  });

  const [selectedInvestorType, setSelectedInvestorType] = useState<string | null>(null);

  const handleChange = (field: keyof PitchInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    onSubmit(formData);
  };

  const fillSampleData = () => {
    setFormData(samplePitchInput);
    setSelectedInvestorType(samplePitchInput.investor_type);
  };

  const selectInvestorType = (type: string) => {
    setSelectedInvestorType(type);
    handleChange('investor_type', type);
  };

  // Scroll to bottom when focusing on the last input
  const handleFocusLastInput = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <ScrollView 
      style={styles.container}
      ref={scrollViewRef}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <Text style={styles.title}>Generate Your Startup Pitch</Text>
      
      <View style={styles.sampleButtonContainer}>
        <Button 
          mode="outlined" 
          onPress={fillSampleData}
          style={styles.sampleButton}
        >
          Fill Sample Data
        </Button>
      </View>

      {!selectedInvestorType ? (
        <View style={styles.investorTypeContainer}>
          <Text style={styles.questionText}>Who is your pitch intended for?</Text>
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={() => selectInvestorType('Angel Investor')}
              style={styles.investorButton}
              icon="target"
            >
              🎯 Angel Investor
            </Button>
            <Button 
              mode="contained" 
              onPress={() => selectInvestorType('Venture Capitalist')}
              style={styles.investorButton}
              icon="briefcase"
            >
              💼 Venture Capitalist
            </Button>
          </View>
        </View>
      ) : (
        <>
          <Card style={styles.selectedTypeCard}>
            <Card.Content>
              <Text style={styles.selectedTypeText}>Selected: {selectedInvestorType}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setSelectedInvestorType(null)}>Change</Button>
            </Card.Actions>
          </Card>

          <TextInput
            label="Startup name?"
            value={formData.startup_name}
            onChangeText={(text) => handleChange('startup_name', text)}
            style={styles.input}
          />
          
          <TextInput
            label="What problem does it solve?"
            value={formData.problem_description}
            onChangeText={(text) => handleChange('problem_description', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="How does it work?"
            value={formData.solution_description}
            onChangeText={(text) => handleChange('solution_description', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="Who are your users?"
            value={formData.target_customer}
            onChangeText={(text) => handleChange('target_customer', text)}
            style={styles.input}
          />
          
          <TextInput
            label="Business model? (e.g., subscription, B2B, SaaS)"
            value={formData.business_model}
            onChangeText={(text) => handleChange('business_model', text)}
            style={styles.input}
          />
          
          <TextInput
            label="What stage are you at?"
            value={formData.current_stage}
            onChangeText={(text) => handleChange('current_stage', text)}
            style={styles.input}
          />
          
          <TextInput
            label="Any known competitors?"
            value={formData.competitors}
            onChangeText={(text) => handleChange('competitors', text)}
            style={styles.input}
          />
          
          <TextInput
            label="What makes you stand out?"
            value={formData.differentiators}
            onChangeText={(text) => handleChange('differentiators', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="Expected market impact?"
            value={formData.market_impact}
            onChangeText={(text) => handleChange('market_impact', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="How much funding and why?"
            value={formData.funding_details}
            onChangeText={(text) => handleChange('funding_details', text)}
            style={styles.input}
            onFocus={handleFocusLastInput}
          />
          
          <View style={styles.generateButtonContainer}>
            <Button 
              mode="contained" 
              onPress={handleSubmit} 
              loading={isLoading}
              disabled={isLoading}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
              icon="rocket-launch"
            >
              Generate Pitch
            </Button>
          </View>
        </>
      )}
      
      {/* Extra padding at the bottom to ensure scrollability */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  generateButtonContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 8,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonContent: {
    paddingVertical: 10,
    height: 56,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sampleButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  sampleButton: {
    marginBottom: 10,
  },
  investorTypeContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  investorButton: {
    paddingVertical: 8,
  },
  selectedTypeCard: {
    marginBottom: 20,
  },
  selectedTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomPadding: {
    height: 80,
  },
});

export default PitchForm; 