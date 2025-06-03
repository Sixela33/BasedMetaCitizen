# 🌐 MetaCitizen (BasedMetaCitizen)

**A Decentralized Identity Platform for Compliant DeFi Interactions**

MetaCitizen is an innovative on-chain identity platform that enables decentralized protocols to distinguish between real users while maintaining privacy and compliance. Built to combat money laundering and enable compliant interactions in the DeFi ecosystem, MetaCitizen provides a robust foundation for identity verification without compromising user privacy.

## 🎯 Features

### 🔐 **Decentralized Identity System**
- **Privacy-Preserving Claims**: Users prove specific attributes without exposing their entire identity
- **Attestation Registry**: Decentralized system for managing identity claims and verifications
- **ZK-Proof Support**: Zero-knowledge proof verification for enhanced privacy

### 🏛️ **Compliance-Focused Architecture**
- **Custom Compliance Rules**: Protocols can define their own compliance requirements
- **Modular Compliance System**: Pluggable compliance modules for different use cases
- **Real-time Verification**: Instant verification of user compliance status

### 🔗 **DeFi Integration**
- **Token Compliance**: Built-in compliance checking for token transfers
- **Protocol Interoperability**: Easy integration with existing DeFi protocols
- **Transfer Restrictions**: Configurable rules for compliant asset transfers

### 🌍 **Multi-Regional Support**
- **Jurisdiction-Specific Rules**: Support for different regulatory requirements
- **Geo-compliance**: Location-based compliance verification
- **KYC Integration**: Seamless integration with KYC providers like SumSub

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 with React 19, TailwindCSS, and Privy authentication
- **Backend**: NestJS with TypeORM, PostgreSQL, and JWT authentication
- **Database**: PostgreSQL 16
- **Smart Contracts**: Solidity with Foundry framework
- **Deployment**: Docker & Docker Compose

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[Organization Portal]
        B[Landing Page]
        C[Demo Applications]
    end
    
    subgraph "Backend Services"
        D[NestJS API]
        E[Authentication Service]
        F[KYC Service - SumSub]
        G[Blockchain Service]
    end
    
    subgraph "Smart Contracts"
        H[Identity Contract]
        I[Claim Manager]
        J[Token Compliance]
        K[Compliance Modules]
    end
    
    subgraph "External Services"
        L[SumSub KYC]
        M[Privy Auth]
        N[Blockchain Networks]
    end
    
    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    D --> G
    F --> L
    E --> M
    G --> H
    G --> I
    G --> J
    H --> I
    J --> K
    G --> N
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for development)
- pnpm (package manager)
- PostgreSQL
- Foundry (for smart contracts)

### Production Deployment

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd BasedMetaCitizen
   ```

2. **Deploy with Docker:**
   ```bash
   ./deploy.sh
   ```
   
   Or manually:
   ```bash
   docker-compose up -d --build
   ```

3. **Access the application:**
   - 🌐 Frontend: http://localhost:3000
   - 🔧 Backend API: http://localhost:3001
   - 🗄️ Database: localhost:5432

### Development Setup

1. **Smart Contracts Setup:**
   ```bash
   cd contracts
   forge install
   forge build
   forge test
   
   # Deploy contracts
   forge script script/Deploy.s.sol --rpc-url <your_rpc_url> --private-key <your_private_key>
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   pnpm install
   
   # Set up environment variables
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start PostgreSQL database
   docker-compose up postgres -d
   
   # Run the backend
   pnpm start:dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   pnpm install
   
   # Set up environment variables
   cp .env.example .env.local
   # Edit .env.local with your configuration
   
   # Start the development server
   pnpm dev
   ```

4. **Landing Page Setup:**
   ```bash
   cd landing
   pnpm install
   pnpm dev
   ```

## 📁 Project Structure

```
BasedMetaCitizen/
├── frontend/          # Next.js application (Organization Portal)
│   ├── app/          # App Router pages
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── Dockerfile    # Frontend container
├── backend/          # NestJS API
│   ├── src/          # Source code
│   ├── test/         # Test files
│   └── Dockerfile    # Backend container
├── contracts/        # Smart contracts (Foundry)
│   ├── src/          # Solidity contracts
│   ├── script/       # Deployment scripts
│   └── test/         # Contract tests
├── landing/          # Marketing website
├── docker-compose.yml # Orchestration
└── deploy.sh         # Deployment script
```

## 🔧 Core Components

### Smart Contracts

#### Identity Contract
The core identity contract that manages user claims and attestations.

```mermaid
classDiagram
    class Identity {
        +mapping claims
        +ClaimManager claimManager
        +addClaim(uint256 claim, string data)
        +removeClaim(uint256 claim)
        +hasClaim(uint256 claim) bool
    }
    
    class ClaimManager {
        +mapping activeClaimIssuers
        +mapping possibleClaims
        +addClaimIssuer(address issuer, uint256[] claims)
        +removeClaimIssuer(address issuer)
        +isValidClaim(address issuer, uint256 claim) bool
    }
    
    class TokenCompliance {
        +uint256[] requiredClaims
        +address[] transferComplianceModules
        +canTransfer(address from, address to, uint256 amount) bool
        +tokensTransfered(address from, address to, uint256 amount)
    }
    
    Identity --> ClaimManager
    TokenCompliance --> Identity
```

#### Claim Types
MetaCitizen supports various types of claims for different compliance requirements:

- **Identity Verification**: Basic KYC completion status
- **Residency Proof**: Geographic location verification
- **Accredited Investor**: Investment qualification status
- **Sanctions Check**: Anti-money laundering compliance
- **Custom Claims**: Protocol-specific requirements

## 🐳 Docker Services

| Service  | Port | Description |
|----------|------|-------------|
| frontend | 3000 | Next.js web application |
| backend  | 3001 | NestJS API server |
| postgres | 5432 | PostgreSQL database |

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL=postgresql://user:password@postgres:5432/metacitizen
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=metacitizen
DB_PASSWORD=your_password
DB_NAME=metacitizen_db

# SumSub Configuration
SUMSUB_SECRET_KEY=your_sumsub_secret
SUMSUB_APP_TOKEN=your_sumsub_app_token

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Blockchain Configuration
RPC_URL=your_rpc_url
PRIVATE_KEY=your_private_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USERS_API_URL=http://localhost:3001
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
```

## 📋 Available Commands

```bash
# Deployment
./deploy.sh                    # Full deployment
docker-compose up -d          # Start services
docker-compose down           # Stop services
docker-compose logs -f        # View logs

# Development
pnpm dev                      # Start development (frontend)
pnpm start:dev               # Start development (backend)
pnpm build                   # Build for production
pnpm test                    # Run tests

# Smart Contracts
forge build                  # Compile contracts
forge test                   # Run contract tests
forge script <script>        # Deploy contracts
```

## 📡 API Reference

### Authentication Endpoints

#### Get Access Token
```http
GET /auth/token
Authorization: Bearer <jwt_token>
```

### KYC Endpoints

#### Get SumSub Access Token
```http
GET /sumsub/access-token
Authorization: Bearer <jwt_token>
```

#### Get KYC Status
```http
GET /sumsub/kyc-status
Authorization: Bearer <jwt_token>
```

### Blockchain Endpoints

#### Verify Identity
```http
POST /blockchain/verify-identity
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "address": "0x...",
  "claimType": 1
}
```

## 🧪 Testing

### Smart Contracts
```bash
cd contracts
forge test -vvv
```

### Backend
```bash
cd backend
pnpm test
pnpm test:e2e
```

### Frontend
```bash
cd frontend
pnpm test
```

## 🌐 Production Deployment Options

### 1. **VPS/Cloud Server** (Recommended)
- Use the provided Docker setup
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Configure environment variables

### 2. **Container Platforms**
- **Docker Swarm**: Scale horizontally
- **Kubernetes**: Enterprise-grade orchestration
- **Cloud Run**: Serverless containers

### 3. **Platform as a Service**
- **Railway**: Easy Docker deployment
- **Render**: Git-based deployment
- **DigitalOcean App Platform**: Managed containers

## 🤝 Integration Guide

### Integrating with Your DeFi Protocol

1. **Deploy Token Compliance Contract**
```solidity
TokenCompliance compliance = new TokenCompliance(
    tokenAddress,
    requiredClaims,
    complianceModules
);
```

2. **Check User Compliance**
```solidity
bool canTransfer = compliance.canTransfer(
    fromIdentity,
    toIdentity,
    amount
);
```

3. **Frontend Integration**
```typescript
import { MetaCitizenSDK } from '@metacitizen/sdk';

const sdk = new MetaCitizenSDK({
  apiUrl: 'https://api.metacitizen.io',
  contractAddress: '0x...'
});

const isCompliant = await sdk.checkCompliance(userAddress, requiredClaims);
```

## 🛡️ Security Considerations

- [ ] **Private Key Management**: Never commit private keys to version control
- [ ] **Environment Variables**: Use secure environment variable management for secrets
- [ ] **Access Control**: Implement proper role-based access control
- [ ] **Rate Limiting**: Configure appropriate rate limits for API endpoints
- [ ] **Data Encryption**: Encrypt sensitive user data at rest and in transit
- [ ] **SSL/TLS Certificates**: Set up proper HTTPS certificates
- [ ] **Firewall Rules**: Configure appropriate network security
- [ ] **Container Security**: Use non-root user in containers
- [ ] **Monitoring and Logging**: Set up comprehensive monitoring

## 🛣️ Roadmap

- [ ] **Q1 2024**: Multi-chain support (Polygon, Arbitrum)
- [ ] **Q2 2024**: Enhanced privacy features with zk-SNARKs
- [ ] **Q3 2024**: Governance token and DAO implementation
- [ ] **Q4 2024**: Advanced compliance modules and reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📚 Documentation

For detailed documentation, visit our [Documentation Portal](https://docs.metacitizen.io).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Foundry](https://getfoundry.sh/) for smart contract development
- Powered by [Next.js](https://nextjs.org/) for the frontend
- Backend built with [NestJS](https://nestjs.com/)
- KYC integration with [SumSub](https://sumsub.com/)
- Authentication powered by [Privy](https://privy.io/)

## 📞 Support

- 📧 Email: support@metacitizen.io
- 💬 Discord: [Join our community](https://discord.gg/metacitizen)
- 🐦 Twitter: [@MetaCitizenIO](https://twitter.com/MetaCitizenIO)

---

**Built with ❤️ by the MetaCitizen Team** 