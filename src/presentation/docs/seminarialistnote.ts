import { SeminarianEntity, SeminarianListDTO } from "../../domain";
import PDFDocument from 'pdfkit-table';
export async function CreateSeminarianListWithNotes(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void,data: SeminarianListDTO[]){
    const doc = new PDFDocument({font: 'Times-Roman'});
    doc.on("data", dataCB);
    doc.on("end", endCB);
    doc.image('./images/assests/seminary.icon.png', {
        fit:[100,100],
        align:'right'
    })
    doc.font('Times-Bold', 12).text('Arquidiócesis de Barquisimeto', {align: 'center'});
    doc.font('Times-Bold', 12).text('Instituto de Estudios Superiores “Divina Pastora”', {align: 'center'});
    doc.font('Times-Bold', 12).text('Dirección de Estudios', {align: 'center'});
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Bold', 12).text('Reporte de notas de seminaristas', {align: 'center'});
    doc.moveDown();
    doc.moveDown();
    let datos_abuscar: string[][] = [];
    data.forEach(element => {
        datos_abuscar.push([
            element.id,
            element.forename,
            element.surname,
            element.email,
            element.note!
        ])
    });
    const table = {
        headers: [
            { label: 'CÉDULA', headerColor: "#FFFFFF"}, 
            { label: 'NOMBRES', headerColor: '#FFFFFF' },
            { label: 'APELLIDOS', headerColor: '#FFFFFF' },
            { label: 'CORREO', headerColor: '#FFFFFF' },
            { label: 'NOTA', headerColor: '#FFFFFF' },
        ],
        rows: datos_abuscar
    }
    await doc.table(table, { 
        columnSpacing: 10,
        columnsSize: [80, 100, 80, 140,100],
        prepareHeader: () =>doc.font('Times-Bold', 12),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell)=> doc.font('Times-Roman', 12),
    });
    doc.end();
}