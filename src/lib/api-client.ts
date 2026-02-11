import type {
  HeroContent,
  Statistic,
  ImpactMetric,
  Testimonial,
  AboutSection,
  TeamMember,
  Sponsor,
  Event,
  Social,
  FocusArea,
} from "./types";

// Build a base URL that respects dev/prod environments.
// When VITE_DEV_ENV is "development", prefer VITE_DEV_URL; otherwise use VITE_BASE_URL.
const envMode = (import.meta.env.VITE_DEV_ENV ?? "").toLowerCase();
const prodBase = (import.meta.env.VITE_BASE_URL ?? "").replace(/\/$/, "");
const devBase = (import.meta.env.VITE_DEV_URL ?? "").replace(/\/$/, "");

function buildBaseCandidates() {
  const candidates = [] as string[];
  if (envMode === "development") {
    if (devBase) candidates.push(devBase);
    if (typeof window !== "undefined") candidates.push(window.location.origin);
  } else {
    if (prodBase) candidates.push(prodBase);
    if (devBase) candidates.push(devBase);
    if (typeof window !== "undefined") candidates.push(window.location.origin);
  }

  const uniq = candidates.filter(
    (url, idx) => candidates.indexOf(url) === idx && !!url,
  );

  // Expand with /api (and without /api) variants to tolerate
  // differing backend prefix configurations across environments.
  const expanded: string[] = [];
  for (const base of uniq) {
    expanded.push(base);

    const withoutTrailingSlash = base.replace(/\/$/, "");
    if (/\/api$/i.test(withoutTrailingSlash)) {
      expanded.push(withoutTrailingSlash.replace(/\/api$/i, ""));
    } else {
      expanded.push(`${withoutTrailingSlash}/api`);
    }
  }

  // Deduplicate while preserving order.
  return expanded.filter((url, idx) => expanded.indexOf(url) === idx && !!url);
}

const baseCandidates = buildBaseCandidates();
const apiKey = import.meta.env.VITE_API_KEY;

function toUrl(base: string, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const merged = `${base}${normalizedPath}`.replace(/([^:]\/)(\/)+/g, "$1/");
  // Avoid accidentally doubled global prefixes like /api/api.
  return merged.replace(/\/api\/api\//gi, "/api/");
}

async function safeJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch (_) {
    return null;
  }
}

function parseFormattedNumber(value: string | number): number {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return NaN;

  const trimmed = value.trim().toUpperCase();
  if (!trimmed) return NaN;

  // Remove percentage sign
  const noPercent = trimmed.replace("%", "");

  // Parse multipliers: M (million), K (thousand)
  const multipliers: Record<string, number> = {
    M: 1000000,
    K: 1000,
  };

  for (const [suffix, multiplier] of Object.entries(multipliers)) {
    if (noPercent.endsWith(suffix)) {
      const numPart = parseFloat(noPercent.slice(0, -suffix.length));
      if (Number.isFinite(numPart)) {
        return numPart * multiplier;
      }
    }
  }

  // Try direct parsing
  const parsed = parseFloat(noPercent);
  return Number.isFinite(parsed) ? parsed : NaN;
}

export async function fetchHeroContent(
  fallback: HeroContent,
): Promise<HeroContent> {
  const paths = ["/hero/get-hero", "/get-hero"]; // prefer controller path under /hero

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<
          { hero?: unknown } | Record<string, unknown>
        >(res);
        const payload =
          json && typeof json === "object" && "hero" in json
            ? (json as any).hero
            : json;

        if (!payload || typeof payload !== "object") continue;

        const heading =
          typeof (payload as any).heading === "string" &&
          (payload as any).heading.trim()
            ? (payload as any).heading.trim()
            : typeof (payload as any).title === "string" &&
                (payload as any).title.trim()
              ? (payload as any).title.trim()
              : typeof (payload as any).mainTitle === "string" &&
                  (payload as any).mainTitle.trim()
                ? (payload as any).mainTitle.trim()
                : null;

        const subTitle =
          typeof (payload as any).subTitle === "string" &&
          (payload as any).subTitle.trim()
            ? (payload as any).subTitle.trim()
            : typeof (payload as any).subtitle === "string" &&
                (payload as any).subtitle.trim()
              ? (payload as any).subtitle.trim()
              : null;

        if (!heading || !subTitle) continue;

        const primaryButtonText =
          typeof (payload as any).primaryButtonText === "string" &&
          (payload as any).primaryButtonText.trim()
            ? (payload as any).primaryButtonText.trim()
            : fallback.primaryButtonText;

        const secondaryButtonText =
          typeof (payload as any).secondaryButtonText === "string" &&
          (payload as any).secondaryButtonText.trim()
            ? (payload as any).secondaryButtonText.trim()
            : fallback.secondaryButtonText;

        return {
          title: heading,
          subTitle,
          primaryButtonText,
          secondaryButtonText,
        };
      } catch (_) {
        // Try the next path/base candidate.
        continue;
      }
    }
  }

  return fallback;
}

export async function fetchStatistics(): Promise<Statistic[]> {
  const paths = ["/statistics/all", "/get-statistics"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<Statistic[] | { statistics?: unknown }>(
          res,
        );
        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "statistics" in json
            ? (json as any).statistics
            : null;

        if (!Array.isArray(payload)) continue;

        const validated: Statistic[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid statistic item:", item);
            continue;
          }

          const label =
            typeof (item as any).label === "string" &&
            (item as any).label.trim()
              ? (item as any).label.trim()
              : null;

          const value =
            typeof (item as any).value === "number"
              ? (item as any).value
              : typeof (item as any).value === "string"
                ? parseFormattedNumber((item as any).value)
                : NaN;

          if (!label) {
            console.warn("Skipping statistic with missing label:", item);
            continue;
          }

          if (!Number.isFinite(value)) {
            console.warn("Skipping statistic with invalid value:", item);
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            label,
            value,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(
          `Fetched ${validated.length} statistics from ${url}:`,
          validated,
        );
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchImpactMetrics(): Promise<ImpactMetric[]> {
  const paths = ["/metrics/get-all", "/get-metrics"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<ImpactMetric[] | { metrics?: unknown }>(
          res,
        );
        console.log(`Raw response from ${url}:`, json);

        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "metrics" in json
            ? (json as any).metrics
            : null;

        console.log(`Payload extracted from ${url}:`, payload);
        if (!Array.isArray(payload)) {
          console.warn(`Payload is not an array for ${url}`);
          continue;
        }

        const validated: ImpactMetric[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid impact metric item:", item);
            continue;
          }

          const label =
            typeof (item as any).label === "string" &&
            (item as any).label.trim()
              ? (item as any).label.trim()
              : null;

          const value =
            typeof (item as any).value === "number"
              ? (item as any).value
              : typeof (item as any).value === "string"
                ? parseFormattedNumber((item as any).value)
                : NaN;

          if (!label) {
            console.warn("Skipping impact metric with missing label:", item);
            continue;
          }

          if (!Number.isFinite(value)) {
            console.warn("Skipping impact metric with invalid value:", item);
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            label,
            value,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(
          `Fetched ${validated.length} impact metrics from ${url}:`,
          validated,
        );
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const paths = ["/testimonials/all", "/get-testimonials"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<Testimonial[] | { testimonials?: unknown }>(
          res,
        );
        console.log(`Raw testimonials response from ${url}:`, json);

        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "testimonials" in json
            ? (json as any).testimonials
            : null;

        console.log(`Testimonials payload extracted from ${url}:`, payload);
        if (!Array.isArray(payload)) {
          console.warn(`Testimonials payload is not an array for ${url}`);
          continue;
        }

        const validated: Testimonial[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid testimonial item:", item);
            continue;
          }

          const speaker =
            typeof (item as any).speaker === "string" &&
            (item as any).speaker.trim()
              ? (item as any).speaker.trim()
              : null;

          const role =
            typeof (item as any).role === "string" && (item as any).role.trim()
              ? (item as any).role.trim()
              : null;

          const statement =
            typeof (item as any).statement === "string" &&
            (item as any).statement.trim()
              ? (item as any).statement.trim()
              : null;

          if (!speaker || !role || !statement) {
            console.warn(
              "Skipping testimonial with missing speaker, role, or statement:",
              item,
            );
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            speaker,
            role,
            statement,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(
          `Fetched ${validated.length} testimonials from ${url}:`,
          validated,
        );
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchAboutSection(): Promise<AboutSection | null> {
  const paths = ["/about/section", "/get-about"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<AboutSection>(res);
        if (!json || typeof json !== "object") continue;

        const validated: AboutSection = {
          id: (json as any).id ?? "",
          description:
            typeof (json as any).description === "string"
              ? (json as any).description.trim()
              : "",
          missionDescription:
            typeof (json as any).missionDescription === "string"
              ? (json as any).missionDescription.trim()
              : "",
          visionDescription:
            typeof (json as any).visionDescription === "string"
              ? (json as any).visionDescription.trim()
              : "",
          createdAt: (json as any).createdAt ?? "",
          updatedAt: (json as any).updatedAt ?? "",
        };

        console.log(`Fetched about section from ${url}:`, validated);
        return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return null;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const paths = ["/about/team", "/get-team"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<TeamMember[] | { team?: unknown }>(res);
        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "team" in json
            ? (json as any).team
            : null;

        if (!Array.isArray(payload)) continue;

        const validated: TeamMember[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid team member item:", item);
            continue;
          }

          const name =
            typeof (item as any).name === "string" && (item as any).name.trim()
              ? (item as any).name.trim()
              : null;

          const role =
            typeof (item as any).role === "string" && (item as any).role.trim()
              ? (item as any).role.trim()
              : null;

          const description =
            typeof (item as any).description === "string" &&
            (item as any).description.trim()
              ? (item as any).description.trim()
              : null;

          if (!name || !role || !description) {
            console.warn(
              "Skipping team member with missing required fields:",
              item,
            );
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            name,
            role,
            description,
            profilePicture:
              typeof (item as any).profilePicture === "string"
                ? (item as any).profilePicture
                : undefined,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(`Fetched ${validated.length} team members from ${url}:`);
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  const paths = ["/about/sponsors", "/get-sponsors"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<Sponsor[] | { sponsors?: unknown }>(res);
        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "sponsors" in json
            ? (json as any).sponsors
            : null;

        if (!Array.isArray(payload)) continue;

        const validated: Sponsor[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid sponsor item:", item);
            continue;
          }

          const name =
            typeof (item as any).name === "string" && (item as any).name.trim()
              ? (item as any).name.trim()
              : null;

          if (!name) {
            console.warn("Skipping sponsor with missing name:", item);
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            name,
            description:
              typeof (item as any).description === "string"
                ? (item as any).description.trim()
                : undefined,
            website:
              typeof (item as any).website === "string"
                ? (item as any).website.trim()
                : undefined,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(`Fetched ${validated.length} sponsors from ${url}:`);
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchEvents(): Promise<Event[]> {
  const paths = ["/events/all", "/get-events"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<Event[] | { events?: unknown }>(res);
        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "events" in json
            ? (json as any).events
            : null;

        if (!Array.isArray(payload)) continue;

        const validated: Event[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid event item:", item);
            continue;
          }

          const title =
            typeof (item as any).title === "string" &&
            (item as any).title.trim()
              ? (item as any).title.trim()
              : null;

          const date =
            typeof (item as any).date === "string" && (item as any).date.trim()
              ? (item as any).date.trim()
              : null;

          if (!title || !date) {
            console.warn("Skipping event with missing required fields:", item);
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            title,
            date,
            time:
              typeof (item as any).time === "string"
                ? (item as any).time.trim()
                : undefined,
            type:
              typeof (item as any).type === "string"
                ? (item as any).type.trim()
                : undefined,
            description:
              typeof (item as any).description === "string"
                ? (item as any).description.trim()
                : undefined,
            attendees:
              typeof (item as any).attendees === "number"
                ? (item as any).attendees
                : undefined,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(`Fetched ${validated.length} events from ${url}:`);
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchSocials(): Promise<Social[]> {
  const paths = [
    "/socials/all",
    "/api/socials/all",
    "/socials",
    "/api/socials",
    "/get-socials",
  ];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<
          Social[] | { socials?: unknown } | { data?: unknown }
        >(res);
        const payload = Array.isArray(json)
          ? json
          : json && typeof json === "object" && "socials" in json
            ? (json as any).socials
            : json && typeof json === "object" && "data" in json
              ? (json as any).data
              : null;

        if (!Array.isArray(payload)) continue;

        const validated: Social[] = [];
        for (const item of payload) {
          if (!item || typeof item !== "object") {
            console.warn("Skipping invalid social item:", item);
            continue;
          }

          const platform =
            typeof (item as any).platform === "string" &&
            (item as any).platform.trim()
              ? (item as any).platform.trim()
              : null;

          const socialUrl =
            typeof (item as any).url === "string" && (item as any).url.trim()
              ? (item as any).url.trim()
              : null;

          if (!platform || !socialUrl) {
            console.warn("Skipping social with missing required fields:", item);
            continue;
          }

          validated.push({
            id: (item as any).id ?? "",
            platform,
            url: socialUrl,
            createdAt: (item as any).createdAt ?? "",
            updatedAt: (item as any).updatedAt ?? "",
          });
        }

        console.log(`Fetched ${validated.length} socials from ${url}:`);
        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

export async function fetchFocusAreas(): Promise<FocusArea[]> {
  const paths = ["/focus/all", "/focus/get-all", "/focus/getAll"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<unknown>(res);
        const payload = Array.isArray(json)
          ? json
          : isRecord(json)
            ? ((json["focusAreas"] as unknown) ??
              (json["data"] as unknown) ??
              null)
            : null;

        if (!Array.isArray(payload)) continue;

        const validated: FocusArea[] = [];
        for (const item of payload) {
          if (!isRecord(item)) continue;

          const title = item["title"];
          const description = item["description"];
          const hashTag = item["hashTag"];
          if (
            !isNonEmptyString(title) ||
            !isNonEmptyString(description) ||
            !isNonEmptyString(hashTag)
          ) {
            continue;
          }

          const imagesRaw = item["images"];
          const images = Array.isArray(imagesRaw)
            ? imagesRaw.filter(
                (x: unknown) => typeof x === "string" && x.trim().length > 0,
              )
            : [];

          const statsLabelRaw = item["statsLabel"];
          const statsValueRaw = item["statsValue"];

          const keyVoicesRaw = item["keyVoices"];
          const inspiringStoriesRaw = item["inspiringStories"];
          const supportingOrganizationsRaw = item["supportingOrganizations"];

          validated.push({
            id: typeof item["id"] === "string" ? item["id"] : "",
            title: title.trim(),
            description: description.trim(),
            hashTag: hashTag.trim(),
            images,
            statsLabel:
              typeof statsLabelRaw === "string" ? statsLabelRaw : undefined,
            statsValue:
              typeof statsValueRaw === "string" ? statsValueRaw : undefined,
            keyVoices: Array.isArray(keyVoicesRaw)
              ? (keyVoicesRaw as unknown as FocusArea["keyVoices"])
              : undefined,
            inspiringStories: Array.isArray(inspiringStoriesRaw)
              ? (inspiringStoriesRaw as unknown as FocusArea["inspiringStories"])
              : undefined,
            supportingOrganizations: Array.isArray(supportingOrganizationsRaw)
              ? (supportingOrganizationsRaw as unknown as FocusArea["supportingOrganizations"])
              : undefined,
            createdAt:
              typeof item["createdAt"] === "string"
                ? item["createdAt"]
                : undefined,
            updatedAt:
              typeof item["updatedAt"] === "string"
                ? item["updatedAt"]
                : undefined,
          });
        }

        if (validated.length > 0) return validated;
      } catch (_) {
        continue;
      }
    }
  }

  return [];
}

export async function fetchFocusAreaById(
  id: string,
): Promise<FocusArea | null> {
  const trimmedId = typeof id === "string" ? id.trim() : "";
  if (!trimmedId) return null;

  const query = `?id=${encodeURIComponent(trimmedId)}`;
  const paths = [`/focus/single${query}`, `/focus/get-by-id${query}`];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });

        if (!res.ok) continue;

        const json = await safeJson<unknown>(res);
        const payload = isRecord(json)
          ? ((json["focusArea"] as unknown) ??
            (json["data"] as unknown) ??
            json)
          : json;

        if (!isRecord(payload)) continue;

        const title = payload["title"];
        const description = payload["description"];
        const hashTag = payload["hashTag"];
        if (
          !isNonEmptyString(title) ||
          !isNonEmptyString(description) ||
          !isNonEmptyString(hashTag)
        ) {
          continue;
        }

        const imagesRaw = payload["images"];
        const images = Array.isArray(imagesRaw)
          ? imagesRaw.filter(
              (x: unknown) => typeof x === "string" && x.trim().length > 0,
            )
          : [];

        const statsLabelRaw = payload["statsLabel"];
        const statsValueRaw = payload["statsValue"];

        const keyVoicesRaw = payload["keyVoices"];
        const inspiringStoriesRaw = payload["inspiringStories"];
        const supportingOrganizationsRaw = payload["supportingOrganizations"];

        return {
          id: typeof payload["id"] === "string" ? payload["id"] : trimmedId,
          title: title.trim(),
          description: description.trim(),
          hashTag: hashTag.trim(),
          images,
          statsLabel:
            typeof statsLabelRaw === "string" ? statsLabelRaw : undefined,
          statsValue:
            typeof statsValueRaw === "string" ? statsValueRaw : undefined,
          keyVoices: Array.isArray(keyVoicesRaw)
            ? (keyVoicesRaw as unknown as FocusArea["keyVoices"])
            : undefined,
          inspiringStories: Array.isArray(inspiringStoriesRaw)
            ? (inspiringStoriesRaw as unknown as FocusArea["inspiringStories"])
            : undefined,
          supportingOrganizations: Array.isArray(supportingOrganizationsRaw)
            ? (supportingOrganizationsRaw as unknown as FocusArea["supportingOrganizations"])
            : undefined,
          createdAt:
            typeof payload["createdAt"] === "string"
              ? payload["createdAt"]
              : undefined,
          updatedAt:
            typeof payload["updatedAt"] === "string"
              ? payload["updatedAt"]
              : undefined,
        };
      } catch (_) {
        continue;
      }
    }
  }

  return null;
}

export type ContactMessagePayload = {
  name: string;
  email: string;
  message: string;
  subject?: string | null;
  phone?: string | null;
};

export async function sendContactMessage(payload: ContactMessagePayload) {
  const paths = ["/contact/send", "/api/contact/send"];

  for (const base of baseCandidates) {
    for (const path of paths) {
      const url = toUrl(base, path);

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) continue;

        // Return whatever the backend responds with (usually created ContactMessage)
        return await safeJson<unknown>(res);
      } catch (_) {
        continue;
      }
    }
  }

  throw new Error("Failed to send contact message");
}
