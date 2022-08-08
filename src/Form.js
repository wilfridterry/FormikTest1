import { Formik, Form, Field, ErrorMessage, useField } from "formik";

import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.name}>{label}</label>
      <input {...props} {...field} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label  className="checkbox">
        <input type="checkbox" {...props} {...field} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const CustomForm = () => {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        amount: 0,
        currency: "",
        text: "",
        terms: false,
      }}
      validationSchema={Yup.object({
        name: Yup.string().min(2).required(),
        email: Yup.string().email().required(),
        amount: Yup.number().min(1).required(),
        currency: Yup.string().required(),
        text: Yup.string().min(10).max(500),
        terms: Yup.boolean().required().oneOf([true]),
      })}
      onSubmit={(values) => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className="form">
        <h2>Send Form</h2>

        <MyTextInput label="Your name" id="name" name="name" type="text" />

        <MyTextInput label="Your email" id="email" name="email" type="email" />

        <MyTextInput label="Amount" id="amount" name="amount" type="number" />

        <label htmlFor="currency">Currency</label>
        <Field id="currency" name="currency" as="select">
          <option value="">Выберите валюту</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="RUB">RUB</option>
        </Field>
        <ErrorMessage className="error" name="currency" component="div" />

        <label htmlFor="text">Your text</label>
        <Field id="text" name="text" as="textarea" />
        <ErrorMessage className="error" name="text" component="div" />

        <MyCheckbox name="terms">
          Terms and conditions, do you agree?
        </MyCheckbox>
        <button type="submit">Отправить</button>
      </Form>
    </Formik>
  );
};

export default CustomForm;
