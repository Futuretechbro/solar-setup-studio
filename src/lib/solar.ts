export type Appliance = {
  id: string;
  name: string;
  watts: number;
  qty: number;
  hours: number;
};

export type BatteryType = "lithium" | "tubular";

export const APPLIANCE_PRESETS: Omit<Appliance, "id" | "qty">[] = [
  { name: "LED bulb", watts: 10, hours: 6 },
  { name: "Standing fan", watts: 70, hours: 8 },
  { name: "Ceiling fan", watts: 75, hours: 8 },
  { name: "LED TV (43\")", watts: 100, hours: 6 },
  { name: "Decoder / router", watts: 25, hours: 8 },
  { name: "Laptop", watts: 65, hours: 6 },
  { name: "Phone charging", watts: 10, hours: 3 },
  { name: "Fridge", watts: 150, hours: 10 },
  { name: "Chest freezer", watts: 200, hours: 12 },
  { name: "Air conditioner (1hp)", watts: 900, hours: 5 },
  { name: "Water pump (1hp)", watts: 750, hours: 1 },
  { name: "Pressing iron", watts: 1000, hours: 0.5 },
  { name: "Microwave", watts: 1000, hours: 0.3 },
];

const INVERTER_SIZES_KVA = [1, 1.5, 2.5, 3.5, 5, 7.5, 10, 15, 20];
const SAFETY_MARGIN = 1.25;
const POWER_FACTOR = 0.8;
const NIGHT_DIVERSITY = 0.7; // not everything runs at once on battery
const SYSTEM_EFFICIENCY = 0.75; // panel losses: heat, dust, wiring
const PANEL_WATTS = 550;

const BATTERIES: Record<BatteryType, { label: string; unitWh: number; unitVolts: number; dod: number }> = {
  lithium: { label: "Lithium (LiFePO4) 5kWh", unitWh: 5120, unitVolts: 0, dod: 0.9 },
  tubular: { label: "Tubular 12V 220Ah", unitWh: 2640, unitVolts: 12, dod: 0.5 },
};

export type SolarResult = {
  peakWatts: number;
  dailyWh: number;
  inverterKva: number;
  systemVolts: 12 | 24 | 48;
  batteryWh: number;
  batteryUnits: number;
  batteryLabel: string;
  panelCount: number;
  panelWatts: number;
  solarArrayWatts: number;
};

export function sizeSolarSystem(
  appliances: Appliance[],
  options: { backupHours: number; sunHours?: number; battery: BatteryType },
): SolarResult {
  const sunHours = options.sunHours ?? 5;
  const peakWatts = appliances.reduce((s, a) => s + Math.max(0, a.watts) * Math.max(0, a.qty), 0);
  const dailyWh = appliances.reduce(
    (s, a) => s + Math.max(0, a.watts) * Math.max(0, a.qty) * Math.max(0, a.hours),
    0,
  );

  const neededKva = (peakWatts * SAFETY_MARGIN) / POWER_FACTOR / 1000;
  const inverterKva =
    peakWatts === 0
      ? 0
      : (INVERTER_SIZES_KVA.find((k) => k >= neededKva) ?? Math.ceil(neededKva / 5) * 5);

  const systemVolts: 12 | 24 | 48 = inverterKva <= 1 ? 12 : inverterKva <= 3.5 ? 24 : 48;

  const battery = BATTERIES[options.battery];
  const backupEnergy = Math.min(peakWatts * NIGHT_DIVERSITY * options.backupHours, dailyWh);
  const batteryWh = backupEnergy / battery.dod;

  let batteryUnits = batteryWh === 0 ? 0 : Math.ceil(batteryWh / battery.unitWh);
  if (battery.unitVolts > 0 && batteryUnits > 0) {
    const perString = systemVolts / battery.unitVolts;
    batteryUnits = Math.ceil(batteryUnits / perString) * perString;
  }

  const panelCount = dailyWh === 0 ? 0 : Math.ceil(dailyWh / (sunHours * SYSTEM_EFFICIENCY) / PANEL_WATTS);

  return {
    peakWatts,
    dailyWh,
    inverterKva,
    systemVolts,
    batteryWh,
    batteryUnits,
    batteryLabel: battery.label,
    panelCount,
    panelWatts: PANEL_WATTS,
    solarArrayWatts: panelCount * PANEL_WATTS,
  };
}
