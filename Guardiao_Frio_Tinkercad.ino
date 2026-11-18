// ============================================================================
// PROJETO: Guardião Frio IoT - Monitoramento Inteligente de Refrigeração
// ALUNO: Wanderson Lopes da Silva | RA: 314886
// APLICAÇÃO: Pequenos Comércios Comunitários (Freezers de Congelados)
// AMBIENTE: Autodesk Tinkercad Circuits / Arduino Uno R3 / NodeMCU ESP8266
// ============================================================================

const int PINO_TEMP = A0;     // Sensor de Temperatura TMP36
const int PINO_PORTA = 2;     // Sensor Magnético de Porta (Chave / Reed Switch)
const int LED_VERDE = 4;      // Indicador Sistema Normal (Abaixo de -10 °C)
const int LED_VERMELHO = 5;   // Indicador Alerta Crítico (Acima de -10 °C ou Porta Aberta)
const int BUZZER = 6;         // Alarme Sonoro Local

const float LIMITE_TEMP_MAX = -10.0; // Limite máximo seguro para congelados (-10.0 °C)

void setup() {
  pinMode(PINO_PORTA, INPUT_PULLUP);
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  Serial.begin(9600);
  Serial.println("=== SISTEMA GUARDIAO FRIO IoT INICIADO ===");
}

void loop() {
  int leituraADC = analogRead(PINO_TEMP);
  float tensao = leituraADC * (5.0 / 1023.0);
  float temperaturaC = (tensao - 0.5) * 100.0;

  bool portaAberta = (digitalRead(PINO_PORTA) == HIGH);

  Serial.print("Temperatura Atual: ");
  Serial.print(temperaturaC, 1);
  Serial.print(" C | Porta: ");
  Serial.println(portaAberta ? "ABERTA" : "FECHADA");

  if (temperaturaC > LIMITE_TEMP_MAX || portaAberta) {
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_VERMELHO, HIGH);
    tone(BUZZER, 1500, 300);
    Serial.println(">>> [ALERTA IoT ENVIADO AO CELULAR]: Freezer acima de -10 C ou Porta Aberta!");
  } else {
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_VERMELHO, LOW);
    noTone(BUZZER);
  }

  delay(1000);
}
