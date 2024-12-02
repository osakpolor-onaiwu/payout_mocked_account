export const decode_cursor = (cursor: any) => {
  if (!cursor) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(cursor, "base64").toString("utf8"));
  } catch (e) {
    return null;
  }
};

export const encode_cursor = (cursor: any) => {
  if (!cursor) return null;
  return Buffer.from(JSON.stringify(cursor)).toString("base64");
};
