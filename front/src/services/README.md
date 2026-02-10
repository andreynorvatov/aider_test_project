# Services Directory

This directory contains API service modules and external integrations.

## Structure
```
services/
├── api/            # API client and endpoints
│   ├── client.js   # Base API client (axios/fetch wrapper)
│   ├── auth.js     # Authentication endpoints
│   └── index.js    # API exports
├── storage/        # Local storage services
└── external/       # Third-party integrations
```

## Guidelines
- Centralize all API calls in service modules
- Handle errors consistently
- Implement request/response interceptors
- Use environment variables for API URLs
