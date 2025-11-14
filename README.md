# Inside Notes - Enterprise Audio Transcription Platform

## Project Overview
Inside Notes is an advanced audio transcription and enterprise management platform designed for professional environments.

### Technology Stack
- **Frontend**: React Native + Expo
- **Backend**: Node.js Express
- **Database**: PostgreSQL
- **Authentication**: JWT
- **AI Integration**: Gemini API

### Deployment Configuration
- **Domain**: notes.inside.dev.br
- **SSL Management**: Managed by Coolify
- **Port**: Custom port configuration (3001)

### Prerequisites
- Docker
- Docker Compose
- Coolify Platform

### Environment Setup
1. Clone the repository
2. Copy `.env.example` to `.env`
3. Fill in required environment variables
4. Run `docker-compose up -d`

### Environment Variables
Refer to `.env` file for configuration details. Required variables include:
- `API_KEY`: Gemini API connection key
- `JWT_SECRET`: Authentication secret
- `PG_DATABASE`: PostgreSQL database name
- `PG_HOST`: PostgreSQL host
- `PG_PORT`: PostgreSQL port
- `PG_USER`: PostgreSQL username
- `PG_PASSWORD`: PostgreSQL password

### Deployment Notes
- SSL is automatically managed by Coolify
- Custom port (3001) used to avoid conflicts
- Traefik handles routing and SSL certification

### Monitoring
- Health check implemented
- Restart policy: Unless stopped

### Troubleshooting
- Check Docker logs for detailed error information
- Verify environment variable configurations
- Ensure network connectivity

### Maintenance
Regular updates and security patches are recommended.

## License
[Insert Appropriate License]
