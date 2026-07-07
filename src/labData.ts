import { LabExperiment } from './types';

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'surface-tension',
    title: 'Determination of Surface Tension and Viscosity',
    aim: 'To determine the surface tension and viscosity of the given liquid at room temperature.',
    apparatus: ['Stalagmometer', 'Ostwald Viscometer', 'Specific Gravity Bottle', 'Beaker', 'Rubber bulb'],
    chemicals: ['Distilled water', 'Test liquid (e.g., Ethanol or Acetone)'],
    procedure: [
      'Clean the Stalagmometer and Viscometer with chromic acid and wash with water.',
      'Determine the density of the test liquid using a specific gravity bottle.',
      'Surface Tension: Count the number of drops of water and test liquid falling between two marks on the Stalagmometer.',
      'Viscosity: Measure the time of flow of water and test liquid between two marks on the Ostwald Viscometer.',
      'Repeat the measurements three times for accuracy.'
    ],
    observations: [
      'Number of drops of water (nw)',
      'Number of drops of liquid (nl)',
      'Time of flow of water (tw)',
      'Time of flow of liquid (tl)',
      'Density of water (dw)',
      'Density of liquid (dl)'
    ],
    result: 'The surface tension of the liquid is ______ dynes/cm and the viscosity is ______ centipoise.',
    precautions: [
      'The Stalagmometer should be held vertically.',
      'The liquid should be free from air bubbles.',
      'The temperature should remain constant during the experiment.'
    ]
  },
  {
    id: 'edta-hardness',
    title: 'EDTA Method for Removal of Hardness of Water',
    aim: 'To determine the total hardness of a given water sample by EDTA titration.',
    apparatus: ['Burette', 'Pipette', 'Conical flask', 'Volumetric flask'],
    chemicals: ['Standard EDTA solution (0.01M)', 'Eriochrome Black-T (EBT) indicator', 'Buffer solution (pH 10)', 'Water sample'],
    procedure: [
      'Pipette out 20ml of the water sample into a conical flask.',
      'Add 2ml of buffer solution to maintain pH 10.',
      'Add 2-3 drops of EBT indicator; the solution turns wine red.',
      'Titrate against standard EDTA solution until the color changes from wine red to steel blue.',
      'Note the volume of EDTA used (V1).',
      'Repeat for concordant values.'
    ],
    observations: [
      'Volume of water sample = 20 ml',
      'Burette reading (Initial and Final)',
      'Volume of EDTA consumed = V1 ml'
    ],
    result: 'Total hardness of water = (V1 * Molarity of EDTA * 1000 * 100) / Volume of sample ppm.',
    precautions: [
      'Maintain pH 10 strictly using the buffer.',
      'The endpoint should be a sharp change to steel blue.',
      'Glassware should be rinsed with distilled water.'
    ]
  },
  {
    id: 'tlc-chromatography',
    title: 'Thin Layer Chromatography (TLC)',
    aim: 'To separate and identify the components of a given mixture using TLC.',
    apparatus: ['TLC plates (Silica gel)', 'Developing chamber', 'Capillary tubes', 'UV lamp or Iodine chamber'],
    chemicals: ['Mobile phase (e.g., Hexane/Ethyl acetate)', 'Sample mixture', 'Reference compounds'],
    procedure: [
      'Prepare the TLC plate by marking a baseline 1cm from the bottom.',
      'Spot the sample and reference compounds on the baseline using a capillary tube.',
      'Place the plate in the developing chamber containing the mobile phase.',
      'Allow the solvent to rise to about 3/4th of the plate.',
      'Remove the plate, mark the solvent front, and dry it.',
      'Visualize the spots using a UV lamp or iodine vapor.'
    ],
    observations: [
      'Distance traveled by the solvent (ds)',
      'Distance traveled by component A (da)',
      'Distance traveled by component B (db)',
      'Rf value = Distance traveled by component / Distance traveled by solvent'
    ],
    result: 'The components were identified based on their Rf values.',
    precautions: [
      'Do not touch the silica surface of the TLC plate.',
      'The solvent level must be below the baseline.',
      'The chamber should be saturated with solvent vapor.'
    ]
  },
  {
    id: 'conductance-cell',
    title: 'Determination of Cell Constant and Conductance',
    aim: 'To determine the cell constant of a conductivity cell and the specific conductance of a given solution.',
    apparatus: ['Conductivity meter', 'Conductivity cell', 'Beakers', 'Thermometer'],
    chemicals: ['Standard 0.1N KCl solution', 'Test solution'],
    procedure: [
      'Clean the conductivity cell with distilled water.',
      'Calibrate the conductivity meter using standard 0.1N KCl solution.',
      'Measure the conductance of the KCl solution.',
      'Calculate the cell constant (G* = Specific Conductance / Observed Conductance).',
      'Rinse the cell and measure the conductance of the test solution.',
      'Calculate the specific conductance of the test solution.'
    ],
    observations: [
      'Observed conductance of KCl (Gk)',
      'Specific conductance of KCl (κk)',
      'Observed conductance of test solution (Gt)'
    ],
    result: 'The cell constant is ______ cm-1 and the specific conductance is ______ S/cm.',
    precautions: [
      'The electrodes should be completely submerged.',
      'Avoid air bubbles between the electrodes.',
      'Maintain a constant temperature.'
    ]
  },
  {
    id: 'polymer-synthesis',
    title: 'Synthesis of a Polymer (Bakelite/Nylon)',
    aim: 'To synthesize a phenol-formaldehyde resin (Bakelite) in the laboratory.',
    apparatus: ['Beaker', 'Glass rod', 'Water bath', 'Watch glass'],
    chemicals: ['Phenol', 'Formaldehyde (40%)', 'Glacial acetic acid', 'Concentrated HCl'],
    procedure: [
      'Take 5ml of glacial acetic acid and 2.5ml of formaldehyde in a beaker.',
      'Add 2g of phenol to the mixture.',
      'Add a few drops of concentrated HCl slowly with constant stirring.',
      'Heat the mixture on a water bath until a pink mass begins to form.',
      'Wash the solid product with water and dry it.',
      'The resulting hard plastic is Bakelite.'
    ],
    observations: [
      'Formation of a viscous liquid followed by a hard solid.',
      'Color change to pink/red.'
    ],
    result: 'Phenol-formaldehyde resin (Bakelite) was successfully synthesized.',
    precautions: [
      'Phenol is corrosive; handle with care.',
      'Perform the experiment in a well-ventilated area.',
      'Add HCl very slowly.'
    ]
  },
  {
    id: 'dissolved-oxygen',
    title: 'Determination of Dissolved Oxygen (Winkler\'s Method)',
    aim: 'To determine the amount of dissolved oxygen in a given water sample.',
    apparatus: ['BOD bottle', 'Burette', 'Pipette', 'Conical flask'],
    chemicals: ['Manganese sulfate (MnSO4)', 'Alkaline iodide-azide reagent', 'Concentrated H2SO4', 'Standard Sodium thiosulfate (0.025N)', 'Starch indicator'],
    procedure: [
      'Fill a 300ml BOD bottle with the water sample without trapping air bubbles.',
      'Add 2ml of MnSO4 and 2ml of alkaline iodide-azide reagent.',
      'Stopper the bottle and mix by inverting; a brown precipitate forms.',
      'Add 2ml of concentrated H2SO4 and mix until the precipitate dissolves.',
      'Pipette 203ml of the solution into a conical flask.',
      'Titrate against standard sodium thiosulfate using starch as indicator (color change: blue to colorless).'
    ],
    observations: [
      'Volume of sample titrated = 200 ml',
      'Normality of thiosulfate = 0.025 N',
      'Volume of thiosulfate used = V ml'
    ],
    result: 'Dissolved Oxygen (DO) = (V * N * 8 * 1000) / Volume of sample mg/L.',
    precautions: [
      'Avoid air entrainment during sampling.',
      'Add reagents below the surface of the liquid.',
      'Titrate immediately after acidification.'
    ]
  },
  {
    id: 'coal-analysis',
    title: 'Proximate Analysis of Coal',
    aim: 'To determine the moisture, volatile matter, ash, and fixed carbon content in a coal sample.',
    apparatus: ['Muffle furnace', 'Silica crucible', 'Desiccator', 'Analytical balance'],
    chemicals: ['Coal sample'],
    procedure: [
      'Moisture: Heat 1g of coal in an oven at 110°C for 1 hour. Calculate weight loss.',
      'Volatile Matter: Heat the moisture-free coal in a covered crucible at 950°C for 7 minutes in a muffle furnace.',
      'Ash: Heat the residue in an uncovered crucible at 750°C until constant weight is achieved.',
      'Fixed Carbon: Calculate by subtracting the percentages of moisture, volatile matter, and ash from 100.'
    ],
    observations: [
      'Initial weight of coal (W)',
      'Weight after heating at 110°C (W1)',
      'Weight after heating at 950°C (W2)',
      'Weight of ash (W3)'
    ],
    result: 'The coal sample contains ____% moisture, ____% volatile matter, and ____% ash.',
    precautions: [
      'Use a desiccator to cool the samples.',
      'Crucible lids must fit tightly for volatile matter determination.',
      'Maintain furnace temperatures accurately.'
    ]
  },
  {
    id: 'flash-fire-point',
    title: 'Determination of Flash and Fire Point',
    aim: 'To determine the flash and fire point of a given lubricating oil using Pensky-Martens apparatus.',
    apparatus: ['Pensky-Martens closed cup apparatus', 'Thermometer', 'Heating source'],
    chemicals: ['Lubricating oil'],
    procedure: [
      'Clean and dry the oil cup and fill it with the sample up to the mark.',
      'Heat the oil at a rate of 5-6°C per minute with constant stirring.',
      'Apply the test flame at every 1°C rise in temperature.',
      'The temperature at which a distinct flash is observed is the Flash Point.',
      'Continue heating until the oil catches fire and burns for at least 5 seconds; this is the Fire Point.'
    ],
    observations: [
      'Flash Point = ____ °C',
      'Fire Point = ____ °C'
    ],
    result: 'The flash point of the oil is ____ °C and the fire point is ____ °C.',
    precautions: [
      'The cup should be free from moisture.',
      'Stirring should be uniform.',
      'The test flame should not be too large.'
    ]
  },
  {
    id: 'alkalinity-water',
    title: 'Determination of Alkalinity of Water',
    aim: 'To determine the alkalinity of a given water sample due to hydroxide, carbonate, and bicarbonate ions.',
    apparatus: ['Burette', 'Pipette', 'Conical flask', 'Beakers'],
    chemicals: ['Standard HCl (0.02N)', 'Phenolphthalein indicator', 'Methyl orange indicator', 'Water sample'],
    procedure: [
      'Pipette 20ml of water sample into a conical flask.',
      'Add 2 drops of phenolphthalein; if it turns pink, titrate with HCl until colorless (P-endpoint).',
      'Add 2 drops of methyl orange to the same flask; the solution turns yellow.',
      'Continue titration until the color changes to permanent reddish-orange (M-endpoint).',
      'Note the total volume of acid used.'
    ],
    observations: [
      'Volume of sample = 20 ml',
      'Phenolphthalein alkalinity (P) = (Vp * N * 50 * 1000) / 20 ppm',
      'Methyl orange alkalinity (M) = (Vm * N * 50 * 1000) / 20 ppm'
    ],
    result: 'The alkalinity of the water sample is ______ ppm (CaCO3 equivalent).',
    precautions: [
      'The color change of methyl orange is subtle; observe carefully.',
      'Stir the solution during titration.',
      'Use distilled water for rinsing.'
    ]
  },
  {
    id: 'chloride-mohr',
    title: 'Determination of Chloride Content (Mohr\'s Method)',
    aim: 'To determine the amount of chloride ions in a given water sample.',
    apparatus: ['Burette', 'Pipette', 'Conical flask', 'White tile'],
    chemicals: ['Standard Silver Nitrate (AgNO3, 0.02N)', 'Potassium Chromate (K2CrO4) indicator', 'Water sample'],
    procedure: [
      'Pipette 20ml of water sample into a conical flask.',
      'Adjust pH to 7-8 if necessary.',
      'Add 1ml of K2CrO4 indicator; solution turns yellow.',
      'Titrate against AgNO3 solution with constant stirring until a permanent reddish-brown precipitate is formed.',
      'Note the volume of AgNO3 used (V).'
    ],
    observations: [
      'Volume of sample = 20 ml',
      'Normality of AgNO3 = 0.02 N',
      'Volume of AgNO3 used = V ml'
    ],
    result: 'Chloride content = (V * N * 35.45 * 1000) / Volume of sample mg/L.',
    precautions: [
      'Maintain pH between 7 and 8.',
      'Use a white tile to observe the color change clearly.',
      'AgNO3 is light-sensitive; store in dark bottles.'
    ]
  },
  {
    id: 'saponification-value',
    title: 'Determination of Saponification Value of an Oil',
    aim: 'To determine the saponification value of the given oil sample.',
    apparatus: ['Round bottom flask', 'Reflux condenser', 'Burette', 'Pipette', 'Water bath'],
    chemicals: ['Oil sample', 'Alcoholic KOH (0.5N)', 'Standard HCl (0.5N)', 'Phenolphthalein indicator'],
    procedure: [
      'Weigh 2g of oil into a round bottom flask.',
      'Add 25ml of alcoholic KOH using a pipette.',
      'Connect the reflux condenser and heat on a boiling water bath for 30-60 minutes.',
      'Perform a blank titration (without oil) under identical conditions.',
      'Cool the flasks and titrate the contents against standard HCl using phenolphthalein.'
    ],
    observations: [
      'Weight of oil (W)',
      'Volume of HCl for blank (B)',
      'Volume of HCl for sample (S)'
    ],
    result: 'Saponification Value = ((B - S) * N * 56.1) / W mg KOH/g of oil.',
    precautions: [
      'Ensure complete saponification by refluxing properly.',
      'Handle alcoholic KOH carefully.',
      'The blank titration is essential for accuracy.'
    ]
  }
];
