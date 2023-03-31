import { Input, InputNumber, Form } from 'antd';
import * as Yup from 'yup';

interface FormField {
    name: string;
    type: string;
    label: string;
    initialValue?: any;
    validation?: [];
    render?: (props: any) => JSX.Element;
}

export const generateFormItem = (field: FormField) => {
    const { name, type, label, initialValue, validation, render } = field;
    const FieldComponent = render || (type === 'number' ? InputNumber : Input);

    return (
        <Form.Item key={name} name={name} label={label} initialValue={initialValue} rules={validation}>
            <FieldComponent name={name} type={type} />
        </Form.Item>
    );
};
