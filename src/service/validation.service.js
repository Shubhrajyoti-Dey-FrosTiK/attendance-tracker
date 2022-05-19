import isInt from "validator/lib/isInt";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import isEmail from "validator/lib/isEmail";

export default class FormValidationService {
  generateErrors(formElements, values) {
    let errors = {};
    for (let formElement in formElements) {
      let properties = formElements[formElement];

      // Checking if the input is a file
      if (properties.inputType == "file") {
        if (!values[formElement]) errors[formElement] = "Please select a photo";
        continue;
      }

      // Checking Required
      if (properties.required && isEmpty(values[formElement])) {
        errors[formElement] = "This field is required";
      }

      // Checking string or number
      if (properties.type) {
        if (properties.type === "number" && isInt(values[formElement])) {
          errors[formElement] = "It has to be a number";
        }
      }

      // Checking for validations (Email etc)
      if (properties.validate) {
        if (properties.validate == "email" && !isEmail(values[formElement])) {
          errors[formElement] = "It must be an email";
        }
      }

      // Checking for equal
      if (
        properties.match &&
        !equals(values[formElement], values[properties.match])
      ) {
        errors[formElement] = "This field has to match with" + properties.match;
      }
    }
    return errors;
  }
}
