import Joi from 'joi'
import { Especialidad } from '../../../../utils/model'

const createPatientSchema = Joi.object({
    nombre: Joi.string().required(),
    apellido: Joi.string().required(),
    identificacion: Joi.string().required(),
    telefono: Joi.number()

   
})
export {
    createPatientSchema
}