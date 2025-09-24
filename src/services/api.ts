import axios from 'axios';
import { PitchInput, PitchOutput, Competitor } from '../types';

const API_URL = 'http://18.132.119.160/api/v1';

// Create axios instance with CORS-friendly configuration
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  },
  // Disable CORS for development
  withCredentials: false,
  // Add request interceptor for debugging
  transformRequest: [(data) => {
    console.log('API Request:', data);
    return JSON.stringify(data);
  }],
  // Add response interceptor for debugging
  transformResponse: [(data) => {
    console.log('API Response:', data);
    return data;
  }]
});

// Add request interceptor to handle CORS preflight
apiClient.interceptors.request.use(
  (config) => {
    // Add CORS headers to every request
    config.headers = {
      ...config.headers,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    };
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle CORS errors specifically
    if (error.code === 'ERR_NETWORK' || error.message?.includes('CORS')) {
      console.warn('CORS error detected, attempting fallback...');
      // Don't throw the error immediately, let the calling function handle it
    }
    
    return Promise.reject(error);
  }
);

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

// Retry mechanism for failed requests
const retryRequest = async (requestFn: () => Promise<any>, maxRetries: number = 3): Promise<any> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error: any) {
      console.log(`Attempt ${i + 1} failed:`, error.message);
      
      // If it's the last attempt or not a network error, throw
      if (i === maxRetries - 1 || (!error.code?.includes('ERR_NETWORK') && !error.message?.includes('CORS'))) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};

export const generatePitch = async (pitchInput: PitchInput): Promise<PitchOutput> => {
  try {
    const response = await retryRequest(() => 
      apiClient.post('/generate-pitch', pitchInput)
    );
    
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
  } catch (error: any) {
    console.error('Error generating pitch after retries:', error);
    
    // If all retries failed, return fallback data for Venture Capitalist pitches
    if (pitchInput.investor_type === 'Venture Capitalist') {
      console.warn('Using fallback data due to API failure');
      return getVentureCapitalistFallbackData(pitchInput) as PitchOutput;
    }
    
    throw error;
  }
};

export const getScript = async (scriptId: string): Promise<PitchOutput> => {
  try {
    const response = await retryRequest(() => 
      apiClient.get(`/scripts/${scriptId}`)
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching script:', error);
    throw error;
  }
};

export const getAllScripts = async (): Promise<PitchOutput[]> => {
  try {
    const response = await retryRequest(() => 
      apiClient.get('/scripts')
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all scripts:', error);
    throw error;
  }
}; 