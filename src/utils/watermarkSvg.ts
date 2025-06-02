export function getWatermarkSVG(width: number, height: number, fontSize: number) {
    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" overflow="visible">
    <text
      x="50%"
      y="${fontSize + 10}"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="${fontSize}"
      fill="red"
      opacity="0.5"
      font-family="Arial, Helvetica, sans-serif"
      transform="rotate(-20, ${width / 2}, ${fontSize + 10})"
    >
      KLIDJON FOTOGRAFI
    </text>
    <text
      x="50%"
      y="${height / 2}"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="${fontSize}"
      fill="red"
      opacity="0.5"
      font-family="Arial, Helvetica, sans-serif"
      transform="rotate(-20, ${width / 2}, ${height / 2})"
    >
      KLIDJON FOTOGRAFI
    </text>
    <text
      x="50%"
      y="${height - fontSize}"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="${fontSize}"
      fill="red"
      opacity="0.5"
      font-family="Arial, Helvetica, sans-serif"
      transform="rotate(-20, ${width / 2}, ${height - fontSize})"
    >
      KLIDJON FOTOGRAFI
    </text>
  </svg>`;
}