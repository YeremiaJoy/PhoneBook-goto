import { format } from "date-fns";

export function formatDate(
  date: string | Date | null | undefined,
  time: boolean = false
) {
  if (!date) return "-";
  const timeFormat = time ? " - hh:mm a" : "";
  return format(new Date(date), `dd MMM yyyy${timeFormat}`);
}
