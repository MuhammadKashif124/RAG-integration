export interface PitchInput {
  business_model: string;
  competitors: string;
  current_stage: string;
  differentiators: string;
  funding_details: string;
  investor_type: string;
  market_impact: string;
  problem_description: string;
  solution_description: string;
  startup_name: string;
  target_customer: string;
}

export interface Competitor {
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
}

export interface PitchOutput {
  script_id: string;
  elevator_pitch: string;
  full_pitch: string;
  identified_competitors: Competitor[];
  market_insights: string;
} 