# Trusted Execution Environment (TEE) Integration

Prompty provides a robust privacy guarantee: **we do not log or store prompt content.**
To cryptographically prove this claim to users, Prompty can be deployed inside a **Trusted Execution Environment (TEE)** using Intel SGX / TDX or AMD SEV. This ensures the host system (or cloud provider) cannot inspect the memory of the application while it processes prompts.

## How It Works

We've integrated the `@phala/dstack-sdk` and provided a `Dockerfile` with a `compose.yaml` file so you can easily deploy Prompty onto TEE networks like the [Phala Network Cloud](#) or Automata.

### 1. Cryptographic Attestation API

Once deployed in a TEE, you can verify the integrity of the server by hitting the new attestation endpoint:
```bash
GET /api/tee/quote
```

This endpoint interacts with the dstack host to fetch a hardware-level quote (attestation). A valid quote proves to the end-user that the application is running inside a secure enclave and the code has not been tampered with.

## Deployment Instructions (Phala Network / Dstack)

To run Prompty in a TEE:

1. **Build the Docker Image**
   Push the image to a public or private container registry.
   ```bash
   docker build -t your-registry/prompty:tee .
   docker push your-registry/prompty:tee
   ```

2. **Update compose.yaml**
   Modify the `compose.yaml` file to point to your hosted Docker image and provide any required environment variables (e.g. database credentials).

3. **Deploy via Phala Cloud or dstack CLI**
   You can deploy this directly to Phala's CVMs using the dstack CLI.
   ```bash
   # Install dstack
   npm install -g @phala/dstack-cli

   # Deploy the compose file
   dstack deploy -f compose.yaml
   ```

Once deployed, the `prompty` service will be able to access the local TEE endpoint to request quotes and prove its privacy!
