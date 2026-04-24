import { recursosEstacion, eventosConsumo } from "./data.js";

console.log("Sistema Nexus iniciado correctamente");

// Arreglos manuales (sin push)
let alertas = [];
let modulosPeligro = [];

let indiceAlertas = 0;
let indicePeligro = 0;

// ==========================
// PROCESAR EVENTOS
// ==========================
for (let i = 0; i < eventosConsumo.length; i++) {

  console.log("Procesando evento de consumo:", eventosConsumo[i]);

  for (let j = 0; j < recursosEstacion.length; j++) {

    if (
      eventosConsumo[i].modulo === recursosEstacion[j].modulo &&
      eventosConsumo[i].recurso === recursosEstacion[j].recurso
    ) {

      let disponible = recursosEstacion[j].cantidad;
      let consumo = eventosConsumo[i].cantidadConsumida;

      // Detectar si no alcanza
      if (disponible < consumo) {

        let deficit = consumo - disponible;

        console.log("⚠️ Déficit detectado:", {
          modulo: recursosEstacion[j].modulo,
          recurso: recursosEstacion[j].recurso,
          deficit: deficit
        });

        alertas[indiceAlertas] = {
          modulo: recursosEstacion[j].modulo,
          recurso: recursosEstacion[j].recurso,
          deficit: deficit
        };

        indiceAlertas++;
      }

      // Restar consumo
      recursosEstacion[j].cantidad = disponible - consumo;
    }
  }
}

// ==========================
// DETECTAR MÓDULOS EN PELIGRO
// ==========================
for (let i = 0; i < recursosEstacion.length; i++) {

  if (recursosEstacion[i].cantidad < recursosEstacion[i].umbralCritico) {

    modulosPeligro[indicePeligro] = {
      modulo: recursosEstacion[i].modulo,
      recurso: recursosEstacion[i].recurso,
      cantidad: recursosEstacion[i].cantidad,
      umbral: recursosEstacion[i].umbralCritico
    };

    indicePeligro++;
  }
}

// ==========================
// REPORTES
// ==========================
console.log("===== ESTADO FINAL =====");
console.table(recursosEstacion);

console.log("===== MÓDULOS EN PELIGRO =====");
console.table(modulosPeligro);

console.log("===== TRANSFERENCIAS REQUERIDAS =====");
console.table(alertas);