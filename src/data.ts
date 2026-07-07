import { Module } from './types';

export const MODULES: Module[] = [
  {
    id: 'water-chemistry',
    title: 'Water Chemistry',
    label: 'Module 1',
    description: 'Hardness, boiler problems, and advanced softening treatments.',
    topics: [
      'Hardness of water (Degree & Units)',
      'Numerical problems on hardness',
      'Boiler problems: Scale & Sludge',
      'Boiler corrosion & Caustic embrittlement',
      'Softening: Lime Soda process',
      'Softening: Ion Exchange method',
      'Softening: Zeolite process',
      'EDTA Method for hardness determination'
    ],
    explanation: 'Water hardness is the capacity of water to precipitate soap. It is caused by dissolved salts of Ca2+ and Mg2+. Boiler problems like scale (hard deposits) and sludge (soft precipitates) reduce efficiency. EDTA method is a complexometric titration performed at pH 10 using EBT indicator.',
    notes: [
      'Hardness: Soap destroying property due to Bicarbonates, Sulphates, and Chlorides of Ca and Mg.',
      'Temporary Hardness: Due to Bicarbonates; removed by boiling.',
      'Permanent Hardness: Due to Sulphates, Nitrates, and Chlorides; requires chemical treatment.',
      'EDTA Method: Uses Ethylene Diamine Tetra Acetic Acid. pH 9-10 maintained by NH4Cl/NH4OH buffer.',
      'Indicator: Eriochrome Black-T (EBT). Color change: Wine red to Steel Blue.',
      'Zeolite Process: Na2Ze exchanges Na+ for Ca2+/Mg2+. Regenerated with 10% NaCl.',
      'Ion Exchange: Most efficient; produces demineralized water using cation and anion resins.',
      'Boiler Troubles: Priming (wet steam), Foaming (bubbles), Caustic Embrittlement (cracks due to NaOH).',
      'Scale: Hard adhering coating; Sludge: Soft slimy precipitate.',
      'Desalination: Electrodialysis and Reverse Osmosis (Hyper-filtration).'
    ],
    pptUrl: 'https://example.com/ppt/water-chemistry.pptx',
    pdfUrl: 'https://example.com/pdf/water-chemistry-notes.pdf',
    testPaper: [
      { id: 'tp1_1', text: 'Which indicator is used in the EDTA method for water hardness?', options: ['Phenolphthalein', 'Methyl Orange', 'Eriochrome Black-T', 'Starch'], correctIndex: 2 },
      { id: 'tp1_2', text: 'Temporary hardness can be removed by:', options: ['Filtration', 'Boiling', 'Sedimentation', 'Chlorination'], correctIndex: 1 },
      { id: 'tp1_3', text: 'The pH maintained during EDTA titration is:', options: ['4-5', '7', '9-10', '12-13'], correctIndex: 2 },
      { id: 'tp1_4', text: 'Caustic embrittlement is caused by the presence of:', options: ['CaSO4', 'NaOH', 'MgCl2', 'Na2SO4'], correctIndex: 1 },
      { id: 'tp1_5', text: 'Zeolite is chemically:', options: ['Sodium Aluminate', 'Hydrated Sodium Alumino Silicate', 'Calcium Carbonate', 'Magnesium Sulfate'], correctIndex: 1 },
      { id: 'tp1_6', text: 'The unit "ppm" is equivalent to:', options: ['1 mg/L', '10 mg/L', '0.1 mg/L', '1 g/L'], correctIndex: 0 },
      { id: 'tp1_7', text: 'Which process produces water of zero hardness?', options: ['Zeolite', 'Lime-Soda', 'Ion-Exchange', 'Boiling'], correctIndex: 2 },
      { id: 'tp1_8', text: 'Scale formation in boilers leads to:', options: ['Increased efficiency', 'Fuel wastage', 'Corrosion prevention', 'Softening'], correctIndex: 1 },
      { id: 'tp1_9', text: 'Reverse Osmosis is also known as:', options: ['Ultra-filtration', 'Hyper-filtration', 'Micro-filtration', 'Nano-filtration'], correctIndex: 1 },
      { id: 'tp1_10', text: 'In the EDTA method, the color change at the endpoint is:', options: ['Blue to Red', 'Colorless to Pink', 'Wine Red to Blue', 'Yellow to Orange'], correctIndex: 2 }
    ],
    methodologies: [
      { title: 'Boiler Troubles', description: 'Scale and sludge formation lead to overheating and fuel wastage. Caustic embrittlement occurs due to high alkalinity.', icon: 'Activity' },
      { title: 'Ion Exchange', description: 'Uses cation and anion exchange resins to produce demineralized water, the most efficient softening method.', icon: 'Layers' }
    ],
    simulationType: 'ions',
    quiz: [
      { id: 'w1', text: 'Which process produces water of zero hardness?', options: ['Lime Soda', 'Zeolite', 'Ion Exchange', 'Sedimentation'], correctIndex: 2 },
      { id: 'w2', text: 'Caustic embrittlement in boilers is caused by:', options: ['Sodium Carbonate', 'Sodium Hydroxide', 'Calcium Sulfate', 'Magnesium Chloride'], correctIndex: 1 },
      { id: 'w3', text: 'The unit "ppm" is equivalent to:', options: ['1 mg/L', '10 mg/L', '0.1 mg/L', '1 g/L'], correctIndex: 0 }
    ]
  },
  {
    id: 'atomic-structure',
    title: 'Atomic & Molecular Structures / Alloys',
    label: 'Module 2',
    description: 'MO theory, Crystal Field Theory, Band structure, and Metal Alloys.',
    topics: [
      'MO diagrams of diatomic molecules',
      'Crystal Field Theory (Octahedral & Tetrahedral)',
      'Band structure of solids & Doping',
      'Alloys: Substitutional & Interstitial',
      'Stainless Steel & Duralumin',
      'Aluminium-Magnesium alloys'
    ],
    explanation: 'Molecular Orbital (MO) theory explains bonding in diatomic molecules. Crystal Field Theory (CFT) describes d-orbital splitting. Alloys are combinations of metals or metals with other elements, classified as substitutional or interstitial based on atomic arrangement.',
    notes: [
      'Alloy: Substance formed from combination of two or more metals, or metals with other elements.',
      'Substitutional Alloy: Atoms of different elements are similar in size and exchange positions (e.g., Bronze).',
      'Interstitial Alloy: Small non-metal atoms fit into spaces between metal atoms (e.g., Steel).',
      'Stainless Steel: Alloy of Fe, C, and Cr (min 10.5%). Chromium forms a protective oxide film.',
      'Duralumin: 95% Al, 4% Cu, 1% Mg, 0.5% Mn. Light and strong; used in aircraft.',
      'Al-Mg Alloys: High corrosion resistance and weldability; used in marine and aerospace.',
      'Nitinol: Shape memory alloy of Nickel and Titanium.',
      'Hardness: Alloys are generally harder than pure metals due to different atom sizes impeding layer slipping.',
      'Stainless Steel Properties: Corrosion resistant, high tensile strength, heat resistant (>800°C).',
      'Aluminium Properties: Silvery-white, lightweight, non-toxic, recyclable, high strength-to-weight ratio.'
    ],
    pptUrl: 'https://example.com/ppt/atomic-structure.pptx',
    pdfUrl: 'https://example.com/pdf/atomic-structure-notes.pdf',
    testPaper: [
      { id: 'tp2_1', text: 'Which alloy is an example of an interstitial alloy?', options: ['Bronze', 'Brass', 'Steel', 'Duralumin'], correctIndex: 2 },
      { id: 'tp2_2', text: 'Stainless steel must contain at least how much Chromium?', options: ['5%', '10.5%', '15%', '20%'], correctIndex: 1 },
      { id: 'tp2_3', text: 'Duralumin is primarily composed of which metal?', options: ['Iron', 'Copper', 'Aluminium', 'Magnesium'], correctIndex: 2 },
      { id: 'tp2_4', text: 'Nitinol is a shape memory alloy of:', options: ['Al and Mg', 'Ni and Ti', 'Cu and Zn', 'Fe and Cr'], correctIndex: 1 },
      { id: 'tp2_5', text: 'In an octahedral field, which d-orbitals have higher energy?', options: ['t2g', 'eg', 's-orbitals', 'p-orbitals'], correctIndex: 1 },
      { id: 'tp2_6', text: 'Which element provides corrosion resistance to stainless steel?', options: ['Carbon', 'Nickel', 'Chromium', 'Manganese'], correctIndex: 2 },
      { id: 'tp2_7', text: 'Alloys are generally harder than pure metals because:', options: ['They have more electrons', 'Different atom sizes impede slipping', 'They have higher density', 'They are more magnetic'], correctIndex: 1 },
      { id: 'tp2_8', text: 'Duralumin is widely used in:', options: ['Building construction', 'Aircraft bodies', 'Water pipes', 'Food packaging'], correctIndex: 1 },
      { id: 'tp2_9', text: 'Al-Mg alloys are preferred for marine applications due to:', options: ['High density', 'Low cost', 'High corrosion resistance', 'Magnetic properties'], correctIndex: 2 },
      { id: 'tp2_10', text: 'Substitutional alloys occur when atoms are:', options: ['Very different in size', 'Relatively similar in size', 'Only non-metals', 'Only noble gases'], correctIndex: 1 }
    ],
    methodologies: [
      { title: 'Crystal Field Splitting', description: 'In octahedral fields, d-orbitals split into t2g and eg levels due to ligand repulsion.', icon: 'Atom' },
      { title: 'Duralumin', description: 'An aluminum alloy known for high strength and light weight, essential for aerospace engineering.', icon: 'Grid' }
    ],
    simulationType: 'orbitals',
    quiz: [
      { id: 'a1', text: 'In an octahedral field, which d-orbitals have higher energy?', options: ['t2g', 'eg', 's-orbitals', 'p-orbitals'], correctIndex: 1 },
      { id: 'a2', text: 'Duralumin is primarily composed of:', options: ['Iron', 'Aluminum', 'Copper', 'Zinc'], correctIndex: 1 },
      { id: 'a3', text: 'Doping of semiconductors with Group 15 elements creates:', options: ['n-type', 'p-type', 'Insulators', 'Superconductors'], correctIndex: 0 }
    ]
  },
  {
    id: 'spectroscopy',
    title: 'Spectroscopic Techniques',
    label: 'Module 3',
    description: 'Electronic, IR, and NMR spectroscopy principles and applications.',
    topics: [
      'Electronic spectroscopy: Chromophores & Auxochromes',
      'Electronic Transitions (sigma, pi, n)',
      'IR spectroscopy: Vibrational modes & Fingerprint region',
      'Franck Condon Principle & Jablonski Diagram',
      'Applications of Spectroscopy'
    ],
    explanation: 'Spectroscopy deals with the interaction of EMR with matter. UV-Vis involves electronic transitions, while IR involves vibrational and rotational changes. Chromophores are groups responsible for color, and auxochromes modify absorption.',
    notes: [
      'Spectroscopy: Study of interaction of EMR with matter.',
      'Electronic Transitions: sigma-sigma* (high energy), pi-pi*, n-sigma*, n-pi* (low energy).',
      'Forbidden Transitions: sigma-pi* and pi-sigma*.',
      'Chromophore: Part of molecule responsible for color (e.g., -NO2, C=O, C=C).',
      'Auxochrome: Functional group that modifies chromophore absorption (e.g., -OH, -NH2).',
      'Bathochromic Shift (Red Shift): Shift to longer wavelength.',
      'Hypsochromic Shift (Blue Shift): Shift to shorter wavelength.',
      'Hyperchromic Effect: Increase in absorption intensity.',
      'IR Spectroscopy: Related to vibrational and rotational energy. Requires change in dipole moment.',
      'Fingerprint Region: Region below 1500 cm-1, unique for every molecule.',
      'Jablonski Diagram: Represents energy levels and processes like Fluorescence and Phosphorescence.'
    ],
    pptUrl: 'https://example.com/ppt/spectroscopy.pptx',
    pdfUrl: 'https://example.com/pdf/spectroscopy-notes.pdf',
    testPaper: [
      { id: 'tp3_1', text: 'Which electronic transition requires the highest energy?', options: ['pi to pi*', 'n to pi*', 'sigma to sigma*', 'n to sigma*'], correctIndex: 2 },
      { id: 'tp3_2', text: 'A shift of absorption maxima to longer wavelength is called:', options: ['Blue shift', 'Red shift', 'Hyperchromic shift', 'Hypochromic shift'], correctIndex: 1 },
      { id: 'tp3_3', text: 'The IR region below 1500 cm-1 is known as:', options: ['Functional group region', 'Fingerprint region', 'UV region', 'Visible region'], correctIndex: 1 },
      { id: 'tp3_4', text: 'Which of the following is a chromophore?', options: ['-OH', '-NH2', '-NO2', '-Cl'], correctIndex: 2 },
      { id: 'tp3_5', text: 'Fluorescence is a process that occurs in:', options: ['10^-9 to 10^-7 seconds', 'Minutes', 'Hours', 'Days'], correctIndex: 0 },
      { id: 'tp3_6', text: 'For a bond to be IR active, there must be a change in:', options: ['Mass', 'Dipole moment', 'Color', 'Volume'], correctIndex: 1 },
      { id: 'tp3_7', text: 'Bathochromic shift is also known as:', options: ['Blue shift', 'Red shift', 'Green shift', 'Yellow shift'], correctIndex: 1 },
      { id: 'tp3_8', text: 'The Jablonski diagram represents:', options: ['Crystal structures', 'Energy levels and transitions', 'Molecular weights', 'Boiling points'], correctIndex: 1 },
      { id: 'tp3_9', text: 'Auxochromes are groups that:', options: ['Impart color', 'Modify absorption of chromophores', 'Stop all absorption', 'Change the mass only'], correctIndex: 1 },
      { id: 'tp3_10', text: 'Near UV region extends from:', options: ['10-100 nm', '200-400 nm', '400-800 nm', '800-1000 nm'], correctIndex: 1 }
    ],
    methodologies: [
      { title: 'Fingerprint Region', description: 'The IR region below 1500 cm-1, unique to every molecule, used for absolute identification.', icon: 'Waves' },
      { title: 'Chemical Shift', description: 'The variation of nuclear magnetic resonance frequency with the electronic environment of the nucleus.', icon: 'Activity' }
    ],
    simulationType: 'spectrum',
    quiz: [
      { id: 's1', text: 'Which region in IR is used to identify functional groups?', options: ['Fingerprint region', 'Functional group region', 'UV region', 'Radio region'], correctIndex: 1 },
      { id: 's2', text: 'TMS is used in NMR as a:', options: ['Solvent', 'Reference standard', 'Catalyst', 'Indicator'], correctIndex: 1 },
      { id: 's3', text: 'Electronic transitions occur in which spectroscopy?', options: ['IR', 'NMR', 'UV-Visible', 'Mass'], correctIndex: 2 }
    ]
  },
  {
    id: 'electrochemistry',
    title: 'Electrochemistry & Corrosion',
    label: 'Module 4',
    description: 'Cells, Nernst equation, Batteries, and Corrosion control.',
    topics: [
      'Electrochemical & Electrolytic cells',
      'Electrode potential & Nernst Equation',
      'Corrosion: Dry & Wet mechanisms',
      'Types of Corrosion (Galvanic, Pitting, etc.)',
      'Corrosion prevention and control'
    ],
    explanation: 'Electrochemistry involves interconversion of chemical and electrical energy. Corrosion is the slow destruction of metal due to chemical/electrochemical attack. Wet corrosion involves electrochemical cells with anodic and cathodic areas.',
    notes: [
      'Corrosion: Process of slow destruction of metal due to chemical/electrochemical attack.',
      'Dry Corrosion: Direct chemical action of atmospheric gases (O2, Halogens) on metal.',
      'Wet Corrosion: Electrochemical corrosion through formation of electrochemical cells.',
      'Anode: Oxidation (loss of electrons) occurs; metal is destroyed.',
      'Cathode: Reduction occurs; electrons from anode are accepted.',
      'Galvanic Corrosion: Occurs when two dissimilar metals are in contact in an electrolyte.',
      'Waterline Corrosion: Occurs in metallic tanks; area below water (poorly oxygenated) acts as anode.',
      'Pitting Corrosion: Localized attack forming small pits; occurs due to impurities or cracking of protective film.',
      'Stress Corrosion: Accelerated corrosion in stressed areas (bending, quenching).',
      'Prevention: Galvanization (Zn coating), Anodic/Cathodic protection, use of inhibitors.'
    ],
    pptUrl: 'https://example.com/ppt/electrochemistry.pptx',
    pdfUrl: 'https://example.com/pdf/electrochemistry-notes.pdf',
    testPaper: [
      { id: 'tp4_1', text: 'In an electrochemical cell, oxidation occurs at the:', options: ['Cathode', 'Anode', 'Electrolyte', 'Salt bridge'], correctIndex: 1 },
      { id: 'tp4_2', text: 'Galvanization is the process of coating iron with:', options: ['Copper', 'Nickel', 'Zinc', 'Chromium'], correctIndex: 2 },
      { id: 'tp4_3', text: 'Which type of corrosion occurs due to difference in oxygen concentration?', options: ['Galvanic', 'Differential Aeration', 'Dry Corrosion', 'Stress Corrosion'], correctIndex: 1 },
      { id: 'tp4_4', text: 'In waterline corrosion, the area below the water level acts as:', options: ['Cathode', 'Anode', 'Inert', 'Catalyst'], correctIndex: 1 },
      { id: 'tp4_5', text: 'Dry corrosion is also known as:', options: ['Electrochemical corrosion', 'Chemical corrosion', 'Pitting corrosion', 'Stress corrosion'], correctIndex: 1 },
      { id: 'tp4_6', text: 'The Pilling-Bedworth rule relates to:', options: ['Cell potential', 'Oxide film stability', 'Hardness', 'Conductivity'], correctIndex: 1 },
      { id: 'tp4_7', text: 'Sacrificial anode method is used for:', options: ['Increasing weight', 'Corrosion prevention', 'Electroplating', 'Titration'], correctIndex: 1 },
      { id: 'tp4_8', text: 'Which metal is used as a sacrificial anode for Iron?', options: ['Copper', 'Silver', 'Zinc', 'Gold'], correctIndex: 2 },
      { id: 'tp4_9', text: 'Crevice corrosion occurs at:', options: ['Open surfaces', 'Joints, bolts, and nuts', 'Pure metal centers', 'High temperature zones'], correctIndex: 1 },
      { id: 'tp4_10', text: 'Rust is chemically:', options: ['FeCl3', 'Fe2O3.xH2O', 'FeSO4', 'FeO'], correctIndex: 1 }
    ],
    methodologies: [
      { title: 'Nernst Equation', description: 'E = E° - (RT/nF) ln Q. Essential for calculating real-world battery potentials.', icon: 'Hash' },
      { title: 'Cathodic Protection', description: 'Protecting a metal by making it the cathode of an electrochemical cell, often using a sacrificial anode.', icon: 'Battery' }
    ],
    simulationType: 'galvanic',
    quiz: [
      { id: 'e1', text: 'The Nernst equation relates cell potential to:', options: ['Pressure', 'Concentration', 'Color', 'Viscosity'], correctIndex: 1 },
      { id: 'e2', text: 'Sacrificial anode method is used for:', options: ['Oxidation', 'Corrosion prevention', 'Electroplating', 'Titration'], correctIndex: 1 },
      { id: 'e3', text: 'In a dry cell, the cathode is made of:', options: ['Zinc', 'Carbon/Graphite', 'Lead', 'Lithium'], correctIndex: 1 }
    ]
  },
  {
    id: 'nanotech',
    title: 'Nanotechnology & Green Synthesis',
    label: 'Module 5',
    description: 'Nanomaterials, Graphene, and the 12 Principles of Green Chemistry.',
    topics: [
      'Synthesis: Bottom-up & Top-down approaches',
      'Nanoscale materials: Graphene, Fullerenes, CNTs',
      'Nanowires & Nanorods',
      'Nanotechnology in Construction',
      '12 Principles of Green Chemistry'
    ],
    explanation: 'Nanotechnology deals with materials in the 1-100 nm range. Synthesis methods include Top-down (Laser ablation, CVD) and Bottom-up (Precipitation, Solvothermal). Materials like Graphene and CNTs have extraordinary properties.',
    notes: [
      'Nanoscience: Study of phenomena and manipulation of materials at 1-100 nm scale.',
      'Top-down Methods: Breaking bulk material (Laser ablation, CVD, Electro-deposition).',
      'Bottom-up Methods: Building atom-by-atom (Precipitation, Hydrothermal, Solvothermal).',
      'Graphene: 2D sheet of carbon atoms in honeycomb lattice; strongest material (1.3x10^11 Pa).',
      'Fullerenes: Allotropes of carbon; C60 (Buckminsterfullerene) has 12 pentagons and 20 hexagons.',
      'Carbon Nanotubes (CNTs): Rolled graphite sheets; SWNT (Single-walled) and MWNT (Multi-walled).',
      'Nanowires: Aspect ratio > 20; used in IC components and sensors.',
      'Nanotechnology in Concrete: Silica fume (100x smaller than cement) improves durability and strength.',
      'Self-cleaning Technology: Photocatalysis using TiO2 and ZnO; breaks down dirt using light.',
      'Green Chemistry: 12 principles focused on waste prevention, atom economy, and safer chemicals.'
    ],
    pptUrl: 'https://example.com/ppt/nanotechnology.pptx',
    pdfUrl: 'https://example.com/pdf/nanotechnology-notes.pdf',
    testPaper: [
      { id: 'tp5_1', text: 'The size range of nanomaterials is:', options: ['1-10 nm', '1-100 nm', '100-1000 nm', '1-500 nm'], correctIndex: 1 },
      { id: 'tp5_2', text: 'Which of these is a top-down synthesis method?', options: ['Precipitation', 'Solvothermal', 'Laser ablation', 'Hydrothermal'], correctIndex: 2 },
      { id: 'tp5_3', text: 'Graphene is a material of which dimension?', options: ['1D', '2D', '3D', '0D'], correctIndex: 1 },
      { id: 'tp5_4', text: 'Buckminsterfullerene (C60) contains how many hexagons?', options: ['12', '20', '32', '60'], correctIndex: 1 },
      { id: 'tp5_5', text: 'Which nanomaterial is used for self-cleaning concrete?', options: ['Graphene', 'TiO2', 'Fullerene', 'CNT'], correctIndex: 1 },
      { id: 'tp5_6', text: 'Carbon Nanotubes are allotropes of:', options: ['Silicon', 'Carbon', 'Sulfur', 'Phosphorus'], correctIndex: 1 },
      { id: 'tp5_7', text: 'Bottom-up approach involves building materials:', options: ['From bulk', 'Atom by atom', 'By mechanical grinding', 'By lithography'], correctIndex: 1 },
      { id: 'tp5_8', text: 'The aspect ratio of nanowires is typically:', options: ['< 1', '1-5', '> 20', '10-15'], correctIndex: 2 },
      { id: 'tp5_9', text: 'Which principle is part of Green Chemistry?', options: ['Maximize waste', 'Atom economy', 'Use toxic reagents', 'Single-use plastics'], correctIndex: 1 },
      { id: 'tp5_10', text: 'Nanocomposites yield an increase in:', options: ['Weight', 'Surface area', 'Cost only', 'Volume'], correctIndex: 1 }
    ],
    methodologies: [
      { title: '12 Principles', description: 'Guidelines including waste prevention, atom economy, and safer solvents.', icon: 'Leaf' },
      { title: 'Carbon Nanotubes', description: 'Cylindrical molecules of carbon with extraordinary strength and electrical properties.', icon: 'Grid' }
    ],
    simulationType: 'graphene',
    quiz: [
      { id: 'n1', text: 'Which approach involves building nanomaterials from atoms?', options: ['Top-down', 'Bottom-up', 'Side-ways', 'Random'], correctIndex: 1 },
      { id: 'n2', text: 'How many principles are there in Green Chemistry?', options: ['5', '10', '12', '15'], correctIndex: 2 },
      { id: 'n3', text: 'Fullerenes are allotropes of:', options: ['Silicon', 'Carbon', 'Sulfur', 'Phosphorus'], correctIndex: 1 }
    ]
  }
];
