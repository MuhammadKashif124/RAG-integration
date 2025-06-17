# Backend Integration Guide

This document explains how the StartupPal application's backend API was integrated into the React Native UI.

## Overview
The app connects to a backend API (documented via Swagger at https://4203-3-8-149-241.ngrok-free.app/docs) to generate startup pitch scripts based on user input. The integration covers:
- API service setup
- Type definitions
- UI data flow

---

## 1. API Service Setup

**File:** `StartupPalApp/src/services/api.ts`

- Uses `axios` to interact with the backend API.
- The base URL is set to the Swagger endpoint:
  ```js
  const API_URL = 'https://4203-3-8-149-241.ngrok-free.app/api/v1';
  ```
- Exposes three main functions:
  - `generatePitch(pitchInput: PitchInput): Promise<PitchOutput>`: POSTs user data to `/generate-pitch`.
  - `getScript(scriptId: string): Promise<PitchOutput>`: GETs a specific script by ID.
  - `getAllScripts(): Promise<PitchOutput[]>`: GETs all scripts.

---

## 2. Type Definitions

**File:** `StartupPalApp/src/types/index.ts`

Defines TypeScript interfaces for request and response data:
- `PitchInput`: Structure for user input sent to the backend.
- `PitchOutput`: Structure for the backend's response, including pitch scripts and competitor analysis.
- `Competitor`: Details for each identified competitor.

---

## 3. UI Data Flow

### Main Screen
**File:** `StartupPalApp/src/screens/MainScreen.tsx`
- Manages UI state and handles form submission.
- Calls `generatePitch` from the API service with user input.
- Displays results using the `PitchResult` component.

### Pitch Form
**File:** `StartupPalApp/src/components/PitchForm.tsx`
- Collects user input for all required fields.
- On submit, passes data to the parent (`MainScreen`).

### Pitch Result
**File:** `StartupPalApp/src/components/PitchResult.tsx`
- Receives and displays the pitch and competitor analysis returned from the backend.

---

## 4. Sample Data

**File:** `StartupPalApp/src/utils/sampleData.ts`
- Provides a sample `PitchInput` object for quick testing.

---

## 5. How It Works (Step-by-Step)
1. User fills out the form in `PitchForm` and submits.
2. `MainScreen` receives the data and calls `generatePitch` from `api.ts`.
3. The backend processes the request and returns pitch scripts and competitor analysis.
4. The result is displayed in `PitchResult`.

---

## 6. Changing the Backend URL
- Update the `API_URL` constant in `src/services/api.ts` to point to a different backend if needed.

---


npm install @expo/ngrok@^4.1.0


nohup npx expo start --tunnel > expo.log 2>&1 &

npx expo start --tunnel

## 7. References
- [Backend Swagger Docs](https://4203-3-8-149-241.ngrok-free.app/docs)
- [API Service Code](src/services/api.ts)
- [Type Definitions](src/types/index.ts)
- [Main Screen](src/screens/MainScreen.tsx)
- [Pitch Form](src/components/PitchForm.tsx)
- [Pitch Result](src/components/PitchResult.tsx)
- [Sample Data](src/utils/sampleData.ts) 