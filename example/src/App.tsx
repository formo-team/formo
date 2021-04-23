import React, { FC, useCallback, useState } from 'react';
import { Formo, Form, Field } from 'formo';
import { Test, Test2, Test3 } from './Test';
import 'formo/dist/index.css';

const Submit: FC = () => {
  return <button type={'submit'}>Submit</button>;
};

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

  return (
    <Formo
      initialValue={initialValue}
      onSubmit={console.log}
      enableReinitialize
    >
      <Form>
        <Test />
        <Test2 />
        <Test3 />
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
