import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, Field } from '@cezembre/forms';
import { JSXElementConstructor } from 'react';
import Select, { SelectOption } from '../../src/forms/select';

interface Props {
  label?: string;
}

export default {
  title: 'Fields/Select',
  component: Select,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
    },
  },
} as ComponentMeta<JSXElementConstructor<Props>>;

const options: SelectOption[] = [
  {
    value: 'Toto',
  },
  {
    value: 'Titi',
  },
  {
    value: 'Tata',
  },
];

const Template: ComponentStory<JSXElementConstructor<Props>> = ({ label }: Props) => (
  <Form>
    <Field name="select" component={Select} label={label} options={options} />
  </Form>
);

export const Default = Template.bind({});

Default.args = {};
