import { useEffect, useState } from "react";
import agendaData from "../pages/conf/agenda.json";

// Videos become clickable on 2026-04-28 1:30 PM PDT (PDT = UTC-7 → 20:30 UTC).
export const VIDEO_RELEASE_TIMESTAMP = Date.UTC(2026, 3, 28, 20, 30, 0);

// Live stream embed becomes visible on 2026-04-28 7:00 AM PDT (→ 14:00 UTC).
export const STREAM_RELEASE_TIMESTAMP = Date.UTC(2026, 3, 28, 14, 0, 0);

/**
 * Case-insensitive check for a preview query param. Returns true when any of
 * the given names is present in the URL, unless its value explicitly opts out
 * (`0` or `false`, case-insensitive). Bare flags like `?streamnow` count as
 * enabled.
 */
const hasPreviewParam = (names: string[]): boolean => {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const wanted = new Set(names.map((n) => n.toLowerCase()));
  for (const [key, value] of params.entries()) {
    if (!wanted.has(key.toLowerCase())) continue;
    const normalized = value.trim().toLowerCase();
    if (normalized === "0" || normalized === "false") continue;
    return true;
  }
  return false;
};

interface AgendaEntry {
  speakers: { slug: string }[];
  url?: string;
}

const { live, onDemand } = agendaData as {
  live: AgendaEntry[];
  onDemand: AgendaEntry[];
};

const allSessions: AgendaEntry[] = [...live, ...onDemand];

/**
 * Look up a YouTube URL for a given speaker slug. Returns the first matching
 * session URL, or undefined if the speaker has no URL (yet).
 */
export const getVideoUrlForSpeaker = (slug: string): string | undefined => {
  for (const session of allSessions) {
    if (!session.url) continue;
    if (session.speakers.some((s) => s.slug === slug)) {
      return session.url;
    }
  }
  return undefined;
};

/**
 * Returns true once the shared release time has passed. The value is `false`
 * during SSR/initial render to avoid hydration mismatch, then flips to `true`
 * on the client if applicable. Re-checked every minute.
 *
 * Supports `?releaseNow` or `?streamNow` (case-insensitive, value optional;
 * `0`/`false` opts out) to force-release for testing/previewing.
 */
export const useVideoReleased = (): boolean => {
  const [released, setReleased] = useState(false);
  useEffect(() => {
    const forceReleased = hasPreviewParam(["releaseNow", "streamNow"]);
    const check = () =>
      setReleased(forceReleased || Date.now() >= VIDEO_RELEASE_TIMESTAMP);
    check();
    const interval = window.setInterval(check, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return released;
};

/**
 * Returns true once the live stream release time has passed. SSR-safe.
 * Supports `?streamNow` or `?releaseNow` (case-insensitive, value optional;
 * `0`/`false` opts out) for preview.
 */
export const useStreamReleased = (): boolean => {
  const [released, setReleased] = useState(false);
  useEffect(() => {
    const forceReleased = hasPreviewParam(["streamNow", "releaseNow"]);
    const check = () =>
      setReleased(forceReleased || Date.now() >= STREAM_RELEASE_TIMESTAMP);
    check();
    const interval = window.setInterval(check, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return released;
};

/**
 * Convert a youtu.be or youtube.com URL into a youtube.com/embed/<id> URL.
 * Returns undefined if the URL cannot be parsed.
 */
export const getYouTubeEmbedUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  const shortMatch = url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const longMatch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
  const embedMatch = url.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/);
  if (embedMatch) return url;
  return undefined;
};
