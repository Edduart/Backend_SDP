import PDFDocument from 'pdfkit';
import blobStream from 'blob-stream';

export function BuildPDF(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void,infor: string, surname: string, forename: string){
    const doc = new PDFDocument({font: 'Times-Roman'});
    doc.image("./images/assests/backgpround.png", 110,150,{
        align:'center',
        
    });
    surname = surname.toLowerCase();
    let nombre = surname.split(" ");
    let surname_fixed = "";
    nombre.forEach(actual => {
        surname_fixed =  surname_fixed + actual[0].toUpperCase() + actual.slice(1) +" ";
    }); 
    forename = forename.toLowerCase();
    let apellido = forename.split(" ");
    let forename_fixed= "";
    apellido.forEach(actual => {
        const frist = 
        forename_fixed =  forename_fixed + actual[0].toUpperCase() + actual.slice(1) +" ";
    });
    surname = surname_fixed;
    forename = forename_fixed;
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
    doc.font('Times-Roman', 12).text('Quien subscribe, el ', {
        align: 'justify',
        indent: 30,
        continued: true
    }).font('Times-Bold', 12).text('Pbro. Lcdo. Dorante Boquett, Frank Reinaldo',{align: 'justify', continued: true})
    .font('Times-Roman', 12).text(', Director de Estudio del Instituto de Estudios Superiores “Divina Pastora”, por medio de las presentes líneas declaro y doy testimonio, que el Ciudadano ',{align: 'justify', continued: true})
    .font('Times-Bold', 12).text(surname + " " +forename,{align: 'justify', continued: true}).font('Times-Roman', 12)
    .text(' , de Cedula de Identidad: ', {align: 'justify', continued: true})
    .font('Times-Bold', 12).text(infor, {align: 'justify', continued: true})
    .font('Times-Roman', 12).text(', Seminarista de la Arquidiócesis de Barquisimeto, ha realizado y culminado sus Estudios Filosóficos y Teológicos, correspondientes al Período Académico (2007-2014) cumpliendo con toda la carga de los créditos académicos prescritos por la ley de educación y los reglamentos del Instituto.', {align: 'justify'})
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.text("Dado en la Ciudad de Barquisimeto, a los Quince (15) Días del Mes de Abril del Año 2024", {
        align: 'justify',
        indent: 30
    });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Bold', 12).text('Pbro. Lcdo. Frank Reinaldo Dorante Boquett', {align: 'center'});
    doc.font('Times-Bold', 12).text('V-********', {align: 'center'});
    doc.font('Times-Bold', 12).text('Director Académico', {align: 'center'});
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 10).text('El Manzano Vía río Claro Km 4. Apdo. - 321. Barquisimeto -Venezuela. Telefax - (0251)2325897.', {align: 'center',});
    doc.font('Times-Roman', 10).text('E-mail: centrodeestudios.sdp@cantv.net', {align: 'center'});
    doc.moveTo(50, 680).lineTo(doc.page.width-50, 680).stroke();
    doc.end();
}