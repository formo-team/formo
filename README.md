# formo

> Form management

[![NPM](https://img.shields.io/npm/v/formo.svg)](https://www.npmjs.com/package/formo) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save formo
```

## Usage

```tsx
import React, { Component } from 'react'

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

## License

MIT © [somibuon](https://github.com/somibuon)
