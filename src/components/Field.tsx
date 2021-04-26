import React, { ComponentType, InputHTMLAttributes, ReactElement } from 'react';
import { FieldValue, Helper } from '../types/form';
import { useField } from '../hook/useField';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  component?: ComponentType<InputHTMLAttributes<HTMLInputElement> & any>;
  children?: (field: FieldValue, helper: Helper) => ReactElement;
  render?: (field: FieldValue, helper: Helper) => ReactElement;
}

export function Field({
  component,
  name,
  children,
  render,
  ...other
}: Props): ReactElement {
  const [field, helper] = useField(name);
  if (component) {
    const C = component;
    return <C {...field} {...other} />;
  }

  const renderProps = render || children;

  if (renderProps) {
    return renderProps(field, helper);
  }

  return <input {...field} {...other} />;
}
