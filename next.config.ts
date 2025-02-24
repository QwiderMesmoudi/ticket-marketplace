import autoCert from "anchor-pki/auto-cert/integrations/next";
import type { NextConfig } from "next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withAutoCert(nextConfig);
