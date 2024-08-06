import PDFDocument from 'pdfkit-table'

export function BuildPDF(dataCB: (...args: any[]) => void, endCB: (...args: any[]) => void,infor: string, surname: string, forename: string){
    const doc = new PDFDocument({font: 'Times-Roman',margin: 30, size: 'A4'});
    
    doc.end()
}