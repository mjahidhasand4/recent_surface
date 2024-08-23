export const uuid = (): string => {
  const randomValues = crypto.getRandomValues(new Uint8Array(16));
  randomValues[6] = (randomValues[6] & 0x0f) | 0x40;
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80;
  const hexArray = Array.from(randomValues).map((b) =>
    b.toString(16).padStart(2, "0")
  );
  return `${hexArray.slice(0, 4).join("")}-${hexArray
    .slice(4, 6)
    .join("")}-${hexArray.slice(6, 8).join("")}-${hexArray
    .slice(8, 10)
    .join("")}-${hexArray.slice(10).join("")}`;
};