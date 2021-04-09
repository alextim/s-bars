/*
import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect } from '@jest/globals';
import useForm from './useForm';

const mockCallback = () => true;

describe('useForm', () => {
  describe('smoke tests', () => {
    it('should be a function', () => {
      expect(typeof useForm).toBe('function');
    });

    it('should require the `validationSchema` option', () => {
      renderHook(() => {
        expect(() => {
          useForm({});
        }).toThrow('the option `validationSchema` is required');
      });
    });

    it('should require the validationSchema option to be an object', () => {
      renderHook(() => {
        expect(() => useForm(true)).toThrow('the option `validationSchema` should be an object');
      });
    });

    it('should require the callback option', () => {
      renderHook(() => {
        expect(() => useForm({ name: {} })).toThrow('the option `callback` is required');
      });
    });

    it('should require the callback option to be a function', () => {
      renderHook(() => {
        expect(() => useForm({ name: {} }, true)).toThrow(
          'the option `callback` should be an function',
        );
      });
    });

    it('should require the defaultValues option to be an object', () => {
      renderHook(() => {
        expect(() => useForm({ name: {} }, mockCallback, true)).toThrow(
          'the option `defaultValues` should be an object',
        );
      });
    });

    it('should expect the options `validationSchema` and `defaultValues` have equal length', () => {
      renderHook(() => {
        expect(() => useForm({ name: {} }, mockCallback, { name: '', email: '' })).toThrow(
          'the options `validationSchema` and `defaultValues` should have equal length',
        );
      });
    });

    it('should expect the options `validationSchema` and `defaultValues` have the same keys', () => {
      renderHook(() => {
        expect(() =>
          useForm({ name: {}, message: {} }, mockCallback, { name: '', email: '' }),
        ).toThrow('the options `validationSchema` and `defaultValues` should have equal length');
      });
    });
  });

  describe('validateField', () => {
    describe('required', () => {
      it("should return '' (means VALID) for field without validation", () => {
        const { result } = renderHook(() =>
          useForm(
            {
              firstName: {},
            },
            mockCallback,
          ),
        );
        expect(result.current.validateField('firstName', '')).toBe('');
      });
    });

    describe('required', () => {
      it("should return a default error message for fields that don't have a value", () => {
        const { result } = renderHook(() =>
          useForm(
            {
              name: {
                required: true,
              },
            },
            mockCallback,
          ),
        );

        expect(result.current.validateField('name', '')).toBe('required');
      });

      it('should return a custom error message', () => {
        const { result } = renderHook(() =>
          useForm(
            {
              name: {
                required: 'the field "name" is required',
              },
            },
            mockCallback,
          ),
        );

        expect(result.current.validateField('name', '')).toBe('the field "name" is required');
      });
    });

    describe('pattern', () => {
      it('should return an error message if the value does not satisfy the pattern', () => {
        const { result } = renderHook(() =>
          useForm(
            {
              email: {
                pattern: {
                  value: /\w+@\w+\.com/gi,
                },
              },
            },
            mockCallback,
          ),
        );

        expect(result.current.validateField('email', 'a@a')).toBe('invalid');
      });

      it('should return an custom error message if the message attribute exists', () => {
        const { result } = renderHook(() =>
          useForm(
            {
              email: {
                pattern: {
                  value: /\w+@\w+\.com/gi,
                  message: 'Invalid e-mail',
                },
              },
            },
            mockCallback,
          ),
        );

        expect(result.current.validateField('email', 'a@a')).toBe('Invalid e-mail');
      });
    });

    describe('validate', () => {
      let validateMock;
      let hook;

      beforeEach(() => {
        validateMock = jest.fn((value) => {
          if (Number(value) < 18) {
            return 'You are not able to get a drive permission';
          }

          return '';
        });

        const { result } = renderHook(() =>
          useForm(
            {
              age: {
                validate: validateMock,
              },
            },
            mockCallback,
          ),
        );

        hook = result.current;
      });

      it('should execute the validate function passing the field value', () => {
        hook.validateField('age', '10');

        expect(validateMock).toHaveBeenCalledWith('10');
      });

      it('should be executed and return a string', () => {
        hook.validateField('age', '10');

        expect(validateMock).toHaveBeenCalled();
        expect(typeof validateMock.mock.results[0].value).toBe('string');
      });

      it('should return an error message', () => {
        hook.validateField('age', '10');

        expect(validateMock.mock.results[0].value).toBe(
          'You are not able to get a drive permission',
        );
      });

      it('should return an empty string when value is valid', () => {
        hook.validateField('age', '20');

        expect(validateMock.mock.results[0].value).toBe('');
      });
    });
  });
});
*/
