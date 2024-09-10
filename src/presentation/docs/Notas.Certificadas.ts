import PDFDocument from 'pdfkit-table';
import { EnrollmentTestResult } from '../../domain';

export async function BuildNotas(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void, data: EnrollmentTestResult[]) {
    const doc = new PDFDocument({ font: 'Times-Roman' });
    doc.font('Times-Roman', 12)

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
    let startinyear = data[0].enrollment[0].start_date?.split('-')[0]
    let endyeard = data[0].enrollment[data[0].enrollment.length-1].end_date?.split('-')[0]
    doc.font('Times-Roman', 12).text("Portador de la C.I.Nº:" + data[0].seminarian_id + " cursó en este Instituto materias de FILOSOFIA durante el período académico " +startinyear + "-"+ endyeard+ " obteniendo las siguientes calificaciones según el pénsum que a continuación se especifica.", {indent: 30,});
    
    doc.on("data", dataCB);
    doc.on("end", endCB);
    doc.moveDown();
    let materias: string[][] = [];
    data[0].enrollment.forEach(element => {
        materias.push([
          element.subject_name,
          element.subject_total_score_out_of_graded_scored_10_scale,
          element.start_date?.split("-")[0] +
            "-" +
            element.end_date?.split("-")[0],
        ]);
    });  
    doc.font('Times-Roman', 16) 
    const table = {
        headers: [{ label: '   Asignatura', headerColor: "#FFFFFF"}, { label: '  Nota', property: 'nota', headerColor: '#FFFFFF' },
            { label: '  Período', property: 'periodo', headerColor: '#FFFFFF' }],
        rows: materias,
        
    }
    await doc.table(table, { 
        divider:{
            horizontal:{disabled: true} ,
            header:{disabled: true}
        },
        columnSpacing: 10,
        columnsSize: [350, 40, 50],
        prepareHeader: () =>doc.font('Times-Bold', 12),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell)=> doc.font('Times-Roman', 12),
    });
    doc.font('Times-Roman', 12).text("La escala de calificaciones es del UNO (01) al DIEZ (10) y la nota mínima aprobatoria es de SEIS (06) puntos.", {indent: 30,});
    doc.moveDown();
    let date = new Date();
    let day = date.getDay()
    let month = Getmonth(date.getMonth())
    let year = date.getFullYear(); 
    doc.font('Times-Roman', 12).text("Certificación que se expide a petición de la parte interesada, en Barquisimeto, a los " + day + " días del mes de " + month + " " + year + "", {indent: 30,});
    
    // End the document
    doc.end();

}

export function Getmonth(id: number){
    switch (id) {
        case    1:
            return "enero";
            break;
        case    2:
            return "febrero";
            break;
        case    3:
            return "marzo";
            break;
        case    4:
            return "abril";
            break;
        case    5:
            return "mayo";
            break;
        case    6:
            return "junio";
            break;
        case    7:
            return "julio";
            break;
        case    8:
            return "agosto";
            break;
        case    9:
            return "septiembre";
            break;
        case    10:
            return "octubre";
            break;
        case    11:
            return "noviembre";
            break;
        case    12:
            return "diciembre";
            break;
        default:
            break;
    }
}