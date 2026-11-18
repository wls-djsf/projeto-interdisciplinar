/**
 * ============================================================================
 * GUARDIÃO FRIO IoT — MÓDULO DE AUTENTICAÇÃO REAL E CONTROLE DE ACESSO (RBAC)
 * Projeto Interdisciplinar (MEC) | Autor: Wanderson Lopes da Silva (RA: 314886)
 * ============================================================================
 * Suporta:
 * 1. Integração com Firebase Authentication / Supabase Auth (basta colar as chaves abaixo)
 * 2. Autenticação Criptográfica Nativa via Web Crypto API (SHA-256) com Controle de
 *    Sessão Assinado e RBAC (Admin Técnico IoT vs. Proprietário do Mercado).
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
 * Banco de Usuários Inicial com Hashes SHA-256 Pré-Computados (Zero senha em texto puro na verificação)
 * - Admin: wls.lopes@yahoo.com.br | Senha: @Goku#Vegeta1987
 * - Proprietário: comercial.bompreco.iot@gmail.com | Senha: @BomPreco#Frio2026!
 */
export const DEFAULT_USERS = [
  {
    id: "usr-admin-314886",
    email: "wls.lopes@yahoo.com.br",
    name: "Wanderson Lopes da Silva",
    ra: "314886",
    role: "ADMIN",
    roleBadge: "Administrador do Sistema (Técnico IoT)",
    store: "Mercadinho & Padaria Comunitária Bom Preço",
    phone: "(11) 97638-5901",
    // SHA-256 de "@Goku#Vegeta1987"
    passwordHash: "03bd1ae545cfdc009f37fc524d4b3c20f3e4cccaee6dccb02e75516e27b50672",
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
    email: "comercial.bompreco.iot@gmail.com",
    name: "Gerência Comercial — Mercadinho Bom Preço",
    ra: "Comerciante Local",
    role: "PROPRIETARIO",
    roleBadge: "Proprietário do Mercado (Comerciante)",
    store: "Mercadinho & Padaria Comunitária Bom Preço",
    phone: "(11) 98842-1120",
    // SHA-256 de "@BomPreco#Frio2026!"
    passwordHash: "237173fcb6e0531c73732393678c786e79eba5af3ae3445b58d5547ec7eb7fcf",
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
