export interface GPUSpecs {
  model: string;
  vram: number;
  memory_bandwidth: number;
  compute_units: number;
  boost_clock: number;
}

export interface AuditResult {
  score: number;
  rating: 'EXCELLENT' | 'GREAT' | 'GOOD' | 'MODERATE' | 'POOR';
  details: string;
  recommendation: string;
}

const gpuDatabase: Record<string, GPUSpecs> = {
  'RTX 4090': {
    model: 'NVIDIA RTX 4090',
    vram: 24,
    memory_bandwidth: 1008,
    compute_units: 128,
    boost_clock: 2520,
  },
  'RTX 4080': {
    model: 'NVIDIA RTX 4080',
    vram: 16,
    memory_bandwidth: 576,
    compute_units: 80,
    boost_clock: 2505,
  },
  'RTX 4070': {
    model: 'NVIDIA RTX 4070',
    vram: 12,
    memory_bandwidth: 432,
    compute_units: 64,
    boost_clock: 2475,
  },
  'RTX 4060': {
    model: 'NVIDIA RTX 4060',
    vram: 8,
    memory_bandwidth: 288,
    compute_units: 48,
    boost_clock: 2460,
  },
  'RX 7900 XTX': {
    model: 'AMD Radeon RX 7900 XTX',
    vram: 24,
    memory_bandwidth: 960,
    compute_units: 96,
    boost_clock: 2500,
  },
  'RX 7900 XT': {
    model: 'AMD Radeon RX 7900 XT',
    vram: 20,
    memory_bandwidth: 576,
    compute_units: 84,
    boost_clock: 2500,
  },
  'RX 6800 XT': {
    model: 'AMD Radeon RX 6800 XT',
    vram: 16,
    memory_bandwidth: 576,
    compute_units: 72,
    boost_clock: 2360,
  },
};

export function scorePC(
  gpu: string,
  cpu: string,
  ram: number,
  storage: number
): AuditResult {
  const gpuSpecs = gpuDatabase[gpu];
  if (!gpuSpecs) {
    return {
      score: 0,
      rating: 'POOR',
      details: 'GPU not found in database',
      recommendation: 'Please select a valid GPU from the list',
    };
  }

  let score = 0;

  // GPU Score (40%)
  const gpuScore = Math.min(100, (gpuSpecs.vram / 24) * 100);
  score += gpuScore * 0.4;

  // CPU Score (30%)
  const cpuScore = cpu.toLowerCase().includes('threadripper') ? 95 :
                   cpu.toLowerCase().includes('ryzen 9') ? 90 :
                   cpu.toLowerCase().includes('ryzen 7') ? 80 :
                   cpu.toLowerCase().includes('i9') ? 85 :
                   cpu.toLowerCase().includes('i7') ? 75 : 50;
  score += cpuScore * 0.3;

  // RAM Score (15%)
  const ramScore = Math.min(100, (ram / 64) * 100);
  score += ramScore * 0.15;

  // Storage Score (15%)
  const storageScore = Math.min(100, (storage / 2000) * 100);
  score += storageScore * 0.15;

  const finalScore = Math.round(score);

  let rating: AuditResult['rating'];
  let details: string;
  let recommendation: string;

  if (finalScore >= 90) {
    rating = 'EXCELLENT';
    details = `Your setup is ${finalScore === 100 ? 'PERFECT' : 'exceptional'}. You're ready for any game at maximum settings.`;
    recommendation = 'You can run GTA VI at ultra settings with ray tracing enabled!';
  } else if (finalScore >= 80) {
    rating = 'GREAT';
    details = 'Your setup is very solid. Excellent for gaming at high settings.';
    recommendation = 'GTA VI will run at high settings with great frame rates.';
  } else if (finalScore >= 70) {
    rating = 'GOOD';
    details = 'Your setup is capable. Good for gaming at medium-high settings.';
    recommendation = 'GTA VI will run smoothly at high settings.';
  } else if (finalScore >= 50) {
    rating = 'MODERATE';
    details = 'Your setup can handle gaming. Moderate settings recommended.';
    recommendation = 'GTA VI will run at medium settings with acceptable frame rates.';
  } else {
    rating = 'POOR';
    details = 'Your setup needs upgrades for optimal gaming.';
    recommendation = 'Consider upgrading your GPU or RAM for better performance.';
  }

  return { score: finalScore, rating, details, recommendation };
}

export function getGPUList(): string[] {
  return Object.keys(gpuDatabase);
}

export function getGPUSpecs(gpu: string): GPUSpecs | null {
  return gpuDatabase[gpu] || null;
}
