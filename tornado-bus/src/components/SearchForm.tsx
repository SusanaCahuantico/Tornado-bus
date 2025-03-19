import React, { useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { searchSchema } from '../utils/validation';

const SearchForm: React.FC = () => {
    const [formValues, setFormValues] = useState<{
      origin: string;
      destination: string;
      date: string;
      passengers: number;
    } | null>(null);
  
    return (
      <div>
        <Formik
          initialValues={{ origin: '', destination: '', date: '', passengers: 1 }}
          validationSchema={searchSchema}
          onSubmit={(values) => {
            setFormValues(values);
            console.log(values, 'VALUESSS');
          }}
        >
          <Form>
            <Field name="origin" placeholder="Ciudad origen" />
            <ErrorMessage name="origin" component="div" />
            <Field name="destination" placeholder="Ciudad destino" />
            <ErrorMessage name="destination" component="div" />
            <Field name="date" type="date" />
            <ErrorMessage name="date" component="div" />
            <Field name="passengers" type="number" />
            <ErrorMessage name="passengers" component="div" />
            <button type="submit">Buscar</button>
          </Form>
        </Formik>
  
        {formValues && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <p><strong>Origen:</strong> {formValues.origin}</p>
            <p><strong>Destino:</strong> {formValues.destination}</p>
            <p><strong>Fecha:</strong> {formValues.date}</p>
            <p><strong>Pasajeros:</strong> {formValues.passengers}</p>
          </div>
        )}
      </div>
    );
  };

  export default SearchForm;
