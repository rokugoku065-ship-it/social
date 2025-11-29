/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BACKEND_API: 'http://localhost:5000',
    NEXTAUTH_URL: 'http://localhost:3001',
    NEXTAUTH_SECRET: 'secure_jwt_secret_key_123',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'your-google-client-secret',
  },
};

export default nextConfig;
