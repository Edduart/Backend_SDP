import PDFDocument from 'pdfkit';
import { SeminarianFichaDTO } from '../../domain';

export function BuildFicha(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void, data: SeminarianFichaDTO){
    const doc = new PDFDocument({font: 'Times-Roman'});
    /*Funciones de callback, no tocar*/
    doc.on("data", dataCB);
    doc.on("end", endCB);
    doc.font('Times-Bold',12)
    //tabla del carnet
    doc.rect(40, 40, 530, 356).stroke();
    //Linea superior del ID
    doc.rect(42, 42, 525, 20).lineWidth(3)
    .fillOpacity(5)
    .fillAndStroke("#ffff99")
    doc.fillColor("black")
    //titulo del id
    doc.text("DATOS DEL SEMINARISTA", 45,47,{align: 'center'})
    //icono
    try{
        doc.image('./images/assests/seminary.icon.png', 55,65,{
            fit:[100,100],
            align:'right',
            
        });
    }catch(error){
        //si hay un error cargando la imagen lo envia
        doc.text('Error en el icono', 55,65);
    }
    
    doc.font('Times-Bold', 10).text("SEMINARIO PROVINCIAL", 50, 185,)
    doc.text("DIVINA PASTORA", 65)
    doc.font('Times-Bold', 12)
    //nombre
    //cuadro de color
    doc.rect(170, 68, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("NOMBES: ", 172,74, {continued: true}).text(data.forename)
    
    //foto de perfil
    try{
        if(data.picture != null){
            const picture = data.picture.split("images");
            const path = ".images" + picture[1];

            doc.image(data.picture, 442,65,{
                width:140,
                height: 140,
                fit:[160,140],
                
            });
        }else{
            doc.text('Seminarista no tiene foto', 442,65);
        }
    }catch(error){
        //si hay un error cargando la imagen lo envia
        doc.text('Error en la foto del seminarista', 442,65);
    }
    

    //Apellidos
    doc.rect(170, 95, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("APELLIDOS: ", 172, 101, {continued:true}).text(data.surname)

    doc.fillColor("black")
    //fecha
    doc.rect(170, 122, 80, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("NATALICIO", 176,128)
    //texto
    doc.text(data.birthdate.toISOString().split('T')[0], 180,150)

    //Cedula
    doc.rect(258, 122, 114, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("CÉDULA", 268,128)
    //texto
    doc.text(data.id, 270,150)

    //Edad
    doc.rect(378, 122, 60, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("EDAD", 394,128)
    //texto de edad
    const birth_date = new Date(data.birthdate);
    const hoy = new Date();
    const years = hoy.getFullYear() - birth_date.getFullYear();
    doc.text(years + " AÑOS", 390,150)

    //etapa
    doc.rect(42, 210, 140, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("ETAPA", 75,216)
    //texto
    doc.text(data.etapa, 50,235)
    //Curso
    doc.rect(188, 210, 104, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("CURSO", 190,216)
    //texto
    doc.text(data.curso, 194,235)

    //Diocesis
    doc.rect(298, 210, 269, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("DIÓCESIS", 320,216)
    //texto
    doc.text(data.diocese, 300,235)


    //Parroquia
    doc.rect(42, 260, 300, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("PARROQUIA", 148,266)
    //texto
    doc.text(data.parish, 46,294)

    //telefono
    doc.rect(348, 260, 219, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("TELÉFONO", 352,266)
    //texto
    let cellpp = "N/A"
    if (data.cellphone?.length > 0){
        cellpp = data.cellphone[0]
    }
    doc.text(cellpp, 420,286)

    //Redes sociales
    doc.rect(42, 310, 525, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("REDES SOCIALES", 240,316)
    //texto
    //1
    if(data.redes.length > 0)doc.text(data.redes[0].description, 42,334, {link: data.redes[0].link});
    //2
    if(data.redes.length > 1)doc.text(data.redes[1].description, 124,334,{ link: data.redes[1].link});
    //3
    if(data.redes.length > 2)doc.text(data.redes[2].description, 220,334,{ link: data.redes[2].link});
    //4
    if(data.redes.length > 3)doc.text(data.redes[3].description, 310,334,{ link: data.redes[3].link});
    //5
    if(data.redes.length > 4)doc.text(data.redes[4].description, 420,334,{ link: data.redes[4].link});


    //condicion
    doc.rect(42, 350, 80, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("CONDICIÓN", 46,356)
    //texto
    doc.text(data.location, 50,376)

    //curso
    doc.rect(128, 350, 180, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("GRADO DE INSTRUCCION", 140,356)
    //texto
    doc.text(data.instruction_grade, 176,376)
    
    //Ministerios
    doc.rect(312, 350, 254, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("MINISTERIOS CONFERIDOS", 360,356)
    //texto
    doc.text(data.ministery, 410,376)

    doc.end();
}

