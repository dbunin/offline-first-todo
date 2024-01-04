import type { Config } from "vike/types";
import Layout from "../layouts/LayoutDefault";
import Head from "../layouts/HeadDefault";
import vikeReact from "vike-react";

// Default config (can be overridden by pages)
export default {
  Layout,
  Head,
  // <title>
  title: "Offline first todo app",
  description: "Demo showcasing client event based offline first app",
  extends: vikeReact,
} satisfies Config;
