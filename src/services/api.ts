import axios from 'axios';
import { PitchInput, PitchOutput } from '../types';

const API_URL = 'https://4203-3-8-149-241.ngrok-free.app/api/v1';

export const generatePitch = async (pitchInput: PitchInput): Promise<PitchOutput> => {
  try {
    const response = await axios.post(`${API_URL}/generate-pitch`, pitchInput);
    return response.data;
  } catch (error) {
    console.error('Error generating pitch:', error);
    throw error;
  }
};

export const getScript = async (scriptId: string): Promise<PitchOutput> => {
  try {
    const response = await axios.get(`${API_URL}/scripts/${scriptId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching script:', error);
    throw error;
  }
};

export const getAllScripts = async (): Promise<PitchOutput[]> => {
  try {
    const response = await axios.get(`${API_URL}/scripts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all scripts:', error);
    throw error;
  }
}; 