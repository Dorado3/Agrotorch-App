# AgroTorch AgriOS

AgroTorch is a mobile-first farm operations and decision-support platform.

## Development

- `npm install`
- `npm run dev`
- `npm test`
- `npm run build`

## Current architecture

- Vite + vanilla JavaScript application shell
- Firebase Authentication and Firestore farm records
- Browser-local activity, expense, harvest, sales and task records
- Crop calendar and rule-based CDRE decision support

## CDRE evidence policy

The CDRE distinguishes verified risk signals from missing data. Weather is marked unavailable until a weather provider is configured; it is not replaced with sample weather. Crop stage is an estimate based on the recorded planting/transplant date and must be confirmed in the field. Chemical rates and disease diagnoses are not generated from weather proxies.

## Important production checks

Before production release, verify Firebase Authentication settings, Firestore security rules, Storage rules, hosting configuration, API integrations, and an end-to-end test using a non-production farmer account.
