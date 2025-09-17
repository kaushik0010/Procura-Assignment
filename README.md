# Procura Business - Microservices Assignment

This repository contains a microservices-based backend using NestJS and PostgreSQL, with a simple Next.js frontend for interaction.

## Architecture

- **Monorepo:** Managed with Nx.
- **API Gateway (`api-gateway`):** Public REST API, handles auth and routing.
- **Products Service (`products-service`):** Manages product data.
- **Orders Service (`orders-service`):** Manages orders and communicates with the Products Service.
- **Web Client (`web-client`):** A simple Next.js UI.
- **Database:** A single PostgreSQL instance shared by the services (using different schemas implicitly via tables).
- **Transport:** REST for public API, TCP for inter-service communication.



## How to Run

### Prerequisites
- Docker
- Docker Compose

### Steps
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd procura-app
   ```

2. Build and start all services using Docker Compose:
   ```bash
   docker-compose up --build
   ```
   This command will build the Docker images for all applications and start the containers.

3. Access the applications:
   - **Frontend UI:** [http://localhost:4200](http://localhost:4200)
   - **API Gateway (Swagger Docs):** [http://localhost:3000/api](http://localhost:3000/api)

## Usage

1. Open the **Frontend UI** at [http://localhost:4200](http://localhost:4200).
2. Click the "Login" button to get a JWT.
3. Once logged in, you can use the "Fetch Products" button.
4. You can use the **Swagger UI** at [http://localhost:3000/api](http://localhost:3000/api) to explore and test all API endpoints. Remember to authorize your requests by pasting the JWT into the "Authorize" dialog.