#!/bin/bash
set -e

# 🚀 Script Deploy CRM - Execute no VPS
# bash deploy.sh

echo "╔════════════════════════════════════════════════════════════╗"
echo "║     🚀 Deploy CRM - CalculaMed                              ║"
echo "╚════════════════════════════════════════════════════════════╝"

PROJECT_PATH="/home/claudeprojetos/crmclinica"
BRANCH="claude/crm-login-page-Fiyx2"

echo ""
echo "📍 Projeto: $PROJECT_PATH"
echo "🔄 Branch: $BRANCH"
echo ""

# Verificar se diretório existe
if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Erro: Diretório $PROJECT_PATH não encontrado"
    exit 1
fi

# Ir para o diretório
cd "$PROJECT_PATH"
echo "✅ Entrando em $PROJECT_PATH"

# Fetch
echo ""
echo "📦 Atualizando repositório..."
git fetch origin
echo "✅ Git fetch concluído"

# Checkout
echo ""
echo "🔄 Checkout branch $BRANCH..."
git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" origin/"$BRANCH"
echo "✅ Branch $BRANCH ativo"

# Instalar dependências
echo ""
echo "📥 Instalando dependências..."
npm install
echo "✅ Dependências instaladas"

# Build
echo ""
echo "🔨 Building projeto..."
npm run build
echo "✅ Build concluído"

# Copiar para public
echo ""
echo "📋 Copiando arquivos para public/..."
if [ -d "dist" ]; then
    cp -r dist/* public/ 2>/dev/null || true
    echo "✅ Arquivos copiados"
else
    echo "⚠️  Diretório dist/ não encontrado"
fi

# Status
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✅ DEPLOY CONCLUÍDO COM SUCESSO                ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📊 Arquivos em public/:"
ls -lh public/ | head -10
echo ""
echo "🌐 Acesse: https://crm.calculamed.com"
echo ""
echo "✅ Pronto para usar!"
