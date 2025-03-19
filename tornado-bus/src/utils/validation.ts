import * as Yup from 'yup';

export const searchSchema = Yup.object().shape({
  origin: Yup.string().required('*Ciudad origen es requerida'),
  destination: Yup.string().required('*Ciudad destino es requerida'),
  date: Yup.date()
    .min(new Date(), '*La fecha no puede ser anterior a hoy')
    .required('*Fecha es requerida'),
  passengers: Yup.number()
    .min(1, '*Debe haber al menos un pasajero')
    .required('*Número de pasajeros es requerido'),
});
