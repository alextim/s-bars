/** @jsx jsx */
import { jsx } from '@emotion/react';

/**
 *
 *  https://gist.github.com/niksumeiko/360164708c3b326bd1c8
 */

const AutofillTrapForm = () => (
  <form id="head-form" name="head-form">
    <input
      type="email"
      tabIndex="-1"
      css={{ height: 0, width: 0, opacity: 0, border: 0, padding: 0 }}
    />
  </form>
);

export default AutofillTrapForm;
