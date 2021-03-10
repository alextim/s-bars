/** @jsx jsx */
import { jsx } from '@emotion/react';
// import React from 'react';

import { useTranslation } from '../../i18n';
import useForm from '../Form/src/hooks/useForm';
import useServiceItems from '../../hooks/useServiceItems';

// import Link from '../LocalizedLink';
import Button from '../Button';
import { InputControl, TextAreaControl, HoneyPotInput } from '../Form/src/components/form-controls';
import ValueSelectControl from '../Form/src/components/form-controls/ValueSelectControl';
import CheckBoxControl from '../Form/src/components/form-controls/CheckBoxControl';
import BoxedInputControl from '../Form/src/components/form-controls/BoxedInputControl';
import FormErrorMessage from '../Form/src/components/form-controls/FormErrorMessage';

import FormSection from './FormSection';

import EMAIL_FIELD from '../../lib/form/email-field';
import fieldsInfo from '../../lib/form/inquiry-form-fields';

const OTHER_FIELD = 'other';

const styleSections = (t) => ({
  display: 'grid',
  gridGap: t.space[8],
});

const styleFooter = (t) => ({
  [t.mq.lg]: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
  },
});
const styleFooterInner = (t) => ({
  display: 'flex',
  flexDirection: 'column',
  [t.mq.lg]: {
    gridColumn: 2,
    marginLeft: t.space[4],
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const styleButton = (t) => ({
  marginTop: t.space[4],
});

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

  const validateEmail = (x) =>
    fieldsInfo[EMAIL_FIELD].validate(x) ? '' : t('validation.invalid', { name: EMAIL });

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

  const { setFieldValue, values, errors, handleOnChange, handleOnSubmit /* , disable */ } = useForm(
    validationSchema,
    onSubmit,
  );

  const hasErrors = () => {
    return Object.keys(errors).some((key) => errors[key]);
  };

  const serviceItems = useServiceItems().map(({ title }) => title);
  serviceItems.push(OTHER);
  serviceItems.unshift('');

  const isOtherItemSelected = (value) => value === OTHER;
  const onSubjectChange = (e) => {
    handleOnChange(e);
    setFieldValue(OTHER_FIELD, isOtherItemSelected(e.target.value) ? '' : e.target.value);
  };

  return (
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
          <div css={{ display: isOtherItemSelected(values.subject) ? 'block' : 'none' }}>
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
          <TextAreaControl
            name="message"
            value={values.message}
            error={errors.message}
            onChange={handleOnChange}
          />
        </FormSection>

        <FormSection title={t('if.vc.title')} description={t('if.vc.description')}>
          <BoxedInputControl
            label={NAME}
            name="name"
            required
            value={values.name}
            error={errors.name}
            onChange={handleOnChange}
          />
          <BoxedInputControl
            label={POSITION}
            name="position"
            value={values.position}
            error={errors.position}
            onChange={handleOnChange}
          />
          <BoxedInputControl
            label={COMPANY}
            name="company"
            value={values.company}
            error={errors.company}
            onChange={handleOnChange}
          />
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
          <div css={styleFooterInner}>
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
      </div>
    </form>
  );
};

export default Form;
