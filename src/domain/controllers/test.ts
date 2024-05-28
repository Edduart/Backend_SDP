import { Diocese } from "../models/sequelize/diocese.data.model"

export  const diocese = async () => {
    const diocese = await Diocese.create({ id: 1 });
    //console.log(diocese);
} 
