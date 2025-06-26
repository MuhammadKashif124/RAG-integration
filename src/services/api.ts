import axios from 'axios';
import { PitchInput, PitchOutput, Competitor } from '../types';

const API_URL = 'https://92ea-18-170-120-114.ngrok-free.app/api/v1';

// Fallback data for when API returns placeholder values
const getVentureCapitalistFallbackData = (input: PitchInput): Partial<PitchOutput> => {
  return {
    market_insights: `Based on the information provided for ${input.startup_name}, this venture appears to be targeting the ${input.target_customer} segment with a ${input.business_model} business model. For ventures at the ${input.current_stage} stage, typical funding requirements align with your request for ${input.funding_details}. Market potential appears promising given your focus on solving ${input.problem_description}.`,
    
    elevator_pitch: `${input.startup_name} is a ${input.current_stage} startup that ${input.solution_description} to solve ${input.problem_description} for ${input.target_customer} using a ${input.business_model} model.`,
    
    full_pitch: `
${input.startup_name} is addressing a significant opportunity in the market by solving ${input.problem_description}. 

Our solution works by ${input.solution_description}, providing substantial value to ${input.target_customer}. 

We've implemented a ${input.business_model} business model, which allows us to scale effectively while maintaining strong unit economics. Currently at the ${input.current_stage} stage, we've already made significant progress toward product-market fit.

What sets us apart from competitors like ${input.competitors} is that ${input.differentiators}. This competitive advantage positions us to achieve ${input.market_impact}.

We're seeking ${input.funding_details} to accelerate our growth trajectory and capitalize on our early momentum in the market.
    `,
    
    identified_competitors: input.competitors ? input.competitors.split(',').map(name => ({
      name: name.trim(),
      description: `Competitor in the ${input.target_customer} market space.`,
      strengths: ["Established market presence"],
      weaknesses: ["Lacks the innovative approach that " + input.startup_name + " offers"]
    })) : []
  };
};

export const generatePitch = async (pitchInput: PitchInput): Promise<PitchOutput> => {
  try {
    const response = await axios.post(`${API_URL}/generate-pitch`, pitchInput);
    let data = response.data;
    
    // Check if this is a Venture Capitalist pitch with placeholder values
    if (pitchInput.investor_type === 'Venture Capitalist') {
      const hasPlaceholders = 
        data.market_insights?.includes('XXX') || 
        data.elevator_pitch?.includes('XXX') ||
        data.full_pitch?.includes('XXX');
      
      if (hasPlaceholders) {
        // Apply fallback data
        const fallbackData = getVentureCapitalistFallbackData(pitchInput);
        data = {
          ...data,
          ...fallbackData
        };
      }
    }
    
    return data;
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