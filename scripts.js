function addRosterEntry() {
    // Get form values
    const srNo = document.getElementById('srNo').value;
    const instructor = document.getElementById('instructor').value;
    const trainee = document.getElementById('trainee').value;
    const aircraftReg = document.getElementById('aircraftReg').value;
    const reportingTime = document.getElementById('reportingTime').value;

    // Validate form inputs
    if (!srNo || !instructor || !trainee || !aircraftReg || !reportingTime) {
        alert('Please fill all fields');
        return;
    }

    // Create a new table row
    const table = document.getElementById('rosterTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert cells
    const srNoCell = newRow.insertCell(0);
    const instructorCell = newRow.insertCell(1);
    const traineeCell = newRow.insertCell(2);
    const aircraftRegCell = newRow.insertCell(3);
    const reportingTimeCell = newRow.insertCell(4);

    // Add values to the cells
    srNoCell.innerHTML = srNo;
    instructorCell.innerHTML = instructor;
    traineeCell.innerHTML = trainee;
    aircraftRegCell.innerHTML = aircraftReg;
    reportingTimeCell.innerHTML = reportingTime;

    // Clear form fields
    document.getElementById('rosterForm').reset();
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('GARG AVIATION LTD', 14, 22);
    doc.setFontSize(16);
    doc.text('Student Pilot Roster System', 14, 32);
    doc.setFontSize(12);
    doc.text('Roster Details', 14, 42);

    // Define the table headers
    const table = document.getElementById('rosterTable');
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => 
        Array.from(tr.querySelectorAll('td')).map(td => td.textContent)
    );

    // Configure AutoTable
    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 50,
        theme: 'striped',
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255], fontStyle: 'bold' },  // Dark blue with white text
        styles: { fontSize: 11, cellPadding: 4, textColor: [0, 0, 0] },  // Black text for body
        alternateRowStyles: { fillColor: [240, 240, 240] },  // Light grey for alternate rows
        margin: { top: 60 },
        tableLineColor: [0, 0, 0],
        tableLineWidth: 0.1
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(Page ${i} of ${pageCount}, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 10);
    }

    doc.save('roster.pdf');
}