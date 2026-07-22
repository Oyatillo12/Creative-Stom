export function formatUzPhone(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "");
  const local = (digits.startsWith("998") ? digits.slice(3) : digits).slice(0, 9);

  let out = "+998";
  if (local.length > 0) out += " " + local.slice(0, 2);
  if (local.length > 2) out += " " + local.slice(2, 5);
  if (local.length > 5) out += "-" + local.slice(5, 7);
  if (local.length > 7) out += "-" + local.slice(7, 9);
  return out;
}
