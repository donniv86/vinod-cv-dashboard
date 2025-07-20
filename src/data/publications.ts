/**
 * Sample Publications Data
 * Realistic publication data for testing virtual scrolling
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

export interface Publication {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  url: string
  abstract?: string
  citations?: number
  tags?: string[]
  doi?: string
  volume?: string
  issue?: string
  pages?: string
}

export const publications: Publication[] = [
  {
    id: 'pub-001',
    title: 'Computational Drug Discovery: A Comprehensive Review of Modern Approaches',
    authors: ['Devaraji, V.', 'Smith, J.', 'Johnson, A.', 'Brown, M.'],
    journal: 'Journal of Medicinal Chemistry',
    year: 2024,
    url: 'https://doi.org/10.1021/acs.jmedchem.4c00001',
    abstract: 'This comprehensive review explores modern computational approaches in drug discovery, including molecular dynamics simulations, machine learning applications, and structure-based drug design methodologies. We discuss recent advances in virtual screening, pharmacophore modeling, and the integration of artificial intelligence in pharmaceutical research.',
    citations: 45,
    tags: ['Drug Discovery', 'Computational Chemistry', 'Molecular Dynamics', 'Machine Learning'],
    doi: '10.1021/acs.jmedchem.4c00001',
    volume: '67',
    issue: '3',
    pages: '1234-1256'
  },
  {
    id: 'pub-002',
    title: 'AI-Driven Molecular Design: Applications in Cancer Therapeutics',
    authors: ['Devaraji, V.', 'Wilson, R.', 'Davis, K.', 'Miller, P.'],
    journal: 'Nature Reviews Drug Discovery',
    year: 2023,
    url: 'https://doi.org/10.1038/nrd.2023.001',
    abstract: 'Artificial intelligence has revolutionized molecular design in cancer therapeutics. This review examines the application of deep learning models, generative adversarial networks, and reinforcement learning in the design of novel anticancer agents.',
    citations: 128,
    tags: ['AI', 'Cancer Therapeutics', 'Molecular Design', 'Deep Learning'],
    doi: '10.1038/nrd.2023.001',
    volume: '22',
    issue: '4',
    pages: '234-256'
  },
  {
    id: 'pub-003',
    title: 'Structure-Based Virtual Screening for COVID-19 Therapeutics',
    authors: ['Devaraji, V.', 'Anderson, L.', 'Taylor, S.', 'Clark, J.'],
    journal: 'Journal of Chemical Information and Modeling',
    year: 2023,
    url: 'https://doi.org/10.1021/acs.jcim.3c00012',
    abstract: 'We present a comprehensive virtual screening approach targeting SARS-CoV-2 proteins using molecular docking, molecular dynamics simulations, and machine learning-based scoring functions. Our methodology identified several promising drug candidates.',
    citations: 89,
    tags: ['COVID-19', 'Virtual Screening', 'Molecular Docking', 'SARS-CoV-2'],
    doi: '10.1021/acs.jcim.3c00012',
    volume: '63',
    issue: '5',
    pages: '1456-1478'
  },
  {
    id: 'pub-004',
    title: 'Machine Learning in Cheminformatics: Recent Advances and Applications',
    authors: ['Devaraji, V.', 'Roberts, M.', 'Harris, N.', 'Lee, S.'],
    journal: 'Journal of Cheminformatics',
    year: 2023,
    url: 'https://doi.org/10.1186/s13321-023-00712-1',
    abstract: 'This review covers recent advances in machine learning applications for cheminformatics, including molecular property prediction, drug-likeness assessment, and chemical space exploration using various neural network architectures.',
    citations: 67,
    tags: ['Cheminformatics', 'Machine Learning', 'Molecular Properties', 'Neural Networks'],
    doi: '10.1186/s13321-023-00712-1',
    volume: '15',
    issue: '1',
    pages: '23-45'
  },
  {
    id: 'pub-005',
    title: 'Quantum Mechanics in Drug Discovery: From Theory to Practice',
    authors: ['Devaraji, V.', 'Thompson, R.', 'White, A.', 'Martin, K.'],
    journal: 'Drug Discovery Today',
    year: 2022,
    url: 'https://doi.org/10.1016/j.drudis.2022.100234',
    abstract: 'Quantum mechanical methods are becoming increasingly important in drug discovery. This review discusses the application of density functional theory, ab initio methods, and hybrid QM/MM approaches in pharmaceutical research.',
    citations: 156,
    tags: ['Quantum Mechanics', 'Drug Discovery', 'DFT', 'QM/MM'],
    doi: '10.1016/j.drudis.2022.100234',
    volume: '27',
    issue: '8',
    pages: '2345-2367'
  },
  {
    id: 'pub-006',
    title: 'Molecular Dynamics Simulations of Protein-Ligand Complexes',
    authors: ['Devaraji, V.', 'Garcia, M.', 'Rodriguez, P.', 'Lopez, A.'],
    journal: 'Journal of Physical Chemistry B',
    year: 2022,
    url: 'https://doi.org/10.1021/acs.jpcb.2c00034',
    abstract: 'We present advanced molecular dynamics simulation techniques for studying protein-ligand interactions, including enhanced sampling methods, free energy calculations, and binding affinity predictions.',
    citations: 78,
    tags: ['Molecular Dynamics', 'Protein-Ligand', 'Enhanced Sampling', 'Free Energy'],
    doi: '10.1021/acs.jpcb.2c00034',
    volume: '126',
    issue: '12',
    pages: '3456-3478'
  },
  {
    id: 'pub-007',
    title: 'Deep Learning for Drug Repurposing: A Systematic Approach',
    authors: ['Devaraji, V.', 'Kim, J.', 'Park, S.', 'Choi, H.'],
    journal: 'Briefings in Bioinformatics',
    year: 2022,
    url: 'https://doi.org/10.1093/bib/bbac123',
    abstract: 'This study presents a systematic deep learning approach for drug repurposing, utilizing graph neural networks, transformer models, and multi-modal data integration to identify new therapeutic applications for existing drugs.',
    citations: 92,
    tags: ['Drug Repurposing', 'Deep Learning', 'Graph Neural Networks', 'Transformers'],
    doi: '10.1093/bib/bbac123',
    volume: '23',
    issue: '4',
    pages: 'bbac123'
  },
  {
    id: 'pub-008',
    title: 'Pharmacophore Modeling in Modern Drug Discovery',
    authors: ['Devaraji, V.', 'Chen, X.', 'Wang, L.', 'Zhang, Y.'],
    journal: 'Expert Opinion on Drug Discovery',
    year: 2021,
    url: 'https://doi.org/10.1080/17460441.2021.123456',
    abstract: 'Pharmacophore modeling remains a crucial tool in drug discovery. This review covers modern pharmacophore generation methods, validation strategies, and applications in virtual screening campaigns.',
    citations: 134,
    tags: ['Pharmacophore', 'Drug Discovery', 'Virtual Screening', 'Modeling'],
    doi: '10.1080/17460441.2021.123456',
    volume: '16',
    issue: '11',
    pages: '1234-1256'
  },
  {
    id: 'pub-009',
    title: 'Fragment-Based Drug Discovery: Computational Approaches',
    authors: ['Devaraji, V.', 'Singh, R.', 'Kumar, A.', 'Sharma, P.'],
    journal: 'Journal of Computer-Aided Molecular Design',
    year: 2021,
    url: 'https://doi.org/10.1007/s10822-021-00389-1',
    abstract: 'Fragment-based drug discovery has emerged as a powerful approach for lead generation. This review discusses computational methods for fragment screening, optimization, and linking strategies.',
    citations: 87,
    tags: ['Fragment-Based', 'Drug Discovery', 'Lead Generation', 'Fragment Linking'],
    doi: '10.1007/s10822-021-00389-1',
    volume: '35',
    issue: '7',
    pages: '789-812'
  },
  {
    id: 'pub-010',
    title: 'Big Data in Pharmaceutical Research: Challenges and Opportunities',
    authors: ['Devaraji, V.', 'Jones, M.', 'Williams, T.', 'Davis, R.'],
    journal: 'Drug Discovery Today',
    year: 2021,
    url: 'https://doi.org/10.1016/j.drudis.2021.100345',
    abstract: 'The pharmaceutical industry is increasingly leveraging big data for drug discovery and development. This review examines data integration strategies, machine learning applications, and future directions in pharmaceutical big data analytics.',
    citations: 145,
    tags: ['Big Data', 'Pharmaceutical Research', 'Data Integration', 'Analytics'],
    doi: '10.1016/j.drudis.2021.100345',
    volume: '26',
    issue: '9',
    pages: '2345-2367'
  },
  {
    id: 'pub-011',
    title: 'Structure-Activity Relationships in Medicinal Chemistry',
    authors: ['Devaraji, V.', 'Anderson, K.', 'Miller, L.', 'Wilson, J.'],
    journal: 'Journal of Medicinal Chemistry',
    year: 2020,
    url: 'https://doi.org/10.1021/acs.jmedchem.0c00023',
    abstract: 'Understanding structure-activity relationships is fundamental to medicinal chemistry. This review presents computational methods for analyzing SAR data and predicting biological activity from molecular structure.',
    citations: 178,
    tags: ['SAR', 'Medicinal Chemistry', 'Structure-Activity', 'Biological Activity'],
    doi: '10.1021/acs.jmedchem.0c00023',
    volume: '63',
    issue: '15',
    pages: '8234-8256'
  },
  {
    id: 'pub-012',
    title: 'Computer-Aided Drug Design: Past, Present, and Future',
    authors: ['Devaraji, V.', 'Taylor, M.', 'Brown, S.', 'Johnson, R.'],
    journal: 'Annual Review of Pharmacology and Toxicology',
    year: 2020,
    url: 'https://doi.org/10.1146/annurev-pharmtox-010919-023324',
    abstract: 'Computer-aided drug design has evolved significantly over the past decades. This comprehensive review covers historical developments, current state-of-the-art methods, and future directions in CADD.',
    citations: 234,
    tags: ['CADD', 'Drug Design', 'Computational Methods', 'Review'],
    doi: '10.1146/annurev-pharmtox-010919-023324',
    volume: '60',
    issue: '1',
    pages: '123-145'
  },
  {
    id: 'pub-013',
    title: 'Molecular Modeling of Protein-Protein Interactions',
    authors: ['Devaraji, V.', 'Garcia, A.', 'Martinez, L.', 'Rodriguez, M.'],
    journal: 'Proteins: Structure, Function, and Bioinformatics',
    year: 2020,
    url: 'https://doi.org/10.1002/prot.25890',
    abstract: 'Protein-protein interactions play crucial roles in biological processes. This study presents molecular modeling approaches for studying PPIs, including docking, dynamics simulations, and binding affinity predictions.',
    citations: 156,
    tags: ['Protein-Protein Interactions', 'Molecular Modeling', 'Docking', 'Dynamics'],
    doi: '10.1002/prot.25890',
    volume: '88',
    issue: '8',
    pages: '987-1009'
  },
  {
    id: 'pub-014',
    title: 'Machine Learning in Drug Discovery: A Practical Guide',
    authors: ['Devaraji, V.', 'Wang, X.', 'Li, Y.', 'Zhang, Z.'],
    journal: 'Journal of Chemical Information and Modeling',
    year: 2019,
    url: 'https://doi.org/10.1021/acs.jcim.9c00045',
    abstract: 'Machine learning has become an essential tool in drug discovery. This practical guide covers implementation strategies, best practices, and common pitfalls in applying ML to pharmaceutical research.',
    citations: 198,
    tags: ['Machine Learning', 'Drug Discovery', 'Practical Guide', 'Implementation'],
    doi: '10.1021/acs.jcim.9c00045',
    volume: '59',
    issue: '10',
    pages: '4567-4589'
  },
  {
    id: 'pub-015',
    title: 'Virtual Screening: Methods and Applications',
    authors: ['Devaraji, V.', 'Smith, A.', 'Johnson, B.', 'Williams, C.'],
    journal: 'Current Opinion in Chemical Biology',
    year: 2019,
    url: 'https://doi.org/10.1016/j.cbpa.2019.100567',
    abstract: 'Virtual screening has become a standard tool in drug discovery pipelines. This review covers various virtual screening methods, their applications, and recent advances in the field.',
    citations: 167,
    tags: ['Virtual Screening', 'Drug Discovery', 'Methods', 'Applications'],
    doi: '10.1016/j.cbpa.2019.100567',
    volume: '52',
    issue: '1',
    pages: '45-67'
  }
]

// Generate additional publications for testing virtual scrolling
export const generatePublications = (count: number = 100): Publication[] => {
  const journals = [
    'Journal of Medicinal Chemistry',
    'Nature Reviews Drug Discovery',
    'Journal of Chemical Information and Modeling',
    'Drug Discovery Today',
    'Journal of Cheminformatics',
    'Briefings in Bioinformatics',
    'Expert Opinion on Drug Discovery',
    'Journal of Computer-Aided Molecular Design',
    'Annual Review of Pharmacology and Toxicology',
    'Proteins: Structure, Function, and Bioinformatics'
  ]

  const topics = [
    'Drug Discovery', 'Computational Chemistry', 'Molecular Dynamics', 'Machine Learning',
    'AI', 'Cancer Therapeutics', 'Molecular Design', 'Deep Learning', 'COVID-19',
    'Virtual Screening', 'Molecular Docking', 'SARS-CoV-2', 'Cheminformatics',
    'Molecular Properties', 'Neural Networks', 'Quantum Mechanics', 'DFT', 'QM/MM',
    'Protein-Ligand', 'Enhanced Sampling', 'Free Energy', 'Drug Repurposing',
    'Graph Neural Networks', 'Transformers', 'Pharmacophore', 'Virtual Screening',
    'Modeling', 'Fragment-Based', 'Lead Generation', 'Fragment Linking', 'Big Data',
    'Pharmaceutical Research', 'Data Integration', 'Analytics', 'SAR', 'Medicinal Chemistry',
    'Structure-Activity', 'Biological Activity', 'CADD', 'Drug Design', 'Computational Methods',
    'Review', 'Protein-Protein Interactions', 'Molecular Modeling', 'Docking', 'Dynamics'
  ]

  const additionalPublications: Publication[] = []

  for (let i = 16; i <= count; i++) {
    const year = 2015 + Math.floor(Math.random() * 10)
    const journal = journals[Math.floor(Math.random() * journals.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const citations = Math.floor(Math.random() * 200)

    additionalPublications.push({
      id: `pub-${i.toString().padStart(3, '0')}`,
      title: `Computational Study of ${topic} in Modern Drug Discovery`,
      authors: [
        'Devaraji, V.',
        `Author${i}, A.`,
        `Researcher${i}, B.`,
        `Scientist${i}, C.`
      ],
      journal,
      year,
      url: `https://doi.org/10.1000/example.${i}`,
      abstract: `This study investigates the application of ${topic.toLowerCase()} in modern drug discovery. We present computational methods and results that demonstrate the effectiveness of this approach in pharmaceutical research.`,
      citations,
      tags: [topic, 'Drug Discovery', 'Computational Methods'],
      doi: `10.1000/example.${i}`,
      volume: Math.floor(Math.random() * 100).toString(),
      issue: Math.floor(Math.random() * 20).toString(),
      pages: `${Math.floor(Math.random() * 2000) + 1000}-${Math.floor(Math.random() * 2000) + 1000}`
    })
  }

  return [...publications, ...additionalPublications]
}

export default publications