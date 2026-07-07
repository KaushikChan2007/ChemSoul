const modules = [
    {
        id: "m1",
        title: "Module 1: Water Chemistry",
        summary: "Understand water hardness, titration, and purification processes.",
        topics: [
            "Water hardness (Temporary & Permanent)",
            "EDTA titration",
            "Zeolite process",
            "Lime soda process"
        ],
        simType: "water",
        quiz: [
            { q: "Which process is used for removing permanent hardness of water?", options: ["Boiling", "Zeolite process", "Filtration", "Sedimentation"], a: 1 },
            { q: "Temporary hardness is primarily caused by which ions?", options: ["Chlorides", "Sulfates", "Bicarbonates", "Nitrates"], a: 2 },
            { q: "EDTA is used as what in hardness titration?", options: ["Indicator", "Buffer", "Complexing agent", "Catalyst"], a: 2 },
            { q: "In the Zeolite process, hard water is exchanged with which active ions?", options: ["Hydrogen", "Sodium", "Potassium", "Calcium"], a: 1 }
        ]
    },
    {
        id: "m2",
        title: "Module 2: Atomic Structure",
        summary: "Explore quantum numbers, hybridization, and Molecular Orbital Theory.",
        topics: [
            "Atomic orbitals",
            "Quantum numbers",
            "Hybridization",
            "Molecular orbital theory"
        ],
        simType: "orbitals",
        quiz: [
            { q: "Which quantum number determines the general shape of an orbital?", options: ["Principal", "Azimuthal", "Magnetic", "Spin"], a: 1 },
            { q: "sp³ hybridization results in what molecular geometry?", options: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"], a: 2 },
            { q: "According to MOT, what is the bond order of O₂?", options: ["1", "2", "3", "1.5"], a: 1 },
            { q: "What is the maximum number of electrons in a d subshell?", options: ["2", "6", "10", "14"], a: 2 }
        ]
    },
    {
        id: "m3",
        title: "Module 3: Spectroscopy",
        summary: "Analyze UV and IR spectroscopy alongside Beer Lambert law.",
        topics: [
            "UV spectroscopy",
            "IR spectroscopy",
            "Beer Lambert law"
        ],
        simType: "spectroscopy",
        quiz: [
            { q: "The Beer-Lambert Law primarily relates absorbance to what property?", options: ["Temperature", "Concentration", "Viscosity", "Density"], a: 1 },
            { q: "IR spectroscopy is primarily used in organic chemistry to identify:", options: ["Molecular weight", "Functional groups", "Isotopes", "Crystal structure"], a: 1 },
            { q: "UV spectroscopy involves the determination of which transitions?", options: ["Vibrational transitions", "Rotational transitions", "Electronic transitions", "Nuclear transitions"], a: 2 },
            { q: "Which form of electromagnetic radiation has lower energy?", options: ["UV", "IR", "X-ray", "Gamma"], a: 1 }
        ]
    },
    {
        id: "m4",
        title: "Module 4: Electrochemistry",
        summary: "Study galvanic cells, the Nernst equation, and corrosion mechanisms.",
        topics: [
            "Galvanic cells",
            "Electrode potential",
            "Nernst equation",
            "Corrosion"
        ],
        simType: "electrochemistry",
        quiz: [
            { q: "In a galvanic cell, oxidation always occurs at the?", options: ["Cathode", "Anode", "Salt bridge", "Electrolyte"], a: 1 },
            { q: "Corrosion is widely recognized as an example of which chemical process?", options: ["Oxidation", "Reduction", "Neutralization", "Hydrolysis"], a: 0 },
            { q: "The Nernst equation is fundamentally used to calculate what?", options: ["Enthalpy", "Entropy", "Electrode potential", "Viscosity"], a: 2 },
            { q: "Sacrificial anodic protection uses a metal that is comparatively:", options: ["Less active", "More active", "Noble", "Heavier"], a: 1 }
        ]
    },
    {
        id: "m5",
        title: "Module 5: Nanotech & Green Chemistry",
        summary: "Discover advanced nanomaterials and eco-friendly chemical principles.",
        topics: [
            "Nanomaterials",
            "Carbon nanotubes",
            "Graphene",
            "Green chemistry principles"
        ],
        simType: "nanotech",
        quiz: [
            { q: "Graphene is best described theoretically as a?", options: ["1D material", "2D material", "3D material", "0D material"], a: 1 },
            { q: "Atom economy is a cornerstone principle of?", options: ["Nanotechnology", "Green Chemistry", "Electrochemistry", "Spectroscopy"], a: 1 },
            { q: "Carbon nanotubes are structurally most related to which allotrope?", options: ["Diamond", "Graphene", "Fullerene", "Graphite"], a: 1 },
            { q: "Which is a major predefined goal of Green Chemistry?", options: ["Increase yield", "Reduce toxicity", "Increase temperature", "Use organic solvents"], a: 1 }
        ]
    }
];
