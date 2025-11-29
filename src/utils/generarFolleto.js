import jsPDF from "jspdf";
import Logo from "../../public/logo.png";

export function generarFolletoBioDigital() {
  const pdf = new jsPDF();

  // ----------- PORTADA -----------
  pdf.setFillColor(0, 123, 255);
  pdf.rect(0, 0, 210, 40, "F");

  pdf.setFontSize(24);
  pdf.setTextColor(255, 255, 255);
  pdf.text("BioDigital Lab", 105, 20, { align: "center" });

  pdf.setFontSize(12);
  pdf.text("Analítica Microbiológica Profesional", 105, 30, { align: "center" });

  pdf.addImage(Logo, "PNG", 80, 50, 50, 50);

  // ----------- OBJETIVOS Y PROBLEMA -----------
  pdf.setTextColor(0,0,0);
  pdf.setFontSize(16);
  pdf.text("Objetivos y Problema", 14, 120);
  pdf.setFontSize(12);
  pdf.text(
    "Eliminamos la incertidumbre en procesos biológicos al ofrecer una herramienta confiable para proyectar riesgos, priorizar intervenciones y garantizar consistencia regulatoria.",
    14, 128, { maxWidth: 180 }
  );

  // ----------- MISIÓN -----------
  pdf.setFontSize(16);
  pdf.text("Nuestra Misión", 14, 150);
  pdf.setFontSize(12);
  pdf.text(
    "Facilitar análisis microbiológicos precisos, escalables y accesibles para laboratorios pequeños e investigadores independientes.",
    14, 158, { maxWidth: 180 }
  );

  // ----------- BENEFICIOS / PLAN STARTER -----------
  pdf.setFontSize(16);
  pdf.text("Plan Starter – Beneficios", 14, 180);
  pdf.setFontSize(12);
  const starterItems = [
    "Simulaciones simultáneas (hasta 5 cultivos)",
    "Reportes comparativos y descarga en PDF profesional",
    "Calibración guiada del simulador",
    "Historial de experimentos (6 meses en nube)",
    "Soporte prioritario por email (24hs)"
  ];
  starterItems.forEach((item, i) => {
    pdf.text(`• ${item}`, 18, 188 + i*8);
  });

  // ----------- BENEFICIOS ADICIONALES -----------
  pdf.setFontSize(14);
  pdf.text("Beneficios adicionales", 14, 240);
  pdf.setFontSize(12);
  const extraItems = [
    "Resultados consistentes y reproducibles",
    "Simulaciones inteligentes que ahorran tiempo y recursos",
    "Exportación de gráficos en alta resolución",
    "Acceso a métricas y KPIs clave",
    "Historial completo de experimentos en la nube"
  ];
  extraItems.forEach((item, i) => {
    pdf.text(`• ${item}`, 18, 248 + i*8);
  });

  // ----------- PIE DE PÁGINA -----------
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    "BioDigital Lab – https://biolabdigital.up.railway.app/ – contacto@biodigitallab.com",
    105,
    290,
    { align: "center" }
  );

  pdf.save("Folleto_BioDigitalLab.pdf");
}
