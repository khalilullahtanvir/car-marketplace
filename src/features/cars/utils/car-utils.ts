import { CAR_MAX_PAGE_SIZE, CAR_MIN_YEAR } from "../constants/car-constants";

export function clampCarPageSize(pageSize: number) {
  return Math.min(Math.max(pageSize, 1), CAR_MAX_PAGE_SIZE);
}

export function isValidCarYear(year: number) {
  return year >= CAR_MIN_YEAR;
}

