import PDFDocument from 'pdfkit-table';
import { Stage_PensumDTO } from '../../domain';

export async function BuildPensum(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void, data: Stage_PensumDTO[]) {
    const doc = new PDFDocument({ font: 'Times-Roman' });
    doc.image('./images/assests/backgproundcolored.png', 25,65,{
        fit:[100,100],
        align:'right',
        
    });
    doc.image('./images/assests/shield.jpg', 500,65,{
        fit:[100,100],
        align:'right',
        
    });
    doc.font('Times-Bold', 12).text("PLANES DE ESTUDIO", {align: 'center'});
    doc.font('Times-Roman', 12)
    doc.on("data", dataCB);
    doc.on("end", endCB);
    //Crear el array de areas
    //cambiar academic field a delegate
    // Pipe the document to the readable stream
    // Define your table data
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    data.forEach(async actual => {
        let materias: string[][] = [];
        actual.academic_fields.forEach(element => {
        element.subjects.forEach(matea => {
            materias.push([element.name,matea]); 
        });
    });
        const table = {
            title: actual.name,
            headers: [{ label: 'ÁREA DE ESTUDIO', property: 'area', headerColor: 'blue' }, { label: 'ASIGNATURA', property: 'asignatura', headerColor: 'blue' }],
            rows: materias
        };
        await doc.table(table, {  
    });
    
    });

    // End the document
    doc.end();

}