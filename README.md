# ❄️ Guardião Frio IoT — Projeto Interdisciplinar (MEC)

> **Sistema IoT de Baixo Custo (R$ 78,00) para Monitoramento Contínuo de Temperatura (`-18 °C` a `-10 °C`) e Alerta de Abertura de Portas em Pequenos Comércios Comunitários via Módulo Wi-Fi ESP8266 e API JSON**

---

## 👨‍🎓 Identificação Acadêmica
- **Aluno Desenvolvedor:** Wanderson Lopes da Silva
- **RA:** 314886
- **Disciplina / Entrega:** Projeto Interdisciplinar (MEC) — Automação e IoT Aplicado a Pequenos Negócios Locais
- **Unidade Monitorada:** Mercado Cliente 1
- **Site Publicado (GitHub Pages):** [https://wls-djsf.github.io/projeto-interdisciplinar/](https://wls-djsf.github.io/projeto-interdisciplinar/)
- **Protótipo Oficial no Figma (Tema Claro UX/UI):** [https://www.figma.com/design/r9Uyb0fix8TzjJKN6est46](https://www.figma.com/design/r9Uyb0fix8TzjJKN6est46)

---

## 🔐 Perfis de Acesso Homologados (RBAC + SHA-256)

A aplicação web possui **proteção obrigatória de rota** e **Controle de Acesso Baseado em Perfil (RBAC)** com verificação criptográfica **SHA-256 (Web Crypto API)** e suporte nativo para chaves do **Firebase Authentication / Supabase Auth** (`auth-config.js`):

| Perfil de Usuário | E-mail (Login) | Senha | Permissões no Sistema |
| :--- | :--- | :--- | :--- |
| **1. Administrador do Sistema (Técnico IoT)** | `admin.tecnico.iot@gmail.com` | `@Admin#Sistema2026!` | Acesso total: Dashboard Gerencial, Telemetria e Pacote JSON da API WiFi (`A0, D2, D4, D5, D6, D10, D11`), Central de Alertas, Exportação CSV, **Edição de Parâmetros de Hardware (`LIMITE_TEMP_MAX`)** e **Simulador API WiFi ESP8266 em Tempo Real**. |
| **2. Proprietário do Mercado (Mercado Cliente 1)** | `mercado.cliente1@gmail.com` | `@Cliente1#Acesso2026!` | Acesso operacional focado no negócio: Visão Geral dos Freezers (`EQ-01` a `EQ-04`), Telemetria em Tempo Real, Central de Alertas e Exportação de Relatórios ANVISA em CSV. *(Bloqueado para alteração de pinos físicos/hardware)*. |

---

## 🔌 Arquitetura de Hardware e Pinos no Tinkercad (Arduino Uno + Módulo WiFi ESP8266)

| Pino Físico | Componente | Função na Regra de Negócio |
| :--- | :--- | :--- |
| **`A0`** | Sensor de Temperatura `TMP36` / `DS18B20` | Leitura contínua da temperatura interna do freezer (Limite p/ congelados: `-10,0 °C`). |
| **`D2`** | Sensor Magnético de Porta (*Reed Switch*) | Configurado com `INPUT_PULLUP`: `LOW` = Porta Fechada, `HIGH` = Porta Aberta. |
| **`D4`** | LED Verde + Resistor `220 Ω` | Acende (`HIGH`) quando a temperatura está abaixo de `-10,0 °C` e a porta está fechada. |
| **`D5`** | LED Vermelho + Resistor `220 Ω` | Acende (`HIGH`) imediatamente se a temperatura subir acima de `-10,0 °C` ou se a porta abrir. |
| **`D6`** | Piezo Buzzer Ativo (`1500 Hz`) | Emite alerta sonoro local (`tone(6, 1500, 300)`) em caso de anomalia térmica ou porta aberta. |
| **`D10` / `D11` + `3.3V`** | **Módulo WiFi `ESP8266`** | Conecta ao Wi-Fi via Comandos AT (`SoftwareSerial(10, 11)`) e transmite o pacote JSON (`POST /api/telemetry`) para o painel web. |

### Exemplo de Pacote JSON enviado pelo Módulo WiFi ESP8266 no Tinkercad:
```json
{"device":"ESP8266-FRIO-01","eq":"EQ-02","tempC":-8.9,"limitC":-10.0,"door":"ABERTA","alert":true}
```
