<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6 filter-bar rounded-xl p-4">
      <h2 class="filter-bar-label text-2xl font-bold">Research Publications</h2>
      <div class="flex space-x-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            activeFilter === filter.value
              ? 'filter-btn-active'
              : 'filter-btn-inactive'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <div class="grid gap-6">
      <!-- 2024 Publications -->
      <div v-if="filteredPublications.length > 0" class="space-y-4">
        <div v-for="publication in filteredPublications" :key="publication.id"
             class="card-publication rounded-xl p-6 border hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="card-publication-title text-lg font-semibold mb-2 leading-tight">
                {{ publication.title }}
              </h3>
              <p class="card-publication-meta text-sm mb-3">
                <span class="font-medium">{{ publication.authors }}</span>
              </p>
              <div class="flex flex-wrap gap-2 mb-3">
                <span class="card-publication-tag px-3 py-1 rounded-full text-xs font-medium">
                  {{ publication.journal }}
                </span>
                <span class="card-publication-tag px-3 py-1 rounded-full text-xs font-medium">
                  {{ publication.year }}
                </span>
                <span v-if="publication.volume" class="card-publication-tag px-3 py-1 rounded-full text-xs font-medium">
                  Vol. {{ publication.volume }}
                </span>
                <span v-if="publication.pages" class="card-publication-tag px-3 py-1 rounded-full text-xs font-medium">
                  {{ publication.pages }}
                </span>
              </div>
              <div class="flex items-center space-x-4 text-sm card-publication-meta">
                <span v-if="publication.citations" class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  {{ publication.citations }} citations
                </span>
                <span v-if="publication.impact" class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                  Impact: {{ publication.impact }}
                </span>
              </div>
            </div>
            <div class="ml-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {{ publication.year }}
              </div>
            </div>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex space-x-2">
              <span v-for="(tag, index) in publication.tags" :key="index"
                    class="card-publication-tag px-2 py-1 rounded text-xs">
                {{ tag }}
              </span>
            </div>
            <button class="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              View Details →
            </button>
          </div>
        </div>
      </div>

      <!-- No publications message -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No publications found</h3>
        <p class="text-gray-500 dark:text-gray-400">Try selecting a different filter to view publications.</p>
      </div>
    </div>

    <!-- Publication Statistics -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ totalPublications }}</div>
        <div class="text-sm opacity-90">Total Publications</div>
      </div>
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ totalCitations }}</div>
        <div class="text-sm opacity-90">Total Citations</div>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ averageImpact }}</div>
        <div class="text-sm opacity-90">Avg Impact Factor</div>
      </div>
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ researchYears }}</div>
        <div class="text-sm opacity-90">Research Years</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const filters = [
  { label: 'All Publications', value: 'all' },
  { label: '2024', value: '2024' },
  { label: '2023', value: '2023' },
  { label: '2022', value: '2022' },
  { label: '2021', value: '2021' },
  { label: '2020', value: '2020' },
  { label: '2019', value: '2019' },
  { label: '2018', value: '2018' },
  { label: '2017', value: '2017' },
  { label: '2016', value: '2016' },
  { label: '2015', value: '2015' },
  { label: '2014', value: '2014' },
  { label: '2013', value: '2013' },
  { label: '2012', value: '2012' },
  { label: '2011', value: '2011' }
]

const publications = [
  {
    id: 1,
    title: "Large-scale computational screening of Indian medicinal plants reveals Cassia angustifolia to be a potentially anti-diabetic",
    authors: "Devaraji, Vinod and Sivaraman, Jayanthi and Prabhu, S",
    journal: "Journal of Biomolecular Structure and Dynamics",
    year: "2024",
    volume: "42",
    pages: "194-210",
    citations: 15,
    impact: "3.2",
    tags: ["Computational Biology", "Drug Discovery", "Medicinal Plants"],
    publisher: "Taylor & Francis"
  },
  {
    id: 2,
    title: "Exploring the potential of machine learning to design antidiabetic molecules: a comprehensive study with experimental validation",
    authors: "Devaraji, Vinod and Sivaraman, Jayanthi",
    journal: "Journal of Biomolecular Structure and Dynamics",
    year: "2024",
    volume: "42",
    pages: "13290-13311",
    citations: 8,
    impact: "3.2",
    tags: ["Machine Learning", "Drug Design", "Diabetes"],
    publisher: "Taylor & Francis"
  },
  {
    id: 3,
    title: "Design, synthesis of new 2, 4-thiazolidinediones: In-silico, in-vivo anti-diabetic and anti-inflammatory evaluation",
    authors: "Gharge, Shankar and Alegaon, Shankar G and Ranade, Shriram D and Khatib, NA and Kavalapure, Rohini S and Kumar, BR Prashantha and Bavage, Nandkishor B and others",
    journal: "European Journal of Medicinal Chemistry Reports",
    year: "2024",
    volume: "11",
    pages: "100151",
    citations: 5,
    impact: "2.8",
    tags: ["Synthesis", "Anti-diabetic", "Anti-inflammatory"],
    publisher: "Elsevier Masson"
  },
  {
    id: 4,
    title: "Pharmacophore modeling, 3D QSAR, molecular dynamics studies and virtual screening on pyrazolopyrimidines as anti-breast cancer agents",
    authors: "James, Jainey P and Devaraji, Vinod and Sasidharan, Pradija and Pavan, TS",
    journal: "Polycyclic Aromatic Compounds",
    year: "2023",
    volume: "43",
    pages: "7456-7473",
    citations: 12,
    impact: "2.9",
    tags: ["Pharmacophore", "QSAR", "Cancer Research"],
    publisher: "Taylor & Francis"
  },
  {
    id: 5,
    title: "Design, synthesis, molecular dynamics simulation, MM/GBSA studies and kinesin spindle protein inhibitory evaluation of some 4-aminoquinoline hybrids",
    authors: "Ranade, Shriram D and Alegaon, Shankar G and Venkatasubramanian, U and Priya, A Soundarya and Kavalapure, Rohini S and Chand, Jagdish and Jalalpure, Sunil S and Vinod, D",
    journal: "Computational Biology and Chemistry",
    year: "2023",
    volume: "105",
    pages: "107881",
    citations: 10,
    impact: "2.7",
    tags: ["Molecular Dynamics", "Drug Design", "Kinesin"],
    publisher: "Elsevier"
  },
  {
    id: 6,
    title: "In silico Exploration of Dakshina Kannada Medicinal Plants as Anti-SARS-CoV-2 Agents by Molecular Docking and Simulation Approaches",
    authors: "James, Jainey P and Jyothi, Divya and Devaraji, Vinod and Priya, Sneh",
    journal: "Letters in Drug Design & Discovery",
    year: "2023",
    volume: "20",
    pages: "1544-1556",
    citations: 18,
    impact: "1.8",
    tags: ["COVID-19", "Medicinal Plants", "Molecular Docking"],
    publisher: "Bentham Science Publishers"
  },
  {
    id: 7,
    title: "Computational formulation study of insulin on biodegradable polymers",
    authors: "Devaraji, Vinod and Jayanthi, Sivaraman",
    journal: "RSC advances",
    year: "2023",
    volume: "13",
    pages: "20282-20297",
    citations: 7,
    impact: "3.9",
    tags: ["Drug Formulation", "Polymers", "Insulin"],
    publisher: "Royal Society of Chemistry"
  },
  {
    id: 8,
    title: "Investigating anti-inflammatory and apoptotic actions of fucoidan concentrating on computational and therapeutic applications",
    authors: "Dubey, Akanksha and Dasgupta, Tiasha and Devaraji, Vinod and Ramasamy, Tamizhselvi and Sivaraman, Jayanthi",
    journal: "3 Biotech",
    year: "2023",
    volume: "13",
    pages: "355",
    citations: 9,
    impact: "2.6",
    tags: ["Anti-inflammatory", "Apoptosis", "Fucoidan"],
    publisher: "Springer"
  },
  {
    id: 9,
    title: "Severity prediction over Parkinson's disease prediction by using the deep brooke inception net classifier",
    authors: "Sarankumar, R and Vinod, D and Anitha, K and Manohar, Gunaselvi and Vijayanand, Karunanithi Senthamilselvi and Pant, Bhaskar and Sundramurthy, Venkatesa Prabhu",
    journal: "Computational Intelligence and Neuroscience",
    year: "2022",
    volume: "2022",
    pages: "7223197",
    citations: 25,
    impact: "3.1",
    tags: ["Machine Learning", "Parkinson's Disease", "Deep Learning"],
    publisher: "Hindawi"
  },
  {
    id: 10,
    title: "A Computational Insight on the Inhibitory Potential of 8-Hydroxydihydrosanguinarine (8-HDS), a Pyridone Containing Analog of Sanguinarine, against SARS CoV2",
    authors: "Jena, Atala Bihari and Kanungo, Namrata and Chainy, Gagan Bihari Nityananda and Devaraji, Vinod and Das, Sudipta Kumar and Dandapat, Jagneshwar",
    journal: "Chemistry & Biodiversity",
    year: "2022",
    volume: "19",
    pages: "e202200266",
    citations: 22,
    impact: "2.5",
    tags: ["COVID-19", "Computational Chemistry", "SARS-CoV-2"],
    publisher: "Wiley"
  },
  {
    id: 11,
    title: "Synthesis and in silico study of new azetidinones against non-small cell lung cancer by EGFR inhibition",
    authors: "James, Jainey P and Aiswarya, TC and Shenoy, Swetha P and Devaraji, Vinod",
    journal: "The Thai Journal of Pharmaceutical Sciences",
    year: "2022",
    volume: "46",
    pages: "595-606",
    citations: 8,
    impact: "1.2",
    tags: ["Cancer Research", "EGFR", "Synthesis"],
    publisher: "Chulalongkorn University"
  },
  {
    id: 12,
    title: "Pharmacophore based drug design and synthesis of oxindole bearing hybrid as anticancer agents",
    authors: "Pathak, Ankita and Pandey, Vivek and Pokharel, Yuba Raj and Devaraji, Vinod and Ali, Abuzer and Haider, Kashif and Saad, Suma and Dewangan, Rikeshwer Prasad and Siddiqui, Nadeem and Yar, M Shahar",
    journal: "Bioorganic Chemistry",
    year: "2021",
    volume: "116",
    pages: "105358",
    citations: 35,
    impact: "5.1",
    tags: ["Drug Design", "Cancer", "Oxindole"],
    publisher: "Academic Press"
  },
  {
    id: 13,
    title: "Peroxynitrite-induced conformational changes in DNA that lead to cell death: UV, CD spectral, molecular dynamics simulation and FACS analysis",
    authors: "Anushree, G and Aravind, P and Vinod, D and Hemalatha, N and Girisha, ST and Devaraju, KS",
    journal: "Nucleosides, Nucleotides & Nucleic Acids",
    year: "2020",
    volume: "40",
    pages: "1-15",
    citations: 18,
    impact: "2.1",
    tags: ["DNA Damage", "Molecular Dynamics", "Cell Death"],
    publisher: "Taylor & Francis"
  },
  {
    id: 14,
    title: "A novel quinoline-appended chalcone derivative as potential Plasmodium falciparum gametocytocide",
    authors: "Kumar, Himank and Wadi, Ishan and Devaraji, Vinod and Pillai, CR and Ghosh, Sujit Kumar",
    journal: "Journal of Vector Borne Diseases",
    year: "2019",
    volume: "56",
    pages: "189-199",
    citations: 28,
    impact: "1.8",
    tags: ["Malaria", "Chalcone", "Antimalarial"],
    publisher: "Medknow"
  },
  {
    id: 15,
    title: "Potent and highly selective dual-targeting monoamine oxidase-B inhibitors: Fluorinated chalcones of morpholine versus imidazole",
    authors: "Mathew, Bijo and Baek, Seung C and Thomas Parambi, Della G and Lee, Jae P and Mathew, Githa E and Jayanthi, Sivaraman and Vinod, Devaraji and Rapheal, Clariya and Devikrishna, Vinod and Kondarath, Shahin Shad and others",
    journal: "Archiv der Pharmazie",
    year: "2019",
    volume: "352",
    pages: "1800309",
    citations: 42,
    impact: "4.1",
    tags: ["MAO-B", "Chalcone", "Neurodegenerative"],
    publisher: "Wiley"
  },
  {
    id: 16,
    title: "A Chalcone-based potential therapeutic small molecule that binds to subdomain IIA in HSA precisely controls the rotamerization of Trp-214",
    authors: "Kumar, Himank and Devaraji, Vinod and Joshi, Ritika and Wankar, Sneha and Ghosh, Sujit Kumar",
    journal: "ACS omega",
    year: "2018",
    volume: "3",
    pages: "10114-10128",
    citations: 31,
    impact: "4.1",
    tags: ["HSA Binding", "Chalcone", "Protein Dynamics"],
    publisher: "American Chemical Society"
  },
  {
    id: 17,
    title: "Insights into the structural perturbations of spliced variants of CD44: A modeling and simulation approach",
    authors: "Patel, Shanaya and Shaikh, Faraz and Devaraji, Vinod and Radadiya, Ashish and Shah, Kanisha and Shah, Anamik and Rawal, Rakesh",
    journal: "Journal of Biomolecular Structure and Dynamics",
    year: "2017",
    volume: "35",
    pages: "354-367",
    citations: 45,
    impact: "3.2",
    tags: ["CD44", "Structural Biology", "Cancer"],
    publisher: "Taylor & Francis"
  },
  {
    id: 18,
    title: "Discovery of a latent calcineurin inhibitory peptide from its autoinhibitory domain by docking, dynamic simulation, and in vitro methods",
    authors: "Harish, BM and Saraswathi, R and Vinod, D and Devaraju, KS",
    journal: "Journal of Biomolecular Structure and Dynamics",
    year: "2016",
    volume: "34",
    pages: "983-992",
    citations: 33,
    impact: "3.2",
    tags: ["Calcineurin", "Peptide", "Molecular Docking"],
    publisher: "Taylor & Francis"
  },
  {
    id: 19,
    title: "Targeting protein kinase and DNA molecules by diimine--phthalate complexes in antiproliferative activity",
    authors: "Pravin, Narayanaperumal and Devaraji, Vinod and Raman, Natarajan",
    journal: "International journal of biological macromolecules",
    year: "2015",
    volume: "79",
    pages: "837-855",
    citations: 41,
    impact: "6.2",
    tags: ["Protein Kinase", "DNA Binding", "Antiproliferative"],
    publisher: "Elsevier"
  },
  {
    id: 20,
    title: "Groove binding mediated structural modulation and DNA cleavage by quinoline appended chalcone derivative",
    authors: "Kumar, Himank and Devaraji, Vinod and Prasath, Rangaraj and Jadhao, Manojkumar and Joshi, Ritika and Bhavana, Purushothaman and Ghosh, Sujit Kumar",
    journal: "Spectrochimica Acta Part A: Molecular and Biomolecular Spectroscopy",
    year: "2015",
    volume: "151",
    pages: "605-615",
    citations: 38,
    impact: "4.4",
    tags: ["DNA Binding", "Chalcone", "Spectroscopy"],
    publisher: "Elsevier"
  },
  {
    id: 21,
    title: "Antihypertensive activity of a quinoline appended chalcone derivative and its site specific binding interaction with a relevant target carrier protein",
    authors: "Kumar, Himank and Devaraji, Vinod and Joshi, Ritika and Jadhao, Manojkumar and Ahirkar, Piyush and Prasath, R and Bhavana, P and Ghosh, Sujit Kumar",
    journal: "RSC advances",
    year: "2015",
    volume: "5",
    pages: "65496-65513",
    citations: 52,
    impact: "3.9",
    tags: ["Antihypertensive", "Protein Binding", "Drug Design"],
    publisher: "Royal Society of Chemistry"
  },
  {
    id: 22,
    title: "Virtual screening and discovery of novel aurora kinase inhibitors",
    authors: "Raghu, R and Devaraji, Vinod and Leena, K and Riyaz, SD and Baby Rani, Polavaru and Kumar. B, Suneel and Kumar Naik, Pradeep and Dubey, PK and Velmurugan, Devadasan and Vijayalakshmi, M",
    journal: "Current Topics in Medicinal Chemistry",
    year: "2014",
    volume: "14",
    pages: "2006-2019",
    citations: 48,
    impact: "3.4",
    tags: ["Virtual Screening", "Aurora Kinase", "Drug Discovery"],
    publisher: "Bentham Science Publishers"
  },
  {
    id: 23,
    title: "Design, synthesis, physicochemical studies, solvation, and DNA damage of quinoline-appended chalcone derivative: comprehensive spectroscopic approach toward drug discovery",
    authors: "Kumar, Himank and Chattopadhyay, Anjan and Prasath, R and Devaraji, Vinod and Joshi, Ritika and Bhavana, P and Saini, Praveen and Ghosh, Sujit Kumar",
    journal: "The Journal of Physical Chemistry B",
    year: "2014",
    volume: "118",
    pages: "7257-7266",
    citations: 67,
    impact: "3.6",
    tags: ["Drug Discovery", "Spectroscopy", "DNA Damage"],
    publisher: "American Chemical Society"
  },
  {
    id: 24,
    title: "Structure and putative signaling mechanism of protease activated receptor 2 (PAR2)--a promising target for breast cancer",
    authors: "Kakarala, Kavita Kumari and Jamil, Kaiser and Devaraji, Vinod",
    journal: "Journal of Molecular Graphics and Modelling",
    year: "2014",
    volume: "53",
    pages: "179-199",
    citations: 39,
    impact: "2.3",
    tags: ["PAR2", "Breast Cancer", "Molecular Modeling"],
    publisher: "Elsevier"
  },
  {
    id: 25,
    title: "Interaction of oxovanadium (IV)--salphen complexes with bovine serum albumin and their cytotoxicity against cancer",
    authors: "Sankareswari, Velusamy Gomathi and Vinod, Devaraj and Mahalakshmi, Ayyasamy and Alamelu, Meena and Kumaresan, Ganesan and Ramaraj, Ramasamy and Rajagopal, Seenivasan",
    journal: "Dalton Transactions",
    year: "2014",
    volume: "43",
    pages: "3260-3272",
    citations: 36,
    impact: "4.6",
    tags: ["Oxovanadium", "BSA", "Cytotoxicity"],
    publisher: "Royal Society of Chemistry"
  },
  {
    id: 26,
    title: "Combined structure-and ligand-based pharmacophore modeling and molecular dynamics simulation studies to identify selective inhibitors of MMP-8",
    authors: "Kalva, Sukesh and Vinod, D and Saleena, Lilly M",
    journal: "Journal of Molecular Modeling",
    year: "2014",
    volume: "20",
    pages: "1-18",
    citations: 29,
    impact: "2.3",
    tags: ["MMP-8", "Pharmacophore", "Molecular Dynamics"],
    publisher: "Springer"
  },
  {
    id: 27,
    title: "Field-and Gaussian-based 3D-QSAR studies on barbiturate analogs as MMP-9 inhibitors",
    authors: "Kalva, Sukesh and Vinod, D and Saleena, Lilly M",
    journal: "Medicinal Chemistry Research",
    year: "2013",
    volume: "22",
    pages: "5303-5313",
    citations: 31,
    impact: "2.8",
    tags: ["QSAR", "MMP-9", "Barbiturates"],
    publisher: "Springer"
  },
  {
    id: 28,
    title: "Antitumour activity of 5-[(2 E)-1-(1 H-benzimidazol-2-yl)-3-substituted phenylprop-2-en-1-ylidene] pyrimidine-2, 4, 6 (1 H, 3 H, 5 H)-triones against Dalton's ascitic lymphoma in mice",
    authors: "Mathew, Bijo and Suresh, Jerad and Vinod, Devaraji",
    journal: "Medicinal Chemistry Research",
    year: "2013",
    volume: "22",
    pages: "3911-3917",
    citations: 42,
    impact: "2.8",
    tags: ["Antitumour", "Benzimidazole", "Lymphoma"],
    publisher: "Springer"
  },
  {
    id: 29,
    title: "Hypnotic Profile of Imines from Benzimidazole Chalcones: Mechanism of Synthesis, DFT Studies and in silico Screening",
    authors: "Mathew, Bijo and Suresh, Jerad and Anbazhagan, Sockalingam and Devaraji, Vinod",
    journal: "Central Nervous System Agents in Medicinal Chemistry",
    year: "2013",
    volume: "13",
    pages: "207-216",
    citations: 38,
    impact: "2.1",
    tags: ["Hypnotic", "Benzimidazole", "DFT"],
    publisher: "Bentham Science Publishers"
  },
  {
    id: 30,
    title: "Discovery of aurora kinase: A inhibitors using virtual screening protocol",
    authors: "Suresh, A Jerad and Vinod, D",
    journal: "Journal of Chemical, Biological and Physical Sciences",
    year: "2012",
    volume: "2",
    pages: "1333",
    citations: 25,
    impact: "1.5",
    tags: ["Aurora Kinase", "Virtual Screening", "Drug Discovery"],
    publisher: "Journal of Chemical, Biological and Physical Sciences"
  },
  {
    id: 31,
    title: "Design, synthesis, characterization and screening of thiophene derivatives for anti-inflammatory activity",
    authors: "Suresh, A Jerad and Anitha, K and Vinod, D",
    journal: "Journal of Chemical, Biological and Physical Sciences",
    year: "2011",
    volume: "1",
    pages: "304",
    citations: 22,
    impact: "1.5",
    tags: ["Thiophene", "Anti-inflammatory", "Synthesis"],
    publisher: "Journal of Chemical, Biological and Physical Sciences"
  }
]

const filteredPublications = computed(() => {
  if (activeFilter.value === 'all') {
    return publications
  }
  return publications.filter(pub => pub.year === activeFilter.value)
})

const totalPublications = computed(() => publications.length)
const totalCitations = computed(() => publications.reduce((sum, pub) => sum + (pub.citations || 0), 0))
const averageImpact = computed(() => {
  const impacts = publications.map(pub => parseFloat(pub.impact)).filter(impact => !isNaN(impact))
  return impacts.length > 0 ? (impacts.reduce((sum, impact) => sum + impact, 0) / impacts.length).toFixed(1) : '0.0'
})
const researchYears = computed(() => {
  const years = publications.map(pub => parseInt(pub.year))
  return Math.max(...years) - Math.min(...years) + 1
})
</script>