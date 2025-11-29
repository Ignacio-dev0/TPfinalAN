// convertExcelToJson.js
import xlsx from "xlsx";
import fs from "fs";

// 1. Leer el Excel
const workbook = xlsx.readFile("datos.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(sheet);

// 2. Agrupar por cluster
const clusters = {};

for (const row of rows) {
  // Asegurar nombres exactos
  const temp = row["temperatura_°C"];
  const medio = row["medio"];
  const t = parseFloat(row["tiempo_h"]);
  const y = parseFloat(row["Crecimiento normalizado"].toString().replace(",", "."));

  if (!clusters[`${temp}_${medio}`]) {
    clusters[`${temp}_${medio}`] = [];
  }

  clusters[`${temp}_${medio}`].push({ t, y });
}

// 3. Ordenar cada cluster por tiempo
for (const key of Object.keys(clusters)) {
  clusters[key].sort((a, b) => a.t - b.t);
}

// 4. Guardar JSON
fs.writeFileSync(
  "./experimentalData.json",
  JSON.stringify(clusters, null, 2),
  "utf-8"
);

console.log("Archivo experimentalData.json generado correctamente");
