# UIShop

This course is created to improve my skills and knowledge in a notebook about a commerce focus on the visual resources.

## Monorepo Structure

This project is organized as a monorepo containing both frontend and backend:

- **frontend/** - React + Vite + TypeScript with Mantine UI and React Icons
- **backend/** - Node.js + Express + TypeScript API

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

Install dependencies for all packages:

```bash
npm install
```

### Development

Run frontend development server:
```bash
npm run dev:frontend
```

Run backend development server:
```bash
npm run dev:backend
```

### Building

Build all projects:
```bash
npm run build
```

Build individual projects:
```bash
npm run build:frontend
npm run build:backend
```

## Project Details

### Frontend
- React 18+
- Vite (latest)
- TypeScript
- Mantine UI Components
- React Icons

### Backend
- Node.js with Express
- TypeScript
- REST API

## Deployment

The frontend is automatically built and deployed via GitHub Actions:
- On pull request creation and updates
- On push to main branch
