import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
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
      
      <TextInput
        label="Startup Name"
        value={formData.startup_name}
        onChangeText={(text) => handleChange('startup_name', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Problem Description"
        value={formData.problem_description}
        onChangeText={(text) => handleChange('problem_description', text)}
        style={styles.input}
        multiline
      />
      
      <TextInput
        label="Solution Description"
        value={formData.solution_description}
        onChangeText={(text) => handleChange('solution_description', text)}
        style={styles.input}
        multiline
      />
      
      <TextInput
        label="Business Model"
        value={formData.business_model}
        onChangeText={(text) => handleChange('business_model', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Target Customer"
        value={formData.target_customer}
        onChangeText={(text) => handleChange('target_customer', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Competitors"
        value={formData.competitors}
        onChangeText={(text) => handleChange('competitors', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Differentiators"
        value={formData.differentiators}
        onChangeText={(text) => handleChange('differentiators', text)}
        style={styles.input}
        multiline
      />
      
      <TextInput
        label="Current Stage"
        value={formData.current_stage}
        onChangeText={(text) => handleChange('current_stage', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Funding Details"
        value={formData.funding_details}
        onChangeText={(text) => handleChange('funding_details', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Investor Type"
        value={formData.investor_type}
        onChangeText={(text) => handleChange('investor_type', text)}
        style={styles.input}
      />
      
      <TextInput
        label="Market Impact"
        value={formData.market_impact}
        onChangeText={(text) => handleChange('market_impact', text)}
        style={styles.input}
        multiline
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
});

export default PitchForm; 