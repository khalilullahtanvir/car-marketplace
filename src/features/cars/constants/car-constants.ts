export const CAR_LISTING_STATUSES = ["draft", "pending_review", "published", "paused", "sold", "archived"] as const;
export const CAR_VISIBILITY_STATUSES = ["private", "unlisted", "public"] as const;
export const CAR_CONDITIONS = ["new", "used", "certified_pre_owned"] as const;
export const CAR_BODY_STYLES = ["sedan", "suv", "hatchback", "coupe", "convertible", "wagon", "pickup", "van", "crossover", "truck", "other"] as const;
export const CAR_DRIVETRAINS = ["fwd", "rwd", "awd", "4wd"] as const;
export const CAR_TRANSMISSIONS = ["manual", "automatic", "cvt", "dual_clutch", "other"] as const;
export const CAR_FUEL_TYPES = ["gasoline", "diesel", "hybrid", "plugin_hybrid", "electric", "lpg", "cng", "other"] as const;
export const CAR_MILEAGE_UNITS = ["km", "mi"] as const;

export const CAR_SORT_FIELDS = ["created_at", "updated_at", "published_at", "year", "price", "title"] as const;

export const CAR_DEFAULT_PAGE_SIZE = 20;
export const CAR_MAX_PAGE_SIZE = 100;
export const CAR_MIN_YEAR = 1900;
export const CAR_MAX_YEAR = 2100;

