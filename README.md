# formo-form

> Build controlled form without rerender the whole form

[![NPM](https://img.shields.io/npm/v/formo.svg)](https://www.npmjs.com/package/formo-form) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save formo-form
```

## Usage

```tsx
import React, { Component } from 'react'
import { Formo, Form, Field } from 'formo-form';
import MyComponent from 'formo'
import 'formo/dist/index.css'

const initialValue = {
  duc: ''
}

class Example extends Component {
  render() {
    return (
      <Formo
        initialValue={initialValue}
        onSubmit={console.log}
        enableReinitialize
      >
        <Form>
          <Field name={'duc'} />
          <button type={'submit'}>Submit</button>
          <button type={'reset'}>RESET</button>
        </Form>
      </Formo>
    )
  }
}
```

## Roadmap

### 1.0
- Support fully API for building and validating form
- Integrate with yup for validation
- Add Unit Test

### Future
- Support for react-native
- Optimize performance

## License

MIT © [somibuon](https://github.com/somibuon)
