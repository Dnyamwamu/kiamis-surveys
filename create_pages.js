const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'app/(public)/fertilizer/page.tsx');
const content = fs.readFileSync(src, 'utf8');

// Create Farmers Page
const farmersContent = content
    .replace(/FertilizerPage/g, 'FarmersPage')
    .replace(/Fertilizer Subsidy/g, 'Farmer Registration')
    .replace(/National Fertilizer Subsidy Program/g, 'National Farmer Registration')
    .replace(/KNFSP/g, 'KNFR')
    .replace(/A centralized, data-driven platform used by national and county governments to monitor fertilizer subsidy redemption across Kenya. Streamlining distribution, tracking beneficiaries, and ensuring transparency at every step./g, 'A centralized platform capturing detailed demographic and agricultural data for every farmer across Kenya to support evidence-based decision making and resource allocation.')
    .replace(/Redeemed Vouchers/g, 'Agripreneurs')
    .replace(/Units Distributed/g, 'Farms Mapped')
    .replace(/254K\+/g, '120K+')
    .replace(/1\.32B\+/g, '5.2M+')
    .replace(/Total Value \(KES\)/g, 'Total Area (Acres)')
    .replace(/Kenya National Fertilizer Subsidy Program \(KNFSP\)/g, 'Kenya National Farmer Registration (KNFR)')
    .replace(/The Kenya government, through the Ministry of Agriculture, provides subsidized fertilizer at ~Ksh 2,500 per 50kg bag via the National Cereals and Produce Board \(NCPB\) and KNTC stores. Farmers must be registered under the digital KIAMIS system \(dial \*616\*3#\) to receive an e-voucher for purchasing, ensuring targeted distribution./g, 'The farmer registration program aims to create a comprehensive database of all farmers in Kenya. It collects detailed information about farm sizes, crops grown, and livestock kept, enabling the government to deliver targeted interventions, subsidies, and extension services efficiently.')
    .replace(/The system allows monitoring of fertilizer uptake and limits to ensure fair distribution across all regions./g, 'The system ensures a single source of truth for farmer data across all 47 counties.')
    .replace(/If not registered, farmers are urged to visit the nearest agricultural office to register for the e-voucher program./g, 'Farmers can update their details through the USSD service or at their local ward agricultural office.');

fs.mkdirSync(path.join(__dirname, 'app/(public)/farmers'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'app/(public)/farmers/page.tsx'), farmersContent);

// Create Seeds Page
const seedsContent = content
    .replace(/FertilizerPage/g, 'SeedsPage')
    .replace(/Fertilizer Subsidy/g, 'Seed Distribution')
    .replace(/National Fertilizer Subsidy Program/g, 'National Seed Distribution Program')
    .replace(/KNFSP/g, 'KNSDP')
    .replace(/A centralized, data-driven platform used by national and county governments to monitor fertilizer subsidy redemption across Kenya. Streamlining distribution, tracking beneficiaries, and ensuring transparency at every step./g, 'Monitoring the distribution of certified seeds to farmers across Kenya to boost crop yields, ensure food security, and promote climate-resilient agriculture.')
    .replace(/Redeemed Vouchers/g, 'Seed Varieties')
    .replace(/Units Distributed/g, 'Seeds Distributed (Kg)')
    .replace(/254K\+/g, '15.5M+')
    .replace(/1\.32B\+/g, '15M+')
    .replace(/Total Value \(KES\)/g, 'Farmers Reached')
    .replace(/Kenya National Fertilizer Subsidy Program \(KNFSP\)/g, 'Kenya National Seed Distribution Program (KNSDP)')
    .replace(/The Kenya government, through the Ministry of Agriculture, provides subsidized fertilizer at ~Ksh 2,500 per 50kg bag via the National Cereals and Produce Board \(NCPB\) and KNTC stores. Farmers must be registered under the digital KIAMIS system \(dial \*616\*3#\) to receive an e-voucher for purchasing, ensuring targeted distribution./g, 'The seed distribution program provides farmers with subsidized, certified seeds tailored to their specific agro-ecological zones. This initiative is crucial for improving productivity and resilience against climate change.')
    .replace(/The system allows monitoring of fertilizer uptake and limits to ensure fair distribution across all regions./g, 'The system tracks seed varieties and quantities distributed to ensure optimal regional crop matching.')
    .replace(/If not registered, farmers are urged to visit the nearest agricultural office to register for the e-voucher program./g, 'Farmers receive notifications for seed collection dates via the KIAMIS SMS system.');

fs.mkdirSync(path.join(__dirname, 'app/(public)/seeds'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'app/(public)/seeds/page.tsx'), seedsContent);

console.log("Pages created successfully.");
