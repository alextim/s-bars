import { useState, useEffect } from 'react';

const compareKeys = (a, b) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  return JSON.stringify(aKeys) === JSON.stringify(bKeys);
};

function useForm(validationSchema, callback, defaultValues = {}) {
  if (!validationSchema) {
    throw new Error('the option `validationSchema` is required');
  }

  if (typeof validationSchema !== 'object') {
    throw new Error('the option `validationSchema` should be an object');
  }

  if (!callback) {
    throw new Error('the option `callback` is required');
  }

  if (typeof callback !== 'function') {
    throw new Error('the option `callback` should be an function');
  }

  if (typeof defaultValues !== 'object') {
    throw new Error('the option `defaultValues` should be an object');
  }

  const defaults = defaultValues;

  if (Object.keys(defaultValues).length === 0) {
    Object.keys(validationSchema).forEach((key) => {
      defaults[key] = '';
    });
  } else if (Object.keys(validationSchema).length !== Object.keys(defaultValues).length) {
    throw new Error('the options `validationSchema` and `defaultValues` should have equal length');
  } else if (!compareKeys(validationSchema, defaultValues)) {
    throw new Error('the options `validationSchema` and `defaultValues` should have the same keys');
  }

  const [initialValues] = useState(defaults);
  const [values, setValues] = useState(defaults);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // const formRendered = useRef(true);

  useEffect(() => {
    /*
    if (formRendered.current) {
      const defaults = defaultValues || {};
      if (defaults.constructor !== Object) {
        throw new Error('the option `defaultValues` should be an object');
      }
      if (Object.keys(defaults).length === 0) {
        Object.keys(validationSchema).forEach((key) => {
          defaults[key] = '';
        });
      } else if (Object.keys(validationSchema).length !== Object.keys(defaultValues).length) {
        throw new Error(
          'the options "validationSchema" and "defaultValues" should have equal length'
        );
      }
      setInitialValues(defaults);
      resetForm(defaults);
      formRendered.current = false;
    }
    */
    const escHandler = (e) => {
      if (e.keyCode === 27) {
        resetForm();
      }
    };
    document.addEventListener('keydown', escHandler, false);
    return () => document.removeEventListener('keydown', escHandler, false);
  }, []);

  function validateField(name, value) {
    const rules = validationSchema[name];
    if (!rules) {
      return '';
    }
    if (rules.required && (!value || (typeof value !== 'boolean' && !value.trim()))) {
      return typeof rules.required === 'string' ? rules.required : 'required';
    }
    if (value) {
      const { length } = value;
      if (rules.minLength) {
        if (length < rules.minLength.value) {
          return rules.minLength.message || `too short: min length is ${rules.minLength.value}`;
        }
      }
      if (rules.maxLength) {
        if (length > rules.maxLength.value) {
          return rules.maxLength.message || `too long: max length is ${rules.maxLength.value}`;
        }
      }
    }
    if (rules.pattern) {
      if (!new RegExp(rules.pattern.value).exec(value)) {
        return rules.pattern.message || 'invalid';
      }
    }
    if (rules.validate !== null && typeof rules.validate === 'function' && value) {
      return rules.validate(value);
    }
    return '';
  }

  const validate = () => {
    const keys = Object.keys(validationSchema);
    let hasErrorInState = false;
    let stateChanged = false;
    const newErrors = { ...errors };

    keys.forEach((name) => {
      const value = values[name];
      const error = errors[name];
      const newError = validateField(name, value);

      if (newError) {
        hasErrorInState = true;
        if (error !== newError) {
          stateChanged = true;
          newErrors[name] = newError;
        }
      }
    });

    if (stateChanged) {
      setErrors(newErrors);
    }
    return !hasErrorInState;
  };

  const setFieldValue = (name, value) => {
    const error = validateField(name, value);

    setTouched((prev) => ({ ...prev, [name]: initialValues[name] !== value }));
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleOnChange = (e) => {
    e.persist();
    let value;
    if (e.target.type === 'checkbox') {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    const { name } = e.target;

    setFieldValue(name, value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (await callback(values)) {
        resetForm();
      }
    } catch (err) {
      console.warn(err.message);
      throw new Error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    const hasErrors = Object.keys(validationSchema).some((name) =>
      Boolean(validateField(name, values[name])),
    );

    return !hasErrors;
  };

  return {
    setFieldValue,
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
    handleOnChange,
    handleOnSubmit,
    validateField,
  };
}

export default useForm;
