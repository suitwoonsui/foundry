import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // When this app lives inside a monorepo, prefer this package as Turbopack root (avoids picking parent lockfile).
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
