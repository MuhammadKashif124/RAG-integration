// Simple test to verify API response structure
const testData = {
  "business_model": "Freemium with premium features for advanced analytics",
  "competitors": "DataPulse, InsightTrack, Generic BI tools",
  "current_stage": "Seed stage with 5 pilot customers",
  "differentiators": "Our platform offers real-time predictive analytics tailored for small businesses, unlike competitors' generic dashboards",
  "funding_details": "$750K for product development and customer acquisition",
  "investor_type": "Venture Capitalist",
  "market_impact": "We aim to empower 10,000 small businesses with data-driven decisions within 3 years",
  "problem_description": "Small businesses lack access to affordable, real-time data analytics to compete effectively.",
  "solution_description": "Our AI-driven platform provides predictive insights and actionable recommendations for small businesses.",
  "startup_name": "Test Startup",
  "target_customer": "Small businesses with 10-50 employees in retail and hospitality"
};

// Test the API endpoint
fetch('http://18.132.119.160/api/v1/generate-pitch', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testData)
})
.then(response => {
  console.log('Response status:', response.status);
  console.log('Response headers:', response.headers);
  return response.text();
})
.then(data => {
  console.log('Raw response:', data);
  try {
    const parsed = JSON.parse(data);
    console.log('Parsed response:', JSON.stringify(parsed, null, 2));
    
    // Check required fields
    console.log('Has script_id:', !!parsed.script_id);
    console.log('Has elevator_pitch:', !!parsed.elevator_pitch);
    console.log('Has full_pitch:', !!parsed.full_pitch);
    console.log('Has market_insights:', !!parsed.market_insights);
    console.log('Has identified_competitors:', !!parsed.identified_competitors);
    console.log('Competitors is array:', Array.isArray(parsed.identified_competitors));
    console.log('Number of competitors:', parsed.identified_competitors?.length || 0);
  } catch (e) {
    console.error('Parse error:', e);
  }
})
.catch(error => {
  console.error('Fetch error:', error);
});
