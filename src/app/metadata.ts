import type { Metadata } from "next";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/constants";

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL)
};
