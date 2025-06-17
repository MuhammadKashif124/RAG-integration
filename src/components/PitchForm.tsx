import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { PitchInput } from '../types';
import { samplePitchInput } from '../utils/sampleData';

interface PitchFormProps {
  onSubmit: (data: PitchInput) => void;
  isLoading: boolean;
}

const PitchForm: React.FC<PitchFormProps> = ({ onSubmit, isLoading }) => {
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

  return (
    <ScrollView style={styles.container}>
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
            label="What is the name of your startup?"
            value={formData.startup_name}
            onChangeText={(text) => handleChange('startup_name', text)}
            style={styles.input}
          />
          
          <TextInput
            label="Briefly describe the core problem your product solves."
            value={formData.problem_description}
            onChangeText={(text) => handleChange('problem_description', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="How does your product or solution work?"
            value={formData.solution_description}
            onChangeText={(text) => handleChange('solution_description', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="Who is your target customer or end user?"
            value={formData.target_customer}
            onChangeText={(text) => handleChange('target_customer', text)}
            style={styles.input}
          />
          
          <TextInput
            label="What's your business model? (e.g., subscription, B2B SaaS, marketplace)"
            value={formData.business_model}
            onChangeText={(text) => handleChange('business_model', text)}
            style={styles.input}
          />
          
          <TextInput
            label="What stage are you currently at? (idea, MVP, launched, early revenue, etc.)"
            value={formData.current_stage}
            onChangeText={(text) => handleChange('current_stage', text)}
            style={styles.input}
          />
          
          <TextInput
            label="Who are your known competitors (if any)?"
            value={formData.competitors}
            onChangeText={(text) => handleChange('competitors', text)}
            style={styles.input}
          />
          
          <TextInput
            label="What makes your startup different or better than those competitors?"
            value={formData.differentiators}
            onChangeText={(text) => handleChange('differentiators', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="What impact do you expect your product to have once it's on the market?"
            value={formData.market_impact}
            onChangeText={(text) => handleChange('market_impact', text)}
            style={styles.input}
            multiline
          />
          
          <TextInput
            label="How much funding are you seeking, and what will it be used for?"
            value={formData.funding_details}
            onChangeText={(text) => handleChange('funding_details', text)}
            style={styles.input}
          />
          
          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Generate Pitch
          </Button>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  button: {
    marginTop: 20,
    marginBottom: 40,
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
});

export default PitchForm; 