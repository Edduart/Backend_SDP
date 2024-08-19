import PDFDocument from 'pdfkit';
import { Getmonth } from './Notas.Certificadas';

export function BuildConstance(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void,infor: string, surname: string, forename: string, period: string, etapa: string){
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
    doc.font('Times-Bold', 12).text('CONSTANCIA DE ESTUDIOS', {align: 'center', });
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 12).text('El suscrito en su carácter de Rector del Instituto de Estudios Superiores “Divina Pastora”, certifica por medio de la presente que:',{indent: 30} );
    doc.moveDown();
    doc.moveDown();
    doc.font('Times-Roman', 18).text(surname + ', ' + forename, {align: 'center'})
    doc.moveDown();
    doc.moveDown();
    doc.text("Portador de la C.I. Nº:"+ infor +" está inscrito en el lapso académico "+period+", de la "+etapa+".", {
        indent: 30
    });
    doc.moveDown();
    doc.moveDown();
    let date = new Date();
    let day = date.getDay()
    let month = Getmonth(date.getMonth())
    let year = date.getFullYear(); 
    doc.text("Dado en la Ciudad de Barquisimeto, a los "+day+" Días del Mes de "+month+" del Año " + year+ ".", {
        align: 'justify',
        indent: 30
    });
    doc.text("Certificación que se expide a petición de la parte interesada, en Barquisimeto, a los "+day+" días del mes de "+month+" del " + year+ ".", {indent: 30})
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