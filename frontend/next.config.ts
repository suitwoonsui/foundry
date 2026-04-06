import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // When this app lives inside a monorepo, prefer this package as Turbopack root (avoids picking parent lockfile).
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async redirects() {
    return [
      { source: "/paths/residents", destination: "/paths/hearth", permanent: true },
      {
        source: "/titles/pactkeeper-diplomat",
        destination: "/titles/ambassador-diplomat",
        permanent: true,
      },
      {
        source: "/titles/chorus-orator",
        destination: "/titles/maestro-orator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
