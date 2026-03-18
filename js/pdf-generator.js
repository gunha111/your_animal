/* Care Plan PDF Generator — uses jsPDF directly from data */

function generateCarePlanPDF(petName, plan) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const pageW = 210;
  const pageH = 297;
  const ml = 15; // margin left
  const mr = 15; // margin right
  const cw = pageW - ml - mr; // content width
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // ── colors ──────────────────────────────────────────────
  const C = {
    blue:       [79, 172, 254],
    blueDark:   [37, 99, 235],
    cyan:       [0, 242, 254],
    white:      [255, 255, 255],
    dark:       [17, 24, 39],
    muted:      [107, 114, 128],
    lightBlue:  [239, 246, 255],
    lightYellow:[254, 249, 195],
    lightPurple:[237, 233, 254],
    lightGreen: [220, 252, 231],
    amber:      [254, 243, 199],
    border:     [229, 231, 235],
    rowAlt:     [248, 250, 252],
  };

  let y = 0;

  // ── helpers ──────────────────────────────────────────────
  function setColor(rgb) { doc.setTextColor(...rgb); }
  function setFill(rgb) { doc.setFillColor(...rgb); }
  function setDraw(rgb) { doc.setDrawColor(...rgb); }

  function text(str, x, posY, opts) { doc.text(str, x, posY, opts || {}); }

  function checkPage(needed) {
    if (y + needed > pageH - 15) {
      doc.addPage();
      y = 20;
    }
  }

  function sectionHeader(label, bgColor, textColor) {
    checkPage(14);
    setFill(bgColor);
    setDraw(bgColor);
    doc.roundedRect(ml, y, cw, 10, 2, 2, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setColor(textColor || C.dark);
    text(label, ml + 4, y + 7);
    y += 14;
  }

  function tableRow(col1, col2, col3, isAlt) {
    const rowH = 12;
    checkPage(rowH + 2);
    if (isAlt) {
      setFill(C.rowAlt);
      setDraw(C.border);
      doc.rect(ml, y, cw, rowH, 'F');
    }
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    setColor(C.blueDark);
    text(col1, ml + 3, y + 8);

    doc.setFont('helvetica', 'bold');
    setColor(C.dark);
    text(col2, ml + 32, y + 8);

    doc.setFont('helvetica', 'normal');
    setColor(C.muted);
    const lines = doc.splitTextToSize(col3, cw - 90);
    text(lines[0] || '', ml + 93, y + 8);
    y += rowH;
  }

  function bullet(str) {
    checkPage(9);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    setColor(C.dark);
    const lines = doc.splitTextToSize(str, cw - 8);
    text('•', ml + 2, y + 6);
    text(lines, ml + 8, y + 6);
    y += 7 * lines.length;
  }

  function tipRow(str) {
    checkPage(10);
    setFill(C.lightBlue);
    setDraw(C.blue);
    doc.setLineWidth(0.5);
    // left accent bar
    doc.setFillColor(...C.blue);
    doc.rect(ml, y, 2.5, 8, 'F');
    setFill(C.lightBlue);
    doc.rect(ml + 2.5, y, cw - 2.5, 8, 'F');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setColor(C.dark);
    const clean = str.replace(/^💡\s*/, '');
    const lines = doc.splitTextToSize(clean, cw - 12);
    text(lines, ml + 7, y + 5.5);
    y += 9 * lines.length;
  }

  // ── PAGE 1: HEADER ───────────────────────────────────────
  // gradient-ish header: two rects
  setFill(C.blueDark);
  doc.rect(0, 0, pageW, 40, 'F');
  setFill(C.blue);
  doc.rect(0, 20, pageW, 20, 'F');

  // paw icon area
  setFill([255, 255, 255, 0.15]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  setColor(C.white);
  text('YourAnimal', ml, 16);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  setColor([220, 240, 255]);
  text('mypetgenerator.com', ml, 24);

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  setColor(C.white);
  text(`${petName} Daily Care Plan`, ml, 34);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setColor([200, 230, 255]);
  text(today, pageW - mr, 34, { align: 'right' });

  y = 50;

  // ── MORNING ─────────────────────────────────────────────
  sectionHeader('MORNING ROUTINE', [255, 237, 213], [154, 52, 18]);
  plan.morning.forEach((t, i) => tableRow(t.time, t.task, t.detail, i % 2 === 0));
  y += 4;

  // ── AFTERNOON ────────────────────────────────────────────
  sectionHeader('AFTERNOON ROUTINE', C.lightYellow, [120, 80, 0]);
  plan.afternoon.forEach((t, i) => tableRow(t.time, t.task, t.detail, i % 2 === 0));
  y += 4;

  // ── EVENING ──────────────────────────────────────────────
  sectionHeader('EVENING ROUTINE', C.lightPurple, [88, 28, 135]);
  plan.evening.forEach((t, i) => tableRow(t.time, t.task, t.detail, i % 2 === 0));
  y += 4;

  // ── PAGE 2 check ─────────────────────────────────────────
  checkPage(60);

  // ── WEEKLY CHECKLIST ─────────────────────────────────────
  sectionHeader('WEEKLY CARE CHECKLIST', C.lightGreen, [22, 101, 52]);

  const weeklyColW = (cw - 4) / 2;
  plan.weekly.forEach((w, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const xPos = ml + col * (weeklyColW + 4);

    if (col === 0) {
      checkPage(20);
      if (i > 0) y += 2;
    }

    setFill(C.lightGreen);
    setDraw(C.border);
    doc.roundedRect(xPos, y, weeklyColW, 17, 2, 2, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    setColor([22, 101, 52]);
    text(`${w.icon || ''} ${w.day}`.trim(), xPos + 4, y + 6);

    doc.setFont('helvetica', 'bold');
    setColor(C.dark);
    doc.setFontSize(8.5);
    text(w.task, xPos + 4, y + 11);

    doc.setFont('helvetica', 'normal');
    setColor(C.muted);
    doc.setFontSize(7.5);
    const dl = doc.splitTextToSize(w.detail, weeklyColW - 8);
    text(dl[0] || '', xPos + 4, y + 15.5);

    if (col === 1 || i === plan.weekly.length - 1) y += 20;
  });
  y += 4;

  // ── MONTHLY CHECKLIST ────────────────────────────────────
  checkPage(20);
  sectionHeader('MONTHLY CHECKLIST', C.amber, [120, 53, 15]);
  plan.monthly.forEach(m => bullet(m));
  y += 4;

  // ── KEY CARE TIPS ────────────────────────────────────────
  checkPage(20);
  sectionHeader('KEY CARE TIPS', C.lightBlue, C.blueDark);
  plan.tips.forEach(t => tipRow(t));
  y += 6;

  // ── FOOTER on each page ──────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    setFill([249, 250, 251]);
    doc.rect(0, pageH - 12, pageW, 12, 'F');
    setColor(C.muted);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    text('Generated by YourAnimal · mypetgenerator.com', ml, pageH - 5);
    text(`Page ${p} / ${totalPages}`, pageW - mr, pageH - 5, { align: 'right' });
  }

  doc.save(`${petName}_Care_Plan_YourAnimal.pdf`);
}
