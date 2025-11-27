"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchAnvisaMedicamentos = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const node_fetch_1 = __importDefault(require("node-fetch"));
admin.initializeApp();
// Proxy para a API da ANVISA para evitar problemas de CORS
exports.searchAnvisaMedicamentos = functions.https.onCall(async (data, context) => {
    const { term } = data;
    if (!term) {
        throw new functions.https.HttpsError('invalid-argument', 'O termo de busca é obrigatório.');
    }
    try {
        const response = await (0, node_fetch_1.default)(`https://consultas.anvisa.gov.br/api/consulta/medicamentos?filter[nomeProduto]=${encodeURIComponent(term)}&count=10`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Authorization': 'Guest' // Às vezes necessário para APIs públicas governamentais
            }
        });
        if (!response.ok) {
            throw new Error(`Erro na API da ANVISA: ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error("Erro ao buscar medicamentos:", error);
        throw new functions.https.HttpsError('internal', 'Erro ao conectar com a ANVISA.', error.message);
    }
});
//# sourceMappingURL=index.js.map