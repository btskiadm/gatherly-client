export const decodeAndParseUniqueParams = (params: string) => [...new Set(decodeURIComponent(params).split(","))];
