import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_HOST_NAME ?? "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_HOST_NAME ?? "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.adsttc.com",
        pathname: "/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
    // @ts-ignore: Turbopack root is valid but might not be in the current types
    turbopack: {
      root: ".", 
    },
  } as any, // استخدام as any هنا بيقفل اعتراض TypeScript على الخصائص التجريبية

  reactStrictMode: true,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);