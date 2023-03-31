import {Button, Form, Input, TextArea} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormComponent = ({ formDefinition }) => {
    const initialValues = {};
    const validationSchema = {};

    formDefinition.fields.forEach(field => {
        initialValues[field.name] = '';
        validationSchema[field.name] = Yup.string();

        if (field.required) {
            validationSchema[field.name] = validationSchema[field.name].required(`${field.label} is required`);
        }

        if (field.validation) {
            Object.keys(field.validation).forEach(key => {
                if (key === 'max') {
                    validationSchema[field.name] = validationSchema[field.name].max(field.validation[key], `${field.label} must be less than ${field.validation[key]} characters`);
                } else {
                    validationSchema[field.name] = validationSchema[field.name][key](`${field.label} is invalid`);
                }
            });
        }

        switch (field.type) {
            case 'text':
            case 'email':
                initialValues[field.name] = '';
                break;
            case 'textarea':
                initialValues[field.name] = '';
                break;
            // ...
        }
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <Form
            onFinish={formik.handleSubmit}
            layout="vertical"
        >
            {formDefinition.fields.map(field => (
                <Form.Item
                    key={field.name}
                    label={field.label}
                    required={field.required}
                    validateStatus={formik.errors[field.name] ? 'error' : ''}
                    help={formik.errors[field.name]}
                >
                    {(() => {
                        switch (field.type) {
                            case 'text':
                            case 'email':
                                return (
                                    <Input
                                        name={field.name}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                );
                            case 'textarea':
                                return (
                                    <TextArea
                                        name={field.name}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                );
                            // ...
                        }
                    })()}
                </Form.Item>
            ))}
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form>);
};
