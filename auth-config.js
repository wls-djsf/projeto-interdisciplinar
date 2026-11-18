/**
 * ============================================================================
 * GUARDIÃO FRIO IoT — MÓDULO DE AUTENTICAÇÃO REAL E CONTROLE DE ACESSO (RBAC)
 * Projeto Interdisciplinar (MEC) | Autor: Wanderson Lopes da Silva (RA: 314886)
 * ============================================================================
 * Suporta:
 * 1. Integração com Firebase Authentication / Supabase Auth (basta colar as chaves abaixo)
 * 2. Autenticação Criptográfica Nativa via Web Crypto API (SHA-256) com Controle de
 *    Sessão Assinado e RBAC (Admin Técnico IoT vs. Proprietário - Mercado Cliente 1).
 */

export const EXTERNAL_AUTH_CONFIG = {
  provider: "LOCAL_SHA256_RBAC", // Altere para "FIREBASE" ou "SUPABASE" após colar suas chaves abaixo
  firebase: {
    apiKey: "COLE_SUA_FIREBASE_API_KEY_AQUI",
    authDomain: "guardiao-frio-iot.firebaseapp.com",
    projectId: "guardiao-frio-iot",
    appId: "COLE_SEU_FIREBASE_APP_ID_AQUI"
  },
  supabase: {
    url: "https://SEU_PROJETO.supabase.co",
    anonKey: "COLE_SUA_SUPABASE_ANON_KEY_AQUI"
  }
};

/**
 * Gera o hash SHA-256 em formato hexadecimal utilizando a Web Crypto API nativa do navegador
 */
export async function sha256Hex(plainText) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Banco de Usuários Inicial com Hashes SHA-256 (Credenciais Genéricas Homologadas):
 * - Administrador do Sistema (Técnico IoT):
 *     E-mail: admin.tecnico.iot@gmail.com
 *     Senha:  @Admin#Sistema2026!
 * - Proprietário do Mercado (Mercado Cliente 1):
 *     E-mail: mercado.cliente1@gmail.com
 *     Senha:  @Cliente1#Acesso2026!
 */
export const DEFAULT_USERS = [
  {
    id: "usr-admin-314886",
    email: "admin.tecnico.iot@gmail.com",
    name: "Administrador Técnico IoT (Wanderson Lopes - RA: 314886)",
    ra: "314886",
    role: "ADMIN",
    roleBadge: "Administrador do Sistema (Técnico IoT)",
    store: "Mercado Cliente 1 (Unidade Comercial Monitorada)",
    phone: "(11) 90000-0001",
    // Hash SHA-256 de "@Admin#Sistema2026!" validado em runtime
    expectedPlainForInit: "@Admin#Sistema2026!",
    permissions: {
      canViewDashboard: true,
      canViewTelemetry: true,
      canViewAlerts: true,
      canExportCsv: true,
      canEditHardwareParams: true,
      canUseEsp8266Simulator: true,
      canManageUsers: true
    }
  },
  {
    id: "usr-owner-001",
    email: "mercado.cliente1@gmail.com",
    name: "Proprietário — Mercado Cliente 1",
    ra: "Cliente 01",
    role: "PROPRIETARIO",
    roleBadge: "Proprietário do Mercado (Mercado Cliente 1)",
    store: "Mercado Cliente 1 (Unidade Comercial Monitorada)",
    phone: "(11) 90000-0002",
    // Hash SHA-256 de "@Cliente1#Acesso2026!" validado em runtime
    expectedPlainForInit: "@Cliente1#Acesso2026!",
    permissions: {
      canViewDashboard: true,
      canViewTelemetry: true,
      canViewAlerts: true,
      canExportCsv: true,
      canEditHardwareParams: false,
      canUseEsp8266Simulator: false,
      canManageUsers: false
    }
  }
];
