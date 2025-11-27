import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_URL = 'https://dados.anvisa.gov.br/dados/DADOS_ABERTOS_MEDICAMENTOS.csv';
const OUTPUT_FILE = path.join(__dirname, '../src/data/medications_db.json');
const DATA_DIR = path.join(__dirname, '../src/data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SEED_DATA = [
    { nomeProduto: 'DIPIRONA MONOHIDRATADA', principioAtivo: 'DIPIRONA MONOHIDRATADA', numProcesso: '25351.000000/0000-00', nomeEmpresa: 'GENERICO', categoria: 'ANALGÉSICO' },
    { nomeProduto: 'PARACETAMOL', principioAtivo: 'PARACETAMOL', numProcesso: '25351.000000/0000-01', nomeEmpresa: 'GENERICO', categoria: 'ANALGÉSICO' },
    { nomeProduto: 'IBUPROFENO', principioAtivo: 'IBUPROFENO', numProcesso: '25351.000000/0000-02', nomeEmpresa: 'GENERICO', categoria: 'ANTI-INFLAMATÓRIO' },
    { nomeProduto: 'AMOXICILINA', principioAtivo: 'AMOXICILINA TRI-HIDRATADA', numProcesso: '25351.000000/0000-03', nomeEmpresa: 'GENERICO', categoria: 'ANTIBIÓTICO' },
    { nomeProduto: 'OMEPRAZOL', principioAtivo: 'OMEPRAZOL', numProcesso: '25351.000000/0000-04', nomeEmpresa: 'GENERICO', categoria: 'ANTIULCEROSO' },
    { nomeProduto: 'LOSARTANA POTASSICA', principioAtivo: 'LOSARTANA POTASSICA', numProcesso: '25351.000000/0000-05', nomeEmpresa: 'GENERICO', categoria: 'ANTI-HIPERTENSIVO' },
    { nomeProduto: 'METFORMINA', principioAtivo: 'CLORIDRATO DE METFORMINA', numProcesso: '25351.000000/0000-06', nomeEmpresa: 'GENERICO', categoria: 'ANTIDIABÉTICO' },
    { nomeProduto: 'ATORVASTATINA CALCICA', principioAtivo: 'ATORVASTATINA CALCICA', numProcesso: '25351.000000/0000-07', nomeEmpresa: 'GENERICO', categoria: 'HIPOLIPEMIANTE' },
    { nomeProduto: 'SIMVASTATINA', principioAtivo: 'SIMVASTATINA', numProcesso: '25351.000000/0000-08', nomeEmpresa: 'GENERICO', categoria: 'HIPOLIPEMIANTE' },
    { nomeProduto: 'CEFALEXINA', principioAtivo: 'CEFALEXINA', numProcesso: '25351.000000/0000-09', nomeEmpresa: 'GENERICO', categoria: 'ANTIBIÓTICO' },
    { nomeProduto: 'AZITROMICINA', principioAtivo: 'AZITROMICINA DI-HIDRATADA', numProcesso: '25351.000000/0000-10', nomeEmpresa: 'GENERICO', categoria: 'ANTIBIÓTICO' },
    { nomeProduto: 'CIPROFLOXACINO', principioAtivo: 'CLORIDRATO DE CIPROFLOXACINO', numProcesso: '25351.000000/0000-11', nomeEmpresa: 'GENERICO', categoria: 'ANTIBIÓTICO' },
    { nomeProduto: 'DEXAMETASONA', principioAtivo: 'DEXAMETASONA', numProcesso: '25351.000000/0000-12', nomeEmpresa: 'GENERICO', categoria: 'CORTICOIDE' },
    { nomeProduto: 'PREDNISONA', principioAtivo: 'PREDNISONA', numProcesso: '25351.000000/0000-13', nomeEmpresa: 'GENERICO', categoria: 'CORTICOIDE' },
    { nomeProduto: 'DIAZEPAM', principioAtivo: 'DIAZEPAM', numProcesso: '25351.000000/0000-14', nomeEmpresa: 'GENERICO', categoria: 'ANSIOLÍTICO' },
    { nomeProduto: 'CLONAZEPAM', principioAtivo: 'CLONAZEPAM', numProcesso: '25351.000000/0000-15', nomeEmpresa: 'GENERICO', categoria: 'ANSIOLÍTICO' },
    { nomeProduto: 'ALPRAZOLAM', principioAtivo: 'ALPRAZOLAM', numProcesso: '25351.000000/0000-16', nomeEmpresa: 'GENERICO', categoria: 'ANSIOLÍTICO' },
    { nomeProduto: 'FLUOXETINA', principioAtivo: 'CLORIDRATO DE FLUOXETINA', numProcesso: '25351.000000/0000-17', nomeEmpresa: 'GENERICO', categoria: 'ANTIDEPRESSIVO' },
    { nomeProduto: 'SERTRALINA', principioAtivo: 'CLORIDRATO DE SERTRALINA', numProcesso: '25351.000000/0000-18', nomeEmpresa: 'GENERICO', categoria: 'ANTIDEPRESSIVO' },
    { nomeProduto: 'ESCITALOPRAM', principioAtivo: 'OXALATO DE ESCITALOPRAM', numProcesso: '25351.000000/0000-19', nomeEmpresa: 'GENERICO', categoria: 'ANTIDEPRESSIVO' }
];

function generateSeedData() {
    console.log('Generating seed database...');
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(SEED_DATA, null, 2));
    console.log(`Seed database created at ${OUTPUT_FILE} with ${SEED_DATA.length} entries.`);
}

function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(';'); // ANVISA CSVs usually use semicolon

    // Map header names to our desired keys
    const getIndex = (keyword) => headers.findIndex(h => h && h.toUpperCase().includes(keyword));

    const idxNome = getIndex('NOME_PRODUTO') !== -1 ? getIndex('NOME_PRODUTO') : getIndex('PRODUTO');
    const idxPrincipio = getIndex('PRINCIPIO_ATIVO') !== -1 ? getIndex('PRINCIPIO_ATIVO') : getIndex('SUBSTANCIA');
    const idxProcesso = getIndex('NUMERO_PROCESSO') !== -1 ? getIndex('NUMERO_PROCESSO') : getIndex('PROCESSO');
    const idxEmpresa = getIndex('RAZAO_SOCIAL') !== -1 ? getIndex('RAZAO_SOCIAL') : getIndex('EMPRESA');
    const idxCategoria = getIndex('CATEGORIA') !== -1 ? getIndex('CATEGORIA') : getIndex('CLASSE');
    const idxVencimento = getIndex('DATA_VENCIMENTO') !== -1 ? getIndex('DATA_VENCIMENTO') : getIndex('VENCIMENTO');

    if (idxNome === -1 || idxProcesso === -1) {
        console.error('Could not find essential headers in CSV.');
        return null;
    }

    const medications = [];
    const MAX_ENTRIES = 5000;

    for (let i = 1; i < lines.length && medications.length < MAX_ENTRIES; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const cols = line.split(';');

        if (cols.length < headers.length) continue;

        const med = {
            nomeProduto: cols[idxNome]?.replace(/"/g, '').trim() || '',
            principioAtivo: cols[idxPrincipio]?.replace(/"/g, '').trim() || '',
            numProcesso: cols[idxProcesso]?.replace(/"/g, '').trim() || '',
            nomeEmpresa: cols[idxEmpresa]?.replace(/"/g, '').trim() || '',
            categoria: cols[idxCategoria]?.replace(/"/g, '').trim() || '',
            dataVencimento: cols[idxVencimento]?.replace(/"/g, '').trim() || ''
        };

        if (med.nomeProduto && med.numProcesso) {
            medications.push(med);
        }
    }

    return medications;
}

console.log(`Attempting to download CSV from ${CSV_URL}...`);

const request = https.get(CSV_URL, (response) => {
    if (response.statusCode !== 200) {
        console.error(`Failed to download CSV. Status Code: ${response.statusCode}`);
        generateSeedData();
        return;
    }

    let data = '';
    response.setEncoding('utf8');

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        console.log('Download complete. Parsing...');
        try {
            const medications = parseCSV(data);
            if (medications && medications.length > 0) {
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(medications, null, 2));
                console.log(`Database created at ${OUTPUT_FILE} with ${medications.length} entries.`);
            } else {
                console.error('Parsed data was empty or invalid.');
                generateSeedData();
            }
        } catch (e) {
            console.error('Error parsing CSV:', e);
            generateSeedData();
        }
    });
});

request.on('error', (err) => {
    console.error('Request error:', err);
    generateSeedData();
});

request.setTimeout(10000, () => {
    console.error('Request timeout.');
    request.destroy();
    generateSeedData();
});
