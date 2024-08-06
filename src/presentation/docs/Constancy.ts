import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

export function BuildPDF(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void,infor: string){
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
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Bold', 12).text('CARTA DE CULMINACIÓN DE LOS ESTUDIOS DE FILOSOFÍA Y TEOLOGÍA', {align: 'center', });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 12).text('Quien subscribe, el Pbro. Lcdo. Dorante Boquett, Frank Reinaldo, Director de Estudio del Instituto de Estudios Superiores “Divina Pastora”, por medio de las presentes líneas declaro y doy testimonio, que el Ciudadano [REDATEC NAME] y [REDACTED LAST NAME]  , de Cedula de Identidad:' + infor +', Seminarista de la Arquidiócesis de Barquisimeto, ha realizado y culminado sus Estudios Filosóficos y Teológicos, correspondientes al Período Académico (2007-2014) cumpliendo con toda la carga de los créditos académicos prescritos por la ley de educación y los reglamentos del Instituto.', {
        align: 'justify',
        indent: 30
    });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.text("Dado en la Ciudad de Barquisimeto, a los Quince (15) Días del Mes de Abril del Año 2024", {
        align: 'justify',
        indent: 30
    });
    
    doc.end();
}