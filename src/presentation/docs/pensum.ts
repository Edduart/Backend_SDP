import PDFDocument from 'pdfkit-table';
import { Stage_PensumDTO } from '../../domain';

export async function BuildPensum(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void, data: Stage_PensumDTO[]) {
    const doc = new PDFDocument({ font: 'Times-Roman' });
    
    try{
        doc.image('./images/assests/shield.jpg', 500,65,{
            fit:[100,100],
            align:'right',
            
        });
    }catch(error){
        //si hay un error cargando la imagen lo envia
        doc.text('Error en el escudo', 500,65);
    }
    
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
        actual.subjects.forEach(element => {
        materias.push([element.name, element.preceden]); 
    });
        const table = {
            title: actual.name,
            headers: [{ label: 'ASIGNATURA', property: 'area', headerColor: 'blue' }, { label: 'PRECEDIDA POR', property: 'asignatura', headerColor: 'blue' }],
            rows: materias
        };
        await doc.table(table, {  
    });
    
    });

    // End the document
    doc.end();

}