import React from "react";
import { useNavigate } from "react-router-dom";

// Formik
import { Formik, Form, Field } from "formik";

// MUI
import { Button, LinearProgress } from "@mui/material";
import { TextField, SimpleFileUpload } from "formik-mui";
import FormValidationService from "../../service/validation.service";
import FirebaseService from "../../service/firebase.service";

// Axios
import { APIService } from "../../service/api.service";

const index = () => {
  const validator = new FormValidationService();
  const api = new APIService();
  const fs = new FirebaseService();
  const navigate = useNavigate();

  // Form Schema
  const formElements = {
    Name: {
      required: true,
    },
    Email: {
      required: true,
      type: "email",
      validate: "email",
    },
    Password: {
      required: true,
      type: "password",
    },
    "Confirm Password": {
      required: true,
      type: "password",
      match: "Password",
    },
    Photo: {
      inputType: "file",
      type: "file",
      required: true,
    },
  };

  // Utility Functions
  const fetchInitialValues = (formElements) => {
    var initialFormValues = {};
    for (let key in formElements) {
      initialFormValues[`${key}`] = "";
    }
    return initialFormValues;
  };

  // Validation
  const validate = (values) => {
    return validator.generateErrors(formElements, values);
  };

  // Handle Functions
  const handleSubmit = (values) => {
    const photoLink = fs.uploadToFirebaseStorage([values.Photo]);
    navigate("/attendance");
  };

  return (
    <React.Fragment>
      <h1 className="font-bold text-5xl text-center mt-8 mb-10">Register</h1>
      <Formik
        initialValues={fetchInitialValues(formElements)}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className="flex flex-col items-center justify-center">
            {Object.keys(formElements).map((formElement, index) => {
              return (
                <div
                  key={`Form_ELement_${index}`}
                  className="m-5 w-full text-center"
                >
                  {!formElements[`${formElement}`].inputType && (
                    <Field
                      component={TextField}
                      name={`${formElement}`}
                      label={formElement}
                      className="w-[90%] md:w-2/3"
                    />
                  )}
                  {formElements[`${formElement}`].inputType === "file" && (
                    <Field
                      component={SimpleFileUpload}
                      accept="image/*"
                      name={`${formElement}`}
                      label={`${formElement} : This will be used for recognizing your face`}
                      className="w-2/3"
                    />
                  )}
                </div>
              );
            })}
            <div className="m-6">
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

export default index;
