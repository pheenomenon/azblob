# Azure Blob Storage Project

This project provides functionality to interact with Azure Blob Storage.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Azure Storage credentials:
```
AZURE_STORAGE_CONNECTION_STRING=your_connection_string
```

3. Start the development server:
```bash
npm run dev
```

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot reload
- `npm test`: Run tests

## Project Structure

```
azblob/
├── src/
│   ├── index.js        # Entry point
│   ├── config/         # Configuration files
│   ├── routes/         # API routes
│   └── services/       # Business logic
├── tests/              # Test files
├── .env               # Environment variables (create this)
└── README.md          # This file
``` 