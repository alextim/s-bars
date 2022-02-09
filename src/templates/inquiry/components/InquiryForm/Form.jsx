import React from 'react';

import { useTranslation } from '@/i18n';
import useServiceItems from '@/hooks/useServiceItems';
import Button from '@/components/Button';
import useForm from '@/components/Form/src/hooks/useForm';

// import Link from '../LocalizedLink';

import { InputControl, TextAreaControl, HoneyPotInput } from '@/components/Form/src/components/form-controls';
import ValueSelectControl from '@/components/Form/src/components/form-controls/ValueSelectControl';
import CheckBoxControl from '@/components/Form/src/components/form-controls/CheckBoxControl';
import BoxedInputControl from '@/components/Form/src/components/form-controls/BoxedInputControl';
import FormErrorMessage from '@/components/Form/src/components/form-controls/FormErrorMessage';
import AutofillTrapForm from '@/components/Form/src/components/autofill-trap-form';

import { space } from '@/theme/space';
import mq from '@/theme/media-queries';

import FormSection from './FormSection';

import EMAIL_FIELD from '../../../../../config/form/email-field';
import fieldsInfo from '../../../../../config/form/inquiry-form-fields';

const OTHER_FIELD = 'other';

const styleSections = {
  display: 'grid',
  gridGap: space[8],
};

const styleFooter = {
  display: 'flex',
  flexDirection: 'column',
  [mq.lg]: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const styleButton = {
  marginTop: space[4],
};

const PrivacyLabel = () => {
  const { t } = useTranslation();
  /*
  return (
    <React.Fragment>
      {`${t('if.privacy.agree_with')} `}
      <Link to="/privacy">{t('if.privacy.policy')}</Link>
    </React.Fragment>
  );
  */
  return t('if.agree');
};

const Form = ({ onSubmit }) => {
  const { t } = useTranslation();

  const SUBJECT = t('if.subject.title');
  const OTHER = t('if.other');

  const MESSAGE = t('if.message.title');

  const NAME = t('if.name');
  const POSITION = t('if.position');
  const COMPANY = t('if.company');
  const PHONE = t('if.phone');
  const EMAIL = 'E-mail';

  const validateEmail = (x) => (fieldsInfo[EMAIL_FIELD].validate(x) ? '' : t('validation.invalid', { name: EMAIL }));

  const validationSchema = {
    email: {},
    privacy: {
      required: t('validation.required', {
        name: `${t('if.privacy.agree_with')} ${t('if.privacy.policy')}`,
      }),
    },

    subject: {
      required: t('validation.required', { name: SUBJECT }),
      maxLength: {
        value: fieldsInfo.subject.maxLength,
        message: t('validation.maxLength', {
          name: SUBJECT,
          max: fieldsInfo.subject.maxLength,
        }),
      },
    },

    [OTHER_FIELD]: {
      required: t('validation.required', { name: SUBJECT }),
      maxLength: {
        value: fieldsInfo.subject.maxLength,
        message: t('validation.maxLength', {
          name: SUBJECT,
          max: fieldsInfo.subject.maxLength,
        }),
      },
    },

    message: {
      maxLength: {
        value: fieldsInfo.message.maxLength,
        message: t('validation.maxLength', {
          name: MESSAGE,
          max: fieldsInfo.message.maxLength,
        }),
      },
    },

    name: {
      required: t('validation.required', { name: NAME }),
      maxLength: {
        value: fieldsInfo.name.maxLength,
        message: t('validation.maxLength', {
          name: NAME,
          max: fieldsInfo.name.maxLength,
        }),
      },
      minLength: {
        value: fieldsInfo.name.minLength,
        message: t('validation.minLength', {
          name: NAME,
          min: fieldsInfo.name.minLength,
        }),
      },
      pattern: {
        value: fieldsInfo.name.pattern,
        message: t('validation.only_symbols'),
      },
    },

    position: {
      maxLength: {
        value: fieldsInfo.position.maxLength,
        message: t('validation.maxLength', {
          name: POSITION,
          max: fieldsInfo.position.maxLength,
        }),
      },
    },

    company: {
      maxLength: {
        value: fieldsInfo.company.maxLength,
        message: t('validation.maxLength', {
          name: COMPANY,
          max: fieldsInfo.company.maxLength,
        }),
      },
    },

    phone: {
      required: t('validation.required', { name: PHONE }),
      maxLength: {
        value: fieldsInfo.phone.maxLength,
        message: t('validation.maxLength', {
          name: PHONE,
          max: fieldsInfo.phone.maxLength,
        }),
      },
      minLength: {
        value: fieldsInfo.phone.minLength,
        message: t('validation.minLength', {
          name: PHONE,
          min: fieldsInfo.phone.minLength,
        }),
      },
      pattern: {
        value: fieldsInfo.phone.pattern,
        message: t('validation.only_digits'),
      },
    },

    [EMAIL_FIELD]: {
      maxLength: {
        value: fieldsInfo[EMAIL_FIELD].maxLength,
        message: t('validation.maxLength', {
          name: EMAIL,
          max: fieldsInfo[EMAIL_FIELD].maxLength,
        }),
      },
      minLength: {
        value: fieldsInfo[EMAIL_FIELD].minLength,
        message: t('validation.minLength', {
          name: EMAIL,
          min: fieldsInfo[EMAIL_FIELD].minLength,
        }),
      },
      validate: validateEmail,
    },
  };

  const { setFieldValue, values, errors, handleOnChange, handleOnSubmit /* , disable */ } = useForm(validationSchema, onSubmit);

  const hasErrors = () => Object.keys(errors).some((key) => errors[key]);

  const serviceItems = useServiceItems().map(({ title }) => title);
  serviceItems.push(OTHER);
  serviceItems.unshift('');

  const isOtherItemSelected = (value) => value === OTHER;
  const onSubjectChange = (e) => {
    handleOnChange(e);
    setFieldValue(OTHER_FIELD, isOtherItemSelected(e.target.value) ? '' : e.target.value);
  };

  return (
    <React.Fragment>
      <AutofillTrapForm />

      <form onSubmit={handleOnSubmit} noValidate>
        <HoneyPotInput value={values.email} onChange={handleOnChange} />
        <div css={styleSections}>
          <FormSection title={t('if.subject.title')} description={t('if.subject.description')}>
            <ValueSelectControl
              name="subject"
              items={serviceItems}
              required
              value={values.subject}
              error={errors.subject}
              onChange={onSubjectChange}
            />
            {/* TODO: style instead of css */}
            <div style={{ display: isOtherItemSelected(values.subject) ? 'block' : 'none' }}>
              <InputControl
                label={OTHER}
                name={OTHER_FIELD}
                required
                value={values[OTHER_FIELD]}
                error={errors[OTHER_FIELD]}
                onChange={handleOnChange}
              />
            </div>
          </FormSection>

          <FormSection title={t('if.message.title')} description={t('if.message.description')}>
            <TextAreaControl name="message" value={values.message} error={errors.message} onChange={handleOnChange} />
          </FormSection>

          <FormSection title={t('if.vc.title')} description={t('if.vc.description')}>
            <BoxedInputControl label={NAME} name="name" required value={values.name} error={errors.name} onChange={handleOnChange} />
            <BoxedInputControl label={POSITION} name="position" value={values.position} error={errors.position} onChange={handleOnChange} />
            <BoxedInputControl label={COMPANY} name="company" value={values.company} error={errors.company} onChange={handleOnChange} />
            <BoxedInputControl
              label={PHONE}
              name="phone"
              type="phone"
              required
              value={values.phone}
              error={errors.phone}
              onChange={handleOnChange}
            />
            <BoxedInputControl
              label={EMAIL}
              name={EMAIL_FIELD}
              type="email"
              value={values[EMAIL_FIELD]}
              error={errors[EMAIL_FIELD]}
              onChange={handleOnChange}
            />
          </FormSection>
          <div css={styleFooter}>
            <CheckBoxControl
              label={<PrivacyLabel />}
              name="privacy"
              required
              value={values.privacy}
              error={errors.privacy}
              onChange={handleOnChange}
            />
            <Button type="submit" overrideCSS={styleButton}>
              {t('form.send')}
            </Button>
            {hasErrors() && <FormErrorMessage>{t('form.has_input_errors')}</FormErrorMessage>}
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Form;
