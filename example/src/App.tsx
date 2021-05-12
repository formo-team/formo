import React, { FC, useCallback, useState } from 'react';
import { Formo, Form, Field } from 'formo-form';
import { Test, Test2, Test3, Test5, Test6 } from './Test';
import { FormError } from '../../src';

const Submit: FC = () => {
  return <button type={'submit'}>Submit</button>;
};

interface Form {
  duc: string;
  duc2: string;
  duc3: string;
  duc4: string;
  duc5: string;
}

const App = () => {
  const [initialValue, setInitialValues] = useState({
    duc: '',
    duc2: '',
    duc3: '',
    duc4: '',
    duc5: '',
  });

  const changeForm = useCallback(() => {
    setInitialValues({
      duc: Math.random().toString(),
      duc2: Math.random().toString(),
      duc3: Math.random().toString(),
      duc4: Math.random().toString(),
      duc5: Math.random().toString(),
    });
  }, []);

  console.log('RENDER FORM');

  const validation = useCallback((values: Form): Partial<FormError<Form>> => {
    const errors: Partial<FormError<Form>> = {};
    if (values.duc.length < 5) {
      errors.duc = 'Duc loi roi';
    }
    return errors;
  }, []);

  return (
    <Formo
      initialValue={initialValue}
      onSubmit={console.log}
      enableReinitialize
      validation={validation}
    >
      <Form>
        <Test />
        <Test2 />
        <Test3 />
        <Test5 />
        <Test6 />
        <Submit />
        <Field name={'duc'} />
        <button type={'button'} onClick={changeForm}>
          Change form initial values
        </button>
        <button type={'reset'}>RESET</button>
      </Form>
    </Formo>
  );
};

export default App;
