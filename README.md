# ❄️ Guardião Frio IoT — Projeto Interdisciplinar (MEC)

> **Sistema IoT de Baixo Custo (R$ 78,00) para Monitoramento Contínuo de Temperatura (`-18 °C` a `-10 °C`) e Alerta de Abertura de Portas em Pequenos Comércios Comunitários**

---

## 👨‍🎓 Identificação Acadêmica
- **Aluno Desenvolvedor:** Wanderson Lopes da Silva
- **RA:** 314886
- **Disciplina / Entrega:** Projeto Interdisciplinar (MEC) — Automação e IoT Aplicado a Pequenos Negócios Locais
- **Estudo de Caso:** Mercadinho & Padaria Comunitária Bom Preço
- **Protótipo Oficial no Figma (Tema Claro UX/UI):** [Acessar Protótipo no Figma](https://www.figma.com/design/r9Uyb0fix8TzjJKN6est46)

---

## 🎯 Objetivo da Solução
Pequenos mercados, padarias e mercearias de bairro operam com margens enxutas e sofrem severos prejuízos financeiros (entre R$ 1.500,00 e R$ 4.000,00 por ocorrência) quando um freezer apresenta falha mecânica noturna ou tem sua porta esquecida entreaberta.

O **Guardião Frio IoT** democratiza a telemetria de cadeia de frio com um custo único de implantação de **R$ 78,00** e **mensalidade zero**, monitorando continuamente a temperatura interna e o estado das portas, acionando alarmes sonoros/visuais locais e disparando notificações em tempo real ao celular do comerciante.

---

## 🔐 Perfis de Acesso Homologados (RBAC + SHA-256)

A aplicação web possui **proteção obrigatória de rota** e **Controle de Acesso Baseado em Perfil (RBAC)** com verificação criptográfica **SHA-256 (Web Crypto API)** e suporte nativo para chaves do **Firebase Authentication / Supabase Auth** (`auth-config.js`):

| Perfil de Usuário | E-mail (Login) | Senha | Permissões no Sistema |
| :--- | :--- | :--- | :--- |
| **1. Administrador do Sistema (Técnico IoT)** | `wls.lopes@yahoo.com.br` | `@Goku#Vegeta1987` | Acesso total: Dashboard Gerencial, Telemetria dos Pinos (`A0, D2, D4, D5, D6`), Central de Alertas, Exportação CSV, **Edição de Parâmetros de Hardware (`LIMITE_TEMP_MAX`)** e **Simulador IoT ESP8266 em Tempo Real (com Web Audio API 1500 Hz)**. |
| **2. Proprietário do Mercado (Comerciante)** | `comercial.bompreco.iot@gmail.com` | `@BomPreco#Frio2026!` | Acesso operacional focado no negócio: Visão Geral dos Freezers (`EQ-01` a `EQ-04`), Telemetria em Tempo Real, Central de Alertas e Exportação de Relatórios ANVISA em CSV. *(Bloqueado para alteração de pinos físicos/hardware)*. |

---

## 🔌 Arquitetura de Hardware e Pinos (Arduino Uno / NodeMCU ESP8266)

| Pino Físico | Componente | Função na Regra de Negócio |
| :--- | :--- | :--- |
| **`A0`** | Sensor de Temperatura `TMP36` / `DS18B20` | Leitura contínua da temperatura interna do freezer (Limite p/ congelados: `-10,0 °C`). |
| **`D2`** | Sensor Magnético de Porta (*Reed Switch*) | Configurado com `INPUT_PULLUP`: `LOW` = Porta Fechada, `HIGH` = Porta Aberta. |
| **`D4`** | LED Verde + Resistor `220 Ω` | Acende (`HIGH`) quando a temperatura está abaixo de `-10,0 °C` e a porta está fechada. |
| **`D5`** | LED Vermelho + Resistor `220 Ω` | Acende (`HIGH`) imediatamente se a temperatura subir acima de `-10,0 °C` ou se a porta abrir. |
| **`D6`** | Piezo Buzzer Ativo (`1500 Hz`) | Emite alerta sonoro local (`tone(6, 1500, 300)`) em caso de anomalia térmica ou porta aberta. |

---

## 🎨 Estudo de UX/UI (Tema Claro — Regra 60-30-10)
Baseado em *Steve Krug (Não Me Faça Pensar)*, *Don Norman (O Design do Dia a Dia)*, *Eva Heller (A Psicologia das Cores)* e *Refactoring UI*:
- **60% Branco Puro (`#FFFFFF`) e Gelo (`#F8FAFC` / `#F1F5F9`):** Transmite higiene sanitária (ANVISA), evita reflexos sob iluminação intensa de mercados e garante contraste AAA (> 15:1).
- **30% Azul Frio (`#0284C7` / `#0369A1`) e Grafite (`#0F172A`):** Associação cognitiva direta com refrigeração, gelo e confiabilidade técnica.
- **10% Verde Frescor (`#15803D`) e Vermelho Crítico (`#B91C1C`):** Semântica visual imediata entre operação segura e estado de emergência térmica.

---

## 🚀 Tecnologias Utilizadas
- **Front-End Responsivo (Mobile-First + Desktop Dashboard):** HTML5, Tailwind CSS, JavaScript ES6+ Modular
- **Visualização de Dados:** Chart.js (Curva Térmica Dinâmica de 24h)
- **Simulação Sonora Embarcada:** Web Audio API (Oscilador Square Wave em `1500 Hz`)
- **Relatórios Sanitários:** Exportação nativa em CSV (UTF-8 com BOM compatível com Microsoft Excel e Google Sheets)
- **Prototipação Eletrônica:** C++ / Arduino IDE & Autodesk Tinkercad Circuits
