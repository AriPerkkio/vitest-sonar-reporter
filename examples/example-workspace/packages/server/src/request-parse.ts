import { parseName } from "@shared";

export function parseUserFromRequest(request: {
  headers: Record<string, string>;
}) {
  const header = request.headers["x-user"];
  return parseName(header);
}
