import PDFDocument from 'pdfkit-table';
import { EnrollmentTestResult } from '../../domain';

export async function BuildNotas(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void, data: EnrollmentTestResult[]) {
    const doc = new PDFDocument({ font: 'Times-Roman' });
    doc.image('./images/assests/backgproundcolored.png', 25,65,{
        fit:[100,100],
        align:'right',
        
    });
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Bold', 12).text("Arquidiósis de Barquisimeto", {align: 'center'});
    doc.font('Times-Bold', 12).text('Instituto de Estudios Superiores "Divina Pastora" ', {align: 'center'});
    doc.font('Times-Bold', 12).text("Dirección de Estudios", {align: 'center'});
    doc.moveDown();
    doc.font('Times-Bold', 12).text("CERTIFICADO DE CALIFICACIONES", {align: 'center'});
    doc.moveDown();
    doc.font('Times-Roman', 12).text('El suscrito en su carácter de Control de Estudio del Instituto de Estudios Superiores "Divina Pastora", certifica por medio de la presente que:', {indent: 30,});
    doc.moveDown();
    
    
    //names
    data[0].seminarian_surname = data[0].seminarian_surname.toLowerCase();
    let nombre = data[0].seminarian_surname.split(" ");
    let surname_fixed = "";
    nombre.forEach(actual => {
        surname_fixed =  surname_fixed + actual[0].toUpperCase() + actual.slice(1) +" ";
    }); 

    data[0].seminarian_forename = data[0].seminarian_forename.toLowerCase();
    let apellido = data[0].seminarian_forename.split(" ");
    let forename_fixed= "";
    apellido.forEach(actual => {
        const frist = 
        forename_fixed =  forename_fixed + actual[0].toUpperCase() + actual.slice(1) +" ";
    });
    doc.font('Times-Roman', 12).text(forename_fixed+surname_fixed, {align: 'center'});
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 12).text("Portador de la C.I.Nº:" + data[0].seminarian_id + "cursó en este Instituto materias de FILOSOFIA durante el período académico" + data[0]. + "obteniendo las siguientes calificaciones según el pénsum que a continuación se especifica.", );
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
    
    const table = {
        headers: [{ label: '   Asignatura', headerColor: "#FFFFFF"}, { label: '  Nota', property: 'nota', headerColor: '#FFFFFF' },
            { label: '  Período', property: 'periodo', headerColor: '#FFFFFF' }, 
            { label: 'Semestre', property: 'semestre', headerColor: '#FFFFFF' }],
        rows: [["pollo", "1", "1", "1"], ["pollo", "1", "1", "1"]]
    }
    await doc.table(table, { 
        divider:{
            horizontal:{disabled: true} ,
            header:{disabled: true}
        },
        columnSpacing: 10,
        columnsSize: [350, 40, 50,50]
    });
/*
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
        await doc.table(table, {});
    
    });
    */
    // End the document
    doc.end();

}