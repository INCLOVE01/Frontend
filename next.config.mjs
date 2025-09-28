/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns : [new URL('https://images.pexels.com/photos/**'), new URL('https://img.icons8.com/**'), new URL('https://dummyjson.com/**'), new URL('https://www.shutterstock.com/**')]
    }
};

export default nextConfig;

