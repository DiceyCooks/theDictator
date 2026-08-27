// GENERATED from live measurement of https://lilfrogeth.com/.
// Every variant is captured on a CLEAN PAGE LOAD. Resizing alone is not
// sufficient: Framer swaps breakpoint variants by re-rendering, and stale nodes
// from the previous variant survive a resize, silently corrupting measurements.
//
// THREE variants, boundaries confirmed by bisection:
//   large    >=1600px  (captured at 1600, content width 1585)
//   desktop  810-1599  (captured at 1440, content width 1425)
//   mobile   <810      (captured at 390)
//
// Heights are FIXED within each variant. None of these blocks is fluid. Five
// blocks appeared to scale with width only because large-variant readings were
// being compared against desktop-variant readings before the 1600px breakpoint
// was discovered.
//
// Slot positions are percentages of their own block box in that variant.
// Regenerate rather than hand-editing.

export const BREAKPOINT_LARGE = 1600;
export const BREAKPOINT_LAYOUT = 810;

export type ArtSlotSpec = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
  fit: "cover" | "fill";
};

export type BlockVariant = {
  /** CSS length, or 100vh for viewport-height blocks. */
  height: string;
  /** Blocks that keep a fixed pixel width and are clipped by the page. */
  fixedWidth: number | null;
  slots: ArtSlotSpec[];
};

export type BlockSpec = {
  key: string;
  name: string;
  dark: boolean;
  large: BlockVariant;
  desktop: BlockVariant;
  mobile: BlockVariant;
};

export const BLOCKS: BlockSpec[] = [
  {
    "key": "18hopws",
    "name": "Bloom",
    "dark": false,
    "large": {
      "height": "1200px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Bloom-1",
          "left": -19.369,
          "top": -18.75,
          "width": 145.615,
          "height": 138.75,
          "fit": "cover"
        },
        {
          "id": "Bloom-2",
          "left": 13.565,
          "top": 23.083,
          "width": 52.808,
          "height": 74.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-3",
          "left": -27.571,
          "top": 26.917,
          "width": 70.536,
          "height": 94.583,
          "fit": "cover"
        },
        {
          "id": "Bloom-4",
          "left": 60.126,
          "top": 8.917,
          "width": 68.959,
          "height": 99.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-5",
          "left": 41.893,
          "top": 47.833,
          "width": 46.751,
          "height": 67.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-6",
          "left": -0.631,
          "top": 39.833,
          "width": 41.199,
          "height": 63.917,
          "fit": "cover"
        },
        {
          "id": "Bloom-7",
          "left": 60.505,
          "top": 58.25,
          "width": 26.751,
          "height": 46.417,
          "fit": "cover"
        },
        {
          "id": "Bloom-8",
          "left": 0,
          "top": -0.083,
          "width": 100,
          "height": 8.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-9",
          "left": 0,
          "top": 95,
          "width": 100,
          "height": 5.667,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "1200px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Bloom-1",
          "left": -21.544,
          "top": -18.75,
          "width": 150.737,
          "height": 138.75,
          "fit": "cover"
        },
        {
          "id": "Bloom-2",
          "left": 10.596,
          "top": 23.083,
          "width": 58.737,
          "height": 74.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-3",
          "left": -31.509,
          "top": 26.917,
          "width": 78.456,
          "height": 94.583,
          "fit": "cover"
        },
        {
          "id": "Bloom-4",
          "left": 66.877,
          "top": 8.917,
          "width": 76.702,
          "height": 99.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-5",
          "left": 35.368,
          "top": 47.833,
          "width": 52,
          "height": 67.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-6",
          "left": -2.947,
          "top": 39.833,
          "width": 45.825,
          "height": 63.917,
          "fit": "cover"
        },
        {
          "id": "Bloom-7",
          "left": 58.947,
          "top": 58.25,
          "width": 29.754,
          "height": 46.417,
          "fit": "cover"
        },
        {
          "id": "Bloom-8",
          "left": 0,
          "top": -0.083,
          "width": 100,
          "height": 8.5,
          "fit": "cover"
        },
        {
          "id": "Bloom-9",
          "left": 0,
          "top": 95,
          "width": 100,
          "height": 5.667,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "651px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Bloom-1",
          "left": -78.718,
          "top": -34.562,
          "width": 178.974,
          "height": 255.76,
          "fit": "cover"
        },
        {
          "id": "Bloom-2",
          "left": -67.436,
          "top": -8.295,
          "width": 214.615,
          "height": 137.327,
          "fit": "cover"
        },
        {
          "id": "Bloom-3",
          "left": -135.641,
          "top": -13.057,
          "width": 286.667,
          "height": 174.347,
          "fit": "cover"
        },
        {
          "id": "Bloom-4",
          "left": 244.359,
          "top": 16.436,
          "width": 280.256,
          "height": 183.41,
          "fit": "cover"
        },
        {
          "id": "Bloom-5",
          "left": -136.154,
          "top": 3.84,
          "width": 190,
          "height": 124.424,
          "fit": "cover"
        },
        {
          "id": "Bloom-6",
          "left": -94.359,
          "top": -10.906,
          "width": 167.436,
          "height": 117.819,
          "fit": "cover"
        },
        {
          "id": "Bloom-7",
          "left": 40,
          "top": 23.041,
          "width": 108.718,
          "height": 85.561,
          "fit": "cover"
        },
        {
          "id": "Bloom-8",
          "left": 0,
          "top": -0.154,
          "width": 133.333,
          "height": 15.668,
          "fit": "cover"
        },
        {
          "id": "Bloom-9",
          "left": 0,
          "top": 90.783,
          "width": 100,
          "height": 10.445,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "tgbvc8",
    "name": "Clearing",
    "dark": false,
    "large": {
      "height": "100vh",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Clearing-1",
          "left": 15.457,
          "top": 15.444,
          "width": 53.691,
          "height": 103.333,
          "fit": "cover"
        },
        {
          "id": "Clearing-2",
          "left": 41.956,
          "top": 35.222,
          "width": 48.517,
          "height": 97.444,
          "fit": "cover"
        },
        {
          "id": "Clearing-3",
          "left": 0,
          "top": 78.111,
          "width": 100,
          "height": 44.667,
          "fit": "cover"
        },
        {
          "id": "Clearing-4",
          "left": 0,
          "top": -11.444,
          "width": 100,
          "height": 74.333,
          "fit": "cover"
        },
        {
          "id": "Clearing-5",
          "left": 0,
          "top": -1.222,
          "width": 100,
          "height": 5.556,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "100vh",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Clearing-1",
          "left": -12.982,
          "top": -1.222,
          "width": 59.719,
          "height": 103.333,
          "fit": "cover"
        },
        {
          "id": "Clearing-2",
          "left": 37.965,
          "top": 30.667,
          "width": 53.965,
          "height": 97.444,
          "fit": "cover"
        },
        {
          "id": "Clearing-3",
          "left": -44.14,
          "top": 54.889,
          "width": 188.351,
          "height": 75.556,
          "fit": "cover"
        },
        {
          "id": "Clearing-4",
          "left": -15.439,
          "top": 0.444,
          "width": 130.877,
          "height": 87.444,
          "fit": "cover"
        },
        {
          "id": "Clearing-5",
          "left": 0,
          "top": -1.222,
          "width": 100,
          "height": 5.556,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "624px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Clearing-1",
          "left": -83.333,
          "top": -29.167,
          "width": 218.205,
          "height": 149.038,
          "fit": "cover"
        },
        {
          "id": "Clearing-2",
          "left": -30,
          "top": 7.051,
          "width": 197.179,
          "height": 140.545,
          "fit": "cover"
        },
        {
          "id": "Clearing-3",
          "left": -24.872,
          "top": 75.962,
          "width": 150,
          "height": 33.654,
          "fit": "cover"
        },
        {
          "id": "Clearing-4",
          "left": 50,
          "top": -32.372,
          "width": 410.256,
          "height": 108.173,
          "fit": "cover"
        },
        {
          "id": "Clearing-5",
          "left": 0,
          "top": 0,
          "width": 100,
          "height": 12.179,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "k5szjo",
    "name": "Panels",
    "dark": false,
    "large": {
      "height": "2740px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Panels-1",
          "left": 0.631,
          "top": -3.285,
          "width": 98.738,
          "height": 36.496,
          "fit": "cover"
        },
        {
          "id": "Panels-2",
          "left": 0.631,
          "top": 29.197,
          "width": 98.738,
          "height": 37.226,
          "fit": "cover"
        },
        {
          "id": "Panels-3",
          "left": -3.028,
          "top": 66.898,
          "width": 102.397,
          "height": 32.737,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "2065px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Panels-1",
          "left": 0.702,
          "top": -4.358,
          "width": 98.596,
          "height": 37.53,
          "fit": "cover"
        },
        {
          "id": "Panels-2",
          "left": 0.702,
          "top": 27.845,
          "width": 98.596,
          "height": 38.499,
          "fit": "cover"
        },
        {
          "id": "Panels-3",
          "left": -3.368,
          "top": 66.828,
          "width": 142.246,
          "height": 32.688,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "calc(1975px + 144.48vw)",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Panels-1",
          "left": -83.333,
          "top": -3.513,
          "width": 215.128,
          "height": 38.017,
          "fit": "cover"
        },
        {
          "id": "Panels-2",
          "left": -134.359,
          "top": 33.489,
          "width": 245.641,
          "height": 34.856,
          "fit": "cover"
        },
        {
          "id": "Panels-3",
          "left": -9.744,
          "top": 67.174,
          "width": 241.538,
          "height": 32.826,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "1htt17w",
    "name": "Totem",
    "dark": false,
    "large": {
      "height": "796px",
      "fixedWidth": 1600,
      "slots": [
        {
          "id": "Totem-1",
          "left": 22.625,
          "top": 1.633,
          "width": 22.875,
          "height": 96.734,
          "fit": "fill"
        }
      ]
    },
    "desktop": {
      "height": "1989px",
      "fixedWidth": 1600,
      "slots": [
        {
          "id": "Totem-1",
          "left": 9.938,
          "top": 27.25,
          "width": 40.25,
          "height": 68.125,
          "fit": "fill"
        }
      ]
    },
    "mobile": {
      "height": "1532px",
      "fixedWidth": 1600,
      "slots": [
        {
          "id": "Totem-1",
          "left": -15.375,
          "top": 38.185,
          "width": 24.125,
          "height": 53.003,
          "fit": "fill"
        }
      ]
    }
  },
  {
    "key": "12iimvw",
    "name": "Portal",
    "dark": false,
    "large": {
      "height": "1200px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Portal-1",
          "left": -1.009,
          "top": 2.167,
          "width": 102.082,
          "height": 95.667,
          "fit": "cover"
        },
        {
          "id": "Portal-2",
          "left": 0,
          "top": 94.333,
          "width": 100,
          "height": 5.667,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "1200px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Portal-1",
          "left": -6.737,
          "top": 2.167,
          "width": 113.544,
          "height": 95.667,
          "fit": "cover"
        },
        {
          "id": "Portal-2",
          "left": 0,
          "top": 94.333,
          "width": 100,
          "height": 5.667,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "577px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Portal-1",
          "left": -54.872,
          "top": -0.173,
          "width": 414.872,
          "height": 198.96,
          "fit": "cover"
        },
        {
          "id": "Portal-2",
          "left": 0,
          "top": 89.601,
          "width": 100,
          "height": 11.785,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "mnfkb7",
    "name": "Grove",
    "dark": false,
    "large": {
      "height": "2046px",
      "fixedWidth": 1600,
      "slots": [
        {
          "id": "Grove-1",
          "left": 21.875,
          "top": 51.466,
          "width": 5,
          "height": 5.376,
          "fit": "cover"
        },
        {
          "id": "Grove-2",
          "left": -0.438,
          "top": 32.209,
          "width": 49.688,
          "height": 53.715,
          "fit": "cover"
        },
        {
          "id": "Grove-3",
          "left": -5.438,
          "top": 17.986,
          "width": 59.625,
          "height": 64.516,
          "fit": "cover"
        },
        {
          "id": "Grove-4",
          "left": 50.5,
          "top": 36.51,
          "width": 48.438,
          "height": 54.741,
          "fit": "cover"
        },
        {
          "id": "Grove-5",
          "left": 72.25,
          "top": 57.722,
          "width": 4.875,
          "height": 5.474,
          "fit": "cover"
        },
        {
          "id": "Grove-6",
          "left": 50.5,
          "top": 32.014,
          "width": 48.438,
          "height": 54.741,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "2696px",
      "fixedWidth": 1600,
      "slots": [
        {
          "id": "Grove-1",
          "left": 42.063,
          "top": 26.187,
          "width": 5,
          "height": 4.08,
          "fit": "cover"
        },
        {
          "id": "Grove-2",
          "left": 19.688,
          "top": 11.573,
          "width": 49.688,
          "height": 40.764,
          "fit": "cover"
        },
        {
          "id": "Grove-3",
          "left": 14.688,
          "top": 0.779,
          "width": 59.625,
          "height": 48.961,
          "fit": "cover"
        },
        {
          "id": "Grove-4",
          "left": 20.313,
          "top": 60.237,
          "width": 48.438,
          "height": 41.543,
          "fit": "cover"
        },
        {
          "id": "Grove-5",
          "left": 42.125,
          "top": 76.335,
          "width": 4.875,
          "height": 4.154,
          "fit": "cover"
        },
        {
          "id": "Grove-6",
          "left": 20.313,
          "top": 56.825,
          "width": 48.438,
          "height": 41.543,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "2182px",
      "fixedWidth": 1202,
      "slots": [
        {
          "id": "Grove-1",
          "left": -3.993,
          "top": 20.898,
          "width": 6.656,
          "height": 5.041,
          "fit": "cover"
        },
        {
          "id": "Grove-2",
          "left": -33.777,
          "top": 2.841,
          "width": 66.14,
          "height": 50.367,
          "fit": "cover"
        },
        {
          "id": "Grove-3",
          "left": -40.433,
          "top": -10.495,
          "width": 79.368,
          "height": 60.495,
          "fit": "cover"
        },
        {
          "id": "Grove-4",
          "left": -41.681,
          "top": 76.444,
          "width": 64.476,
          "height": 51.329,
          "fit": "cover"
        },
        {
          "id": "Grove-5",
          "left": -12.729,
          "top": 70.761,
          "width": 6.489,
          "height": 5.133,
          "fit": "cover"
        },
        {
          "id": "Grove-6",
          "left": -9.983,
          "top": 20.761,
          "width": 64.476,
          "height": 51.329,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "10ytyjo",
    "name": "Spread",
    "dark": false,
    "large": {
      "height": "2852px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Spread-1",
          "left": 44.101,
          "top": 22.3,
          "width": 95.142,
          "height": 61.431,
          "fit": "cover"
        },
        {
          "id": "Spread-2",
          "left": -42.965,
          "top": 37.553,
          "width": 95.142,
          "height": 61.431,
          "fit": "cover"
        },
        {
          "id": "Spread-3",
          "left": 74.7,
          "top": 45.898,
          "width": 25.615,
          "height": 17.356,
          "fit": "cover"
        },
        {
          "id": "Spread-4",
          "left": 70.284,
          "top": 63.429,
          "width": 25.615,
          "height": 17.356,
          "fit": "cover"
        },
        {
          "id": "Spread-5",
          "left": 17.224,
          "top": 34.853,
          "width": 63.028,
          "height": 57.468,
          "fit": "cover"
        },
        {
          "id": "Spread-6",
          "left": -11.672,
          "top": 57.644,
          "width": 31.861,
          "height": 21.003,
          "fit": "fill"
        },
        {
          "id": "Spread-7",
          "left": -6.625,
          "top": 75.175,
          "width": 31.861,
          "height": 21.003,
          "fit": "fill"
        },
        {
          "id": "Spread-8",
          "left": 46.12,
          "top": 58.626,
          "width": 22.334,
          "height": 15.042,
          "fit": "cover"
        },
        {
          "id": "Spread-9",
          "left": 51.735,
          "top": 76.157,
          "width": 22.334,
          "height": 15.042,
          "fit": "cover"
        },
        {
          "id": "Spread-10",
          "left": 64.416,
          "top": 80.084,
          "width": 31.546,
          "height": 24.018,
          "fit": "cover"
        },
        {
          "id": "Spread-11",
          "left": -11.861,
          "top": 85.729,
          "width": 37.476,
          "height": 23.562,
          "fit": "cover"
        },
        {
          "id": "Spread-12",
          "left": 15.899,
          "top": 72.265,
          "width": 21.262,
          "height": 17.216,
          "fit": "cover"
        },
        {
          "id": "Spread-13",
          "left": 72.681,
          "top": 89.797,
          "width": 21.262,
          "height": 17.216,
          "fit": "cover"
        },
        {
          "id": "Spread-14",
          "left": 9.59,
          "top": 40.708,
          "width": 30.789,
          "height": 21.003,
          "fit": "cover"
        },
        {
          "id": "Spread-15",
          "left": 0,
          "top": 95.582,
          "width": 100,
          "height": 4.453,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "3022px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Spread-1",
          "left": 37.825,
          "top": 27.002,
          "width": 105.825,
          "height": 57.975,
          "fit": "cover"
        },
        {
          "id": "Spread-2",
          "left": -59.018,
          "top": 41.066,
          "width": 105.825,
          "height": 57.975,
          "fit": "cover"
        },
        {
          "id": "Spread-3",
          "left": 83.088,
          "top": 48.941,
          "width": 28.491,
          "height": 16.38,
          "fit": "cover"
        },
        {
          "id": "Spread-4",
          "left": 78.175,
          "top": 65.486,
          "width": 28.491,
          "height": 16.38,
          "fit": "cover"
        },
        {
          "id": "Spread-5",
          "left": 13.684,
          "top": 38.518,
          "width": 70.105,
          "height": 54.236,
          "fit": "cover"
        },
        {
          "id": "Spread-6",
          "left": -12.982,
          "top": 60.026,
          "width": 35.439,
          "height": 19.821,
          "fit": "fill"
        },
        {
          "id": "Spread-7",
          "left": -7.368,
          "top": 76.572,
          "width": 35.439,
          "height": 19.821,
          "fit": "fill"
        },
        {
          "id": "Spread-8",
          "left": 44.842,
          "top": 60.953,
          "width": 24.842,
          "height": 14.196,
          "fit": "cover"
        },
        {
          "id": "Spread-9",
          "left": 57.544,
          "top": 77.498,
          "width": 24.842,
          "height": 14.196,
          "fit": "cover"
        },
        {
          "id": "Spread-10",
          "left": 60.421,
          "top": 81.205,
          "width": 35.088,
          "height": 22.667,
          "fit": "cover"
        },
        {
          "id": "Spread-11",
          "left": -13.193,
          "top": 86.532,
          "width": 41.684,
          "height": 22.237,
          "fit": "cover"
        },
        {
          "id": "Spread-12",
          "left": 17.684,
          "top": 73.825,
          "width": 23.649,
          "height": 16.248,
          "fit": "cover"
        },
        {
          "id": "Spread-13",
          "left": 80.842,
          "top": 90.371,
          "width": 23.649,
          "height": 16.248,
          "fit": "cover"
        },
        {
          "id": "Spread-14",
          "left": 10.667,
          "top": 44.044,
          "width": 34.246,
          "height": 19.821,
          "fit": "cover"
        },
        {
          "id": "Spread-15",
          "left": 0,
          "top": 96.261,
          "width": 100,
          "height": 3.772,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "2427px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Spread-1",
          "left": -127.179,
          "top": 6.593,
          "width": 261.538,
          "height": 48.826,
          "fit": "cover"
        },
        {
          "id": "Spread-2",
          "left": -143.333,
          "top": 31.562,
          "width": 386.667,
          "height": 72.188,
          "fit": "cover"
        },
        {
          "id": "Spread-3",
          "left": -4.103,
          "top": 36.424,
          "width": 104.103,
          "height": 20.396,
          "fit": "cover"
        },
        {
          "id": "Spread-4",
          "left": -4.103,
          "top": 57.025,
          "width": 104.103,
          "height": 20.396,
          "fit": "cover"
        },
        {
          "id": "Spread-5",
          "left": -79.231,
          "top": 23.445,
          "width": 256.154,
          "height": 67.532,
          "fit": "cover"
        },
        {
          "id": "Spread-6",
          "left": -47.436,
          "top": 50.227,
          "width": 129.487,
          "height": 24.681,
          "fit": "fill"
        },
        {
          "id": "Spread-7",
          "left": -26.923,
          "top": 70.828,
          "width": 129.487,
          "height": 24.681,
          "fit": "fill"
        },
        {
          "id": "Spread-8",
          "left": 12.051,
          "top": 57.272,
          "width": 90.769,
          "height": 17.676,
          "fit": "cover"
        },
        {
          "id": "Spread-9",
          "left": 210.256,
          "top": 71.982,
          "width": 90.769,
          "height": 17.676,
          "fit": "cover"
        },
        {
          "id": "Spread-10",
          "left": -44.615,
          "top": 76.597,
          "width": 128.205,
          "height": 28.224,
          "fit": "cover"
        },
        {
          "id": "Spread-11",
          "left": -48.205,
          "top": 83.23,
          "width": 152.308,
          "height": 27.689,
          "fit": "cover"
        },
        {
          "id": "Spread-12",
          "left": 33.846,
          "top": 67.408,
          "width": 86.41,
          "height": 20.231,
          "fit": "cover"
        },
        {
          "id": "Spread-13",
          "left": 295.385,
          "top": 88.01,
          "width": 86.41,
          "height": 20.231,
          "fit": "cover"
        },
        {
          "id": "Spread-14",
          "left": 38.974,
          "top": 30.326,
          "width": 125.128,
          "height": 24.681,
          "fit": "cover"
        },
        {
          "id": "Spread-15",
          "left": 0,
          "top": 98.764,
          "width": 100,
          "height": 1.277,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "1csghqk",
    "name": "Nightfall",
    "dark": true,
    "large": {
      "height": "1250px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Nightfall-1",
          "left": -18.991,
          "top": -21.44,
          "width": 145.931,
          "height": 174.08,
          "fit": "cover"
        },
        {
          "id": "Nightfall-2",
          "left": -56.53,
          "top": 29.92,
          "width": 139.685,
          "height": 98.4,
          "fit": "fill"
        },
        {
          "id": "Nightfall-3",
          "left": -42.776,
          "top": 51.6,
          "width": 132.618,
          "height": 126.08,
          "fit": "fill"
        },
        {
          "id": "Nightfall-4",
          "left": 0,
          "top": 89.84,
          "width": 100,
          "height": 10.16,
          "fit": "cover"
        },
        {
          "id": "Nightfall-5",
          "left": 0.063,
          "top": -0.08,
          "width": 99.937,
          "height": 5.28,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "1250px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Nightfall-1",
          "left": -23.93,
          "top": -4,
          "width": 129.825,
          "height": 139.2,
          "fit": "cover"
        },
        {
          "id": "Nightfall-2",
          "left": -97.263,
          "top": 29.92,
          "width": 155.368,
          "height": 98.4,
          "fit": "fill"
        },
        {
          "id": "Nightfall-3",
          "left": -81.965,
          "top": 44.4,
          "width": 147.509,
          "height": 126.08,
          "fit": "fill"
        },
        {
          "id": "Nightfall-4",
          "left": 0,
          "top": 90.88,
          "width": 100,
          "height": 9.12,
          "fit": "cover"
        },
        {
          "id": "Nightfall-5",
          "left": 0.07,
          "top": -0.08,
          "width": 99.93,
          "height": 5.28,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "800px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Nightfall-1",
          "left": -36.41,
          "top": 25.125,
          "width": 166.923,
          "height": 76.5,
          "fit": "cover"
        },
        {
          "id": "Nightfall-2",
          "left": -296.667,
          "top": 10.125,
          "width": 541.282,
          "height": 146.625,
          "fit": "fill"
        },
        {
          "id": "Nightfall-3",
          "left": -298.462,
          "top": 14.625,
          "width": 510.769,
          "height": 186.75,
          "fit": "fill"
        },
        {
          "id": "Nightfall-4",
          "left": 0,
          "top": 96.125,
          "width": 100,
          "height": 3.875,
          "fit": "cover"
        },
        {
          "id": "Nightfall-5",
          "left": 0.256,
          "top": 0,
          "width": 99.744,
          "height": 9.5,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "kcykm",
    "name": "Duet",
    "dark": true,
    "large": {
      "height": "2590px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Duet-1",
          "left": -1.577,
          "top": 47.066,
          "width": 53.312,
          "height": 51.583,
          "fit": "cover"
        },
        {
          "id": "Duet-2",
          "left": 43.344,
          "top": 5.174,
          "width": 56.782,
          "height": 47.683,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "3164px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Duet-1",
          "left": 20.351,
          "top": 48.957,
          "width": 59.298,
          "height": 42.225,
          "fit": "cover"
        },
        {
          "id": "Duet-2",
          "left": 40.14,
          "top": 4.235,
          "width": 63.158,
          "height": 39.033,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "2252px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Duet-1",
          "left": -5.385,
          "top": 47.469,
          "width": 114.872,
          "height": 35.524,
          "fit": "cover"
        },
        {
          "id": "Duet-2",
          "left": -8.205,
          "top": 7.682,
          "width": 167.436,
          "height": 32.948,
          "fit": "cover"
        }
      ]
    }
  },
  {
    "key": "pf7mlq",
    "name": "Band",
    "dark": false,
    "large": {
      "height": "261px",
      "fixedWidth": 1625,
      "slots": []
    },
    "desktop": {
      "height": "261px",
      "fixedWidth": 1625,
      "slots": []
    },
    "mobile": {
      "height": "206px",
      "fixedWidth": 1625,
      "slots": []
    }
  },
  {
    "key": "1pk46w7",
    "name": "Finale",
    "dark": false,
    "large": {
      "height": "953px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Finale-1",
          "left": 0.315,
          "top": 45.435,
          "width": 99.306,
          "height": 57.083,
          "fit": "cover"
        },
        {
          "id": "Finale-2",
          "left": -0.442,
          "top": 0,
          "width": 100.946,
          "height": 88.038,
          "fit": "cover"
        },
        {
          "id": "Finale-3",
          "left": 3.155,
          "top": 0,
          "width": 91.924,
          "height": 71.249,
          "fit": "cover"
        }
      ]
    },
    "desktop": {
      "height": "953px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Finale-1",
          "left": 22.386,
          "top": 47.744,
          "width": 55.228,
          "height": 28.541,
          "fit": "cover"
        },
        {
          "id": "Finale-2",
          "left": 21.965,
          "top": 24.974,
          "width": 56.14,
          "height": 44.071,
          "fit": "cover"
        },
        {
          "id": "Finale-3",
          "left": 24,
          "top": 24.974,
          "width": 51.158,
          "height": 35.677,
          "fit": "cover"
        }
      ]
    },
    "mobile": {
      "height": "459px",
      "fixedWidth": null,
      "slots": [
        {
          "id": "Finale-1",
          "left": -51.026,
          "top": 32.462,
          "width": 201.795,
          "height": 59.259,
          "fit": "cover"
        },
        {
          "id": "Finale-2",
          "left": -52.564,
          "top": 1.307,
          "width": 205.128,
          "height": 91.503,
          "fit": "cover"
        },
        {
          "id": "Finale-3",
          "left": -43.846,
          "top": 5.882,
          "width": 186.923,
          "height": 74.074,
          "fit": "cover"
        }
      ]
    }
  }
];
