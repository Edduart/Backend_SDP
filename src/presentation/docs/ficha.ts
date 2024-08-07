import PDFDocument from 'pdfkit';

export function BuildFicha(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void){
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
    doc.image('./images/assests/seminary.icon.png', 55,65,{
        fit:[100,100],
        align:'right',
        
    })
    doc.font('Times-Bold', 10).text("SEMINARIO PROVINCIAL", 50, 185,)
    doc.text("DIVINA PASTORA", 65)
    doc.font('Times-Bold', 12)
    //nombre
    //cuadro de color
    doc.rect(170, 68, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("NOMBES: ", 172,74)
    

    //Apellidos
    doc.rect(170, 95, 268, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("APELLIDOS: ", 172, 101)

   doc.fillColor("black")
    //fecha
    doc.rect(170, 122, 150, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("FECHA DE NACIMIENTO", 172,128)

    //Cedula
    doc.rect(326, 122, 58, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("CÉDULA", 330,128)

    //Edad
    doc.rect(390, 122, 48, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#ccfcff")
    doc.fillColor("black")
    doc.text("EDAD", 394,128)

    //etapa
    doc.rect(42, 210, 140, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("ETAPA", 75,216)
    //texto
    doc.text("CONFIGURATIVA", 50,235)

    //Curso
    doc.rect(188, 210, 104, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("CURSO", 190,216)
    //texto
    doc.text("III Filosofía", 200,235)

    //Diocesis
    doc.rect(298, 210, 269, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("DIÓCESIS", 320,216)
    //texto
    doc.text("DIÓCESIS DE SAN FERNANDO DE APURE", 300,235)


    //Parroquia
    doc.rect(42, 260, 300, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("PARROQUIA", 148,266)
    //texto
    doc.text("BASÍLICA MENOR SANTO CRISTO DE LA GRACIA", 46,294)

    //telefono
    doc.rect(348, 260, 219, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("TELÉFONO", 352,266)
    //texto
    doc.text("11111111111111111111/11111111111111111111/11111111111111111111", 352,286)

    //Redes sociales
    doc.rect(42, 310, 525, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("REDES SOCIALES", 240,316)
    //texto
    doc.text("FACEBOOK, X, LINKEDIN, GITHUB, YOUTUBE, TIKTOK, PINTEREST", 42,334, {align: 'center'})

    //condicion
    doc.rect(42, 350, 80, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("CONDICIÓN", 46,356)
    //texto
    doc.text("INTERNO", 50,376)

    //curso
    doc.rect(128, 350, 180, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("GRADO DE INSTRUCCION", 140,356)
    //texto
    doc.text("LICENCIADO", 176,376)
    
    //Ministerios
    doc.rect(312, 350, 254, 20).lineWidth(3).fillOpacity(5).fillAndStroke("#f2f2f2")
    doc.fillColor("black")
    doc.text("MINISTERIOS CONFERIDOS", 360,356)
    //texto
    doc.text("LECTORADO", 410,376)

    doc.end();
}

