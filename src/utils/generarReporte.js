// utils/generarReportePDF.js
import jsPDF from "jspdf";

// Diseño: paleta y helpers
const BRAND = { mint: [61, 125, 95], mintLight: [229, 241, 234], grayDark: [36, 63, 49], grayMid: [124, 139, 130] };
const format = (num, dec = 3) => Number(num).toFixed(dec);

function drawHeader(pdf) {
  pdf.setFillColor(...BRAND.mint);
  pdf.rect(0, 0, 210, 24, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("BioLab Digital – Reporte por Clúster", 14, 15);
  const now = new Date();
  pdf.setFontSize(10);
  pdf.text(now.toLocaleString(), 196, 15, { align: "right" });
  pdf.setTextColor(...BRAND.grayDark);
  pdf.setFont("helvetica", "normal");
}

function sectionTitle(pdf, text, x, y) {
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(13);
  pdf.text(text, x, y);
  pdf.setDrawColor(...BRAND.mint);
  pdf.setLineWidth(0.6);
  pdf.line(x, y + 2, x + 60, y + 2);
  pdf.setFont("helvetica", "normal");
}

function drawCard(pdf, x, y, w, h) {
  pdf.setFillColor(...BRAND.mintLight);
  pdf.setDrawColor(180);
  pdf.setLineWidth(0.2);
  pdf.rect(x, y, w, h, "FD");
}

export function generarReportePDF({ temp, medium, time, result }) {
  const pdf = new jsPDF();
  pdf.setFont("helvetica", "normal");
  drawHeader(pdf);

  // Parámetros
  sectionTitle(pdf, "Parámetros de entrada", 14, 36);
  pdf.setFontSize(12);
  pdf.text(`Temperatura: ${temp} °C`, 14, 44);
  pdf.text(`Medio: ${medium}`, 14, 52);
  pdf.text(`Tiempo consultado: ${time} h`, 14, 60);

  // Resultado
  sectionTitle(pdf, "Resultado puntual", 14, 78);
  drawCard(pdf, 14, 84, 180, 32);
  const safeValue = result && typeof result.value === "number" ? result.value : 0;
  const safePhase = result && result.phase === "crecimiento" ? "Crecimiento" : "Desaceleración";
 
  pdf.setFontSize(12);
  pdf.text(`Crecimiento normalizado: ${format(safeValue)}`, 18, 96);
  pdf.text(`Fase: ${safePhase}`, 18, 108);

  // Interpretación
  sectionTitle(pdf, "Interpretación de la fase", 14, 128);
  const faseTexto =
    result && result.phase === "crecimiento"
      ? "El punto consultado se encuentra dentro de la fase exponencial, donde el crecimiento aumenta rápidamente."
      : "El punto consultado pertenece a la fase de desaceleración, donde el crecimiento se estabiliza o disminuye.";
  pdf.setFontSize(12);
  pdf.text(faseTexto, 14, 136, { maxWidth: 180 });

  // Nota metodológica
  sectionTitle(pdf, "Nota metodológica", 14, 156);
  pdf.setFontSize(12);
  pdf.text(
    "Este reporte utiliza un modelo cluster con preferencia por datos experimentales; si no existen, emplea modelos ajustados (exponencial y lineal por tramos).",
    14,
    164,
    { maxWidth: 180 }
  );

  // Pie de página
  pdf.setFontSize(9);
  pdf.setTextColor(...BRAND.grayMid);
  pdf.text("© BioLab Digital", 14, 290);
  pdf.text("Página 1", 196, 290, { align: "right" });
  pdf.setTextColor(...BRAND.grayDark);

  pdf.save("Reporte_Cluster_BioLabDigital.pdf");
}