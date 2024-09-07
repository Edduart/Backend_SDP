import { SeminarianEntity } from "../../domain";
import PDFDocument from 'pdfkit-table';
export async function CreateSeminarianList(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void,data: SeminarianEntity[]){
    const doc = new PDFDocument({font: 'Times-Roman'});
    doc.on("data", dataCB);
    doc.on("end", endCB);
    let datos_abuscar: string[][] = [];
    data.forEach(element => {
        datos_abuscar.push([
            element.person!.id,
            element.person!.forename,
            element.person!.surname,
            element.person!.email,
            element.diocesi_name!
        ])
    });
    const table = {
        headers: [
            { label: 'CÉDULA', headerColor: "#FFFFFF"}, 
            { label: 'NOMBRES', headerColor: '#FFFFFF' },
            { label: 'APELLIDOS', headerColor: '#FFFFFF' },
            { label: 'CORREO', headerColor: '#FFFFFF' },
            { label: 'DIÓCESIS', headerColor: '#FFFFFF' },
        ],
        rows: datos_abuscar
    }
    await doc.table(table, { 
        divider:{
            horizontal:{disabled: true} ,
            header:{disabled: true}
        },
        columnSpacing: 10,
        columnsSize: [80, 100, 80, 140,100]
    });
    doc.end();
}