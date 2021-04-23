import React, { memo } from 'react';
import { useField } from 'formo';

export const Test = memo(() => {
  const [field] = useField('duc');
  console.log('render duc');
  return (
    <div>
      {field.value}
      <input {...field} />
    </div>
  );
});

export const Test2 = memo(() => {
  const [field] = useField('duc2');
  const [field3] = useField('duc3');
  const [field4] = useField('duc4');
  const [field5] = useField('duc5');
  console.log('render duc2345');
  return (
    <div>
      {field.value}
      <input {...field} />
      <input {...field3} />
      <input {...field4} />
      <input {...field5} />
    </div>
  );
});
export const Test3 = memo(() => {
  const [field5] = useField('duc5');
  console.log('render duc3');
  return (
    <div>
      <input {...field5} />
    </div>
  );
});
