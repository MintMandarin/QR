export const hashConverter = {
  // Encode a string by replacing `#` with `%23`
  encode: (str: string) => str.replace(/#/g, "%23"),

  // Decode a string by replacing `%23` with `#`
  decode: (str: string) => str.replace(/%23/g, "#"),
};
