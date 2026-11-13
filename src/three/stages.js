/** Per-template 3D staging: lights, materials and float personality (PLAN §8). */
export const STAGES = {
  luxury: {
    ambient: 0.25,
    key: { color: '#ffdcae', intensity: 60, position: [-3, 6, 4] },
    rim: { color: '#c9a35b', intensity: 40, position: [3, 3, -4] },
    fill: { color: '#6b4a2a', intensity: 6, position: [4, 1, 3] },
    env: [{ color: '#ffd9a8', intensity: 1.2, position: [0, 5, -6], scale: [10, 4, 1] }, { color: '#c9a35b', intensity: 0.8, position: [-6, 1, 0], scale: [3, 6, 1] }],
    shadow: { color: '#000000', opacity: 0.85, blur: 2.6 },
    float: { speed: 1.1, rotationIntensity: 0.15, floatIntensity: 0.35 },
    autoRotate: 0.18,
    cup: { body: '#16120f', rim: '#c9a35b', roughness: 0.35 },
    donut: { icing: '#24120a', sprinkles: ['#c9a35b', '#e6c98f', '#f3ede2', '#7a4b2a'] },
    bun: '#b8692a',
  },
  minimal: {
    ambient: 0.75,
    key: { color: '#fff6ea', intensity: 35, position: [-4, 7, 5] },
    rim: { color: '#ffffff', intensity: 14, position: [3, 4, -4] },
    fill: { color: '#f3e6d6', intensity: 8, position: [4, 2, 4] },
    env: [{ color: '#ffffff', intensity: 1.4, position: [0, 6, -4], scale: [12, 6, 1] }, { color: '#f6ece0', intensity: 1, position: [6, 2, 2], scale: [4, 6, 1] }],
    shadow: { color: '#6b4f3a', opacity: 0.35, blur: 3 },
    float: { speed: 0.9, rotationIntensity: 0.08, floatIntensity: 0.2 },
    autoRotate: 0.12,
    cup: { body: '#efe7dc', rim: '#e3d6c6', roughness: 0.55 },
    donut: { icing: '#5a3524', sprinkles: ['#e9d6c2', '#b65a4f', '#f7f1e8', '#8a6a52'] },
    bun: '#c98a45',
  },
  colorful: {
    ambient: 0.7,
    key: { color: '#ffffff', intensity: 45, position: [-3, 6, 5] },
    rim: { color: '#ff4f8b', intensity: 40, position: [4, 3, -3] },
    fill: { color: '#14b8a6', intensity: 25, position: [-4, 1, -2] },
    env: [{ color: '#ffffff', intensity: 1.2, position: [0, 6, -4], scale: [10, 5, 1] }, { color: '#ffd23f', intensity: 1, position: [6, 1, 2], scale: [4, 6, 1] }],
    shadow: { color: '#1b1035', opacity: 0.45, blur: 2.4 },
    float: { speed: 2, rotationIntensity: 0.35, floatIntensity: 0.6 },
    autoRotate: 0.35,
    cup: { body: '#ffc6da', rim: '#ff4f8b', roughness: 0.3 },
    donut: { icing: '#ff6fa5', sprinkles: ['#ffd23f', '#14b8a6', '#7b5cff', '#ffffff', '#ff8a3d', '#3a86ff'] },
    bun: '#d4843a',
  },
}

/** Label anchor positions (fixed, outside the rotating model so they stay readable). side: 1 = right, -1 = left */
export const LABEL_ANCHORS = {
  burger: [
    { key: 'bun', y: 1.5, side: 1 },
    { key: 'tomato', y: 1.05, side: -1 },
    { key: 'lettuce', y: 0.78, side: 1 },
    { key: 'cheese', y: 0.55, side: -1 },
    { key: 'patty', y: 0.32, side: 1 },
  ],
  latte: [
    { key: 'foam', y: 1.15, side: -1 },
    { key: 'cup', y: 0.6, side: 1 },
    { key: 'saucer', y: 0.12, side: -1 },
  ],
  donut: [
    { key: 'sprinkles', y: 1.0, side: 1 },
    { key: 'icing', y: 0.75, side: -1 },
    { key: 'dough', y: 0.18, side: 1 },
  ],
}
