import PDFDocument from 'pdfkit-table';

export async function BuildPensum(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void) {
    const doc = new PDFDocument({ font: 'Times-Roman' });
    doc.on("data", dataCB);
    doc.on("end", endCB);


    // Pipe the document to the readable stream

    // Define your table data
    const table = {
        title: 'My Table',
        headers: ['Column 1', 'Column 2', 'Column 3'],
        rows: [
            ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
            ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
            // Add more rows as needed
        ],
    };

    // Create the table
    await doc.table(table, {
        // You can specify additional options here
        // For example, width, columnsSize, etc.
    });

    // End the document
    doc.end();

}