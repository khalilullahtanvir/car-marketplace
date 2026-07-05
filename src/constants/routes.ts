export const ROUTES = {
  home: "/",
  public: {
    cars: "/cars",
    carDetails: (carId: string) => `/cars/${carId}`,
    dealers: "/dealers",
    dealerDetails: (dealerSlug: string) => `/dealers/${dealerSlug}`,
    support: "/support",
    legal: {
      terms: "/terms",
      privacy: "/privacy",
      cookies: "/cookies"
    }
  },
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password"
  },
  dashboard: "/dashboard",
  profile: "/profile",
  wishlist: "/wishlist",
  compare: "/compare",
  notifications: "/notifications",
  reviews: "/reviews",
  settings: "/settings",
  ai: "/ai",
  admin: {
    root: "/admin",
    users: "/admin/users",
    roles: "/admin/roles",
    reports: "/admin/reports"
  },
  notFound: "/404"
} as const;

export type RoutePath = typeof ROUTES;
