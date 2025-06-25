import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Snackbar, FAB } from 'react-native-paper';
import PitchForm from '../components/PitchForm';
import PitchResult from '../components/PitchResult';
import { generatePitch } from '../services/api';
import { PitchInput, PitchOutput } from '../types';

const MainScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PitchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (data: PitchInput) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await generatePitch(data);
      setResult(response);
      setShowForm(false);
    } catch (err) {
      setError('Failed to generate pitch. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setShowForm(true);
    setResult(null);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })}
      >
        <View style={styles.container}>
          {showForm ? (
            <PitchForm onSubmit={handleSubmit} isLoading={isLoading} />
          ) : (
            <>
              <PitchResult result={result} />
              <FAB
                style={styles.fab}
                icon="arrow-left"
                onPress={handleBackToForm}
                label="New Pitch"
              />
            </>
          )}
          
          <Snackbar
            visible={!!error}
            onDismiss={() => setError(null)}
            action={{
              label: 'OK',
              onPress: () => setError(null),
            }}
          >
            {error}
          </Snackbar>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default MainScreen; 