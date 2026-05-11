type SiteMode = "maintenance" | "under-construction" | null;

interface SiteModeStatus {
  maintenanceEnabled: boolean;
  underConstructionEnabled: boolean;
  activeMode: SiteMode;
}

interface SiteModeCache {
  value: SiteModeStatus;
  fetchedAt: number;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.strategizers-me.com/api/v1";
const SETTINGS_ENDPOINT = `${API_BASE_URL}/public/setting`;
const CACHE_TTL_MS = 30_000;
const SETTINGS_TIMEOUT_MS = 2_000;

const DEFAULT_MODE_STATUS: SiteModeStatus = {
  maintenanceEnabled: false,
  underConstructionEnabled: false,
  activeMode: null,
};

let siteModeCache: SiteModeCache | null = null;

const MODE_TRUE_VALUES = new Set(["true", "1", "yes", "on"]);

function isTruthy(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value !== 0;
  if (typeof value === "string") {
    return MODE_TRUE_VALUES.has(value.trim().toLowerCase());
  }
  return false;
}

function readPathValue(
  source: Record<string, unknown>,
  path: string
): unknown | undefined {
  return path.split(".").reduce<unknown>((current, part) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[part];
  }, source);
}

function readFlag(source: Record<string, unknown>, keys: string[]): boolean {
  for (const key of keys) {
    const value = readPathValue(source, key);
    if (value !== undefined) return isTruthy(value);
  }
  return false;
}

function resolveSiteModeStatus(settings: Record<string, unknown>): SiteModeStatus {
  const maintenanceEnabled = readFlag(settings, [
    "maintenance",
    "maintenanceMode",
    "isMaintenance",
    "isMaintenanceMode",
    "siteMaintenance",
    "status.maintenance",
    "status.maintenanceMode",
    "modes.maintenance",
    "modes.maintenanceMode",
  ]);

  const underConstructionEnabled = readFlag(settings, [
    "underConstruction",
    "underConstructionMode",
    "isUnderConstruction",
    "isUnderConstructionMode",
    "status.underConstruction",
    "status.underConstructionMode",
    "modes.underConstruction",
    "modes.underConstructionMode",
  ]);

  const activeMode: SiteMode = maintenanceEnabled
    ? "maintenance"
    : underConstructionEnabled
      ? "under-construction"
      : null;

  return {
    maintenanceEnabled,
    underConstructionEnabled,
    activeMode,
  };
}

export async function getSiteModeStatus(): Promise<SiteModeStatus> {
  const now = Date.now();

  if (siteModeCache && now - siteModeCache.fetchedAt < CACHE_TTL_MS) {
    return siteModeCache.value;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SETTINGS_TIMEOUT_MS);
    const response = await (async () => {
      try {
        return await fetch(SETTINGS_ENDPOINT, {
          method: "GET",
          headers: { Accept: "application/json" },
          cache: "no-store",
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeout);
      }
    })();

    if (!response.ok) {
      return siteModeCache?.value ?? DEFAULT_MODE_STATUS;
    }

    const data = (await response.json()) as {
      results?: { settings?: Record<string, unknown> };
    };
    const settings = data?.results?.settings;

    if (!settings || typeof settings !== "object") {
      return siteModeCache?.value ?? DEFAULT_MODE_STATUS;
    }

    const value = resolveSiteModeStatus(settings);
    siteModeCache = { value, fetchedAt: now };
    return value;
  } catch (error) {
    console.error("Error fetching site mode status:", error);
    return siteModeCache?.value ?? DEFAULT_MODE_STATUS;
  }
}
