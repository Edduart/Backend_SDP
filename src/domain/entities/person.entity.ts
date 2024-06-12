export class PersonEntity{
    constructor(
        public id: string,
        public profile_picture_path: string|null,
        public forename: string,
        public surname: string,
        public email: string,
        public birthdate: Date,
        public medical_record: string|null,
        public BloodType: BloodType

    ){}


    public static fromdb(object: {[key: string]: any}){
        const {id, profile_picture_path, forename, surname, email, birthdate, medical_record, BloodType} = object;
        let fecha = new Date()
        if(birthdate instanceof Date){
            fecha = new Date(birthdate);
        }else{
            console.log(birthdate);
        }
        
        return new PersonEntity(id, profile_picture_path, forename, surname, email, fecha, medical_record, BloodType)
    }

    validate(): Promise<void> {
        return new Promise((resolve, reject) => {
          if (!/^[VE]-\d{1,15}$/.test(this.id)) {
            return reject(new Error("Hubo un error en cedula"));
          }
          if (this.forename.length > 100) {
            return reject(new Error("Nombre muy largo"));
          }
          if (this.surname.length > 100) {
            return reject(new Error("Apellido muy largo"));
          }
      
          const hoy = new Date();
          const years = hoy.getFullYear() - this.birthdate.getFullYear();
          if ((years >= 120) || (years <= 16)) {
            return reject(new Error("Fecha invalida"));
          }
          if (!(this.BloodType in BloodType)) {
            return reject(new Error("Sangre Invalida"));
          }
          resolve();
        });
      }


}

export enum BloodType {
    A_POSITIVO  = 'A+',
    A_NEGATIVO  = 'A-',
    B_POSITIVO  = 'B+',
    B_NEGATIVO  = 'B-',
    AB_POSITIVO = 'AB+',
    AB_NEGATIVO = 'AB-',
    O_POSITIVO  = 'O+',
    O_NEGATIVO  = 'O-',
    UNKNOWN     = 'UNKNOWN'
}