# Tax Calculator App

Welcome to the Tax Calculator App.

## Stack
- **Backend:** Node.js, Express.js, TypeScript
- **Frontend:** React, Material UI, Tailwind CSS
- **Testing:** Jest, React Testing Library, Cypress (E2E)
- **Logging:** Winston

## Get up and running

### 1. External API (Docker)
In order to run the required external API locally, please follow these instructions:

```bash
docker pull ptsdocker16/interview-test-server
docker run --init -p 5001:5001 -it ptsdocker16/interview-test-server
```

Navigate to [http://localhost:5001](http://localhost:5001) to view the documentation and available endpoints.

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

## Testing
To run tests for both parts of the application:

### Backend Tests
```bash
cd backend
npm run test
```

### Frontend Tests
```bash
cd frontend
npm run test
```

### E2E Tests (Cypress)
To run the E2E tests, make sure both the backend and frontend are running, then:
```bash
cd cypress
npm install
npm run test
```

## Production

### Build
Both the frontend and backend need to be built:

**Backend:**
```bash
cd backend
npm run build
```

**Frontend:**
```bash
cd frontend
npm run build
```

### Run
**Backend (Production):**
```bash
cd backend
npm run start
```

**Frontend (Preview):**
```bash
cd frontend
npm run preview
```

The preview command will start a static server and serve the production build of the frontend.
However, in a real production environment, the bundle should be served by a web server (e.g., Nginx, Apache) or a CDN.
