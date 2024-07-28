const COLORS = {
  orange: {
    100: "#F17A00",
    99: "#F18518",
    95: "#F19130",
    90: "#F19D48",
    80: "#F1A960",
    70: "#F1B579",
    60: "#F1BB85",
    50: "#F1C191",
    40: "#F1C79D",
    30: "#F1D3B5",
    20: "#F1E5D9",
    10: "#F1EDEA",
  },
  green: {
    100: "#F17A00",
    99: "#16DB16",
    95: "#2CDB2C",
    90: "#42DB42",
    80: "#58DB58",
    70: "#6EDB6E",
    60: "#78DB78",
    50: "#94DB94",
    40: "#A4DBA4",
    30: "#BADBBA",
    20: "#C5DBC5",
    10: "#D0DBD0",
  },
  brown: {
    100: "#6E5537",
    99: "#6E573D",
    95: "#6E5C48",
    90: "#6E6253",
    80: "#6E6458",
    70: "#6E675F",
    60: "#6E6B69",
    50: "#6E6E6E",
    40: "#81807F",
    30: "#949291",
    20: "#A8A7A6",
    10: "#B9B8B7",
  },
  error: {
    100: "#000000",
    99: "#410E0B",
    95: "#601410",
    90: "#8C1D18",
    80: "#B3261E",
    70: "#DC362E",
    60: "#E46962",
    50: "#EC928E",
    40: "#F2B8B5",
    30: "#F9DEDC",
    20: "#FCEEEE",
    10: "#FFFBF9",
  },
  tertiary: "#FF7754",

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
  neutral: {
    100: "#000000",
    99: "#1D1B2",
    95: "#322F35",
    90: "#58565D",
    80: "#605D64",
    70: "#79767D",
    60: "#938F96",
    50: "#AEA9B1",
    40: "#CAC5CD",
    30: "#F3F0F4",
    20: "#FFFCFA",
    10: "#FFFBFE",
  },
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
