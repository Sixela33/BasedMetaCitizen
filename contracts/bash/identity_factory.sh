
forge build --via-ir


# Copy the abis to the frontend
cp ./out/IdentityFactory.sol/IdentityFactory.json ../frontend/lib/abis/IdentityFactory.json
cp ./out/Identity.sol/Identity.json ../frontend/lib/abis/Identity.json
cp ./out/ClaimManager.sol/ClaimManager.json ../frontend/lib/abis/ClaimManager.json
cp ./out/TokenCompliance.sol/TokenCompliance.json ../frontend/lib/abis/TokenCompliance.json

# Copy the abis to the backend
cp ./out/IdentityFactory.sol/IdentityFactory.json ../backend/src/abis/IdentityFactory.json
cp ./out/Identity.sol/Identity.json ../backend/src/abis/Identity.json
cp ./out/ClaimManager.sol/ClaimManager.json ../backend/src/abis/ClaimManager.json
cp ./out/TokenCompliance.sol/TokenCompliance.json ../backend/src/abis/TokenCompliance.json
cp ./out/Token.sol/Token.json ../backend/src/abis/Token.json
cp ./out/TokenFactory.sol/TokenFactory.json ../backend/src/abis/TokenFactory.json
