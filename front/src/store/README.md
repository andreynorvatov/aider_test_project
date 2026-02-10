# Store Directory

This directory contains state management configuration and slices.

## Structure (Redux Toolkit example)
```
store/
├── index.js        # Store configuration
├── slices/         # Feature slices
│   ├── authSlice.js
│   ├── userSlice.js
│   └── uiSlice.js
├── middleware/     # Custom middleware
└── selectors/      # Reusable selectors
```

## Alternative: Zustand
```
store/
├── index.js        # Combined stores
├── authStore.js
├── userStore.js
└── uiStore.js
```

## Guidelines
- Keep state normalized
- Use selectors for derived data
- Separate concerns by feature
