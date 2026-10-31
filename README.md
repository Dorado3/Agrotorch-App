# AgroTorch AgriOS

AgroTorch is a mobile-first farm operations and decision-support platform.

## Development

- npm install
- npm run dev
- npm test
- npm run build

## Current architecture

- Vite + vanilla JavaScript application shell
- Installable PWA manifest and cached application shell
- Firebase Authentication and Firestore farm records
- User-scoped Firestore activity, expense, harvest, sales and task records
- Local-first record entry with pending-write retry when connectivity returns
- Crop calendar and evidence-aware CDRE decision support

## CDRE evidence policy

The CDRE distinguishes verified risk signals from missing data. Weather is marked unavailable until a weather provider is configured; it is not replaced with sample weather. Crop stage is an estimate based on the recorded planting/transplant date and must be confirmed in the field. Chemical rates and disease diagnoses are not generated from weather proxies.

## Firebase security

The repository includes firestore.rules and firestore.indexes.json for the six collections used by the app plus user profiles. Review these rules against the existing Firebase project and any historical records before deploying them. The rules intentionally deny access to unlisted collections.

After reviewing the rules, select the intended Firebase project and deploy only Firestore rules and indexes with the Firebase CLI. The target project configured in the client is greenmarket-d3ffc. The deployment command has not been run from this development workflow.

Existing documents created under legacy user identifiers may need a controlled migration to the current Firebase Auth UID before they become visible under the new owner-scoped queries.

## PWA behavior

The application shell and same-origin static assets are cached for offline reopening. Firestore requests are not intercepted by the service worker. Farm records are cached locally and queued for retry; first-time login and live cloud sync still require connectivity.

## Production checks

Before release, verify Firebase Authentication settings, Firestore rules, Storage rules if file uploads are enabled, hosting configuration, API integrations, and an end-to-end test using a non-production farmer account.
