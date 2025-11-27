import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();

// Proxy para a API da ANVISA para evitar problemas de CORS
export const searchAnvisaMedicamentos = functions.https.onCall(async (data, context) => {
    const { term } = data;

    if (!term) {
        throw new functions.https.HttpsError('invalid-argument', 'O termo de busca é obrigatório.');
    }

    try {
        const url = `https://consultas.anvisa.gov.br/api/consulta/medicamentos?filter[nomeProduto]=${encodeURIComponent(term)}&count=10`;

        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Authorization': 'Guest'
            },
            timeout: 10000
        });

        return response.data;

    } catch (error: any) {
        console.error("Erro ao buscar medicamentos:", error);
        throw new functions.https.HttpsError('internal', 'Erro ao conectar com a ANVISA.', error.message);
    }
});
