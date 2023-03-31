import React from 'react';
import { Form, Button } from 'antd';
import {Formik, FormikProps, Form as FormikForm, FormikHelpers} from 'formik';
import * as Yup from 'yup';

interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'radio' | 'checkbox';
    options?: { label: string; value: any }[];
    validation?: Yup.StringSchema<string> | Yup.NumberSchema<number>;

    // name: string;
    //     // type: string;
    //     // label: string;
    initialValue?: any;
    // validationSchema?: Yup.SchemaOf<any>;
    render?: (props: any) => JSX.Element;
}

export interface FormConfig {
    fields: FormField[];
    // initialValues: Record<string, any>;
    // onSubmit: (values: Record<string, any>) => void;
}

interface DynamicFormProps {
    config: FormConfig;
    initialValues: Record<string, any>;
    onSubmit: (values: Record<string, any>, { setSubmitting }: FormikHelpers<Record<string, any>>) => Promise<void>;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ config, initialValues, onSubmit }) => {

    const validationSchema = Yup.object().shape(
        Object.fromEntries(
            config.fields.map((field) => [
                field.name,
                field.validation ? field.validation : Yup.string(),
            ])
        )
    );

    const generateFormItem = (field: FormField) => {
        switch (field.type) {
            case 'text':
            case 'number':
            case 'email':
            case 'password':
                return (
                    <Form.Item label={field.label} name={field.name} key={field.name}>
                        <input type={field.type} className="ant-input"/>
                    </Form.Item>
                );
            case 'select':
                return (
                    <Form.Item label={field.label} name={field.name} key={field.name}>
                        <select className="ant-select">
                            {field.options?.map((option) => (
                                <option value={option.value} key={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </Form.Item>
                );
            case 'radio':
                return (
                    <Form.Item label={field.label} name={field.name} key={field.name}>
                        {field.options?.map((option) => (
                            <Form.Item name={field.name} key={option.value}>
                                <label>
                                    <input type="radio" value={option.value}/>
                                    <span className="ant-form-item-label">{option.label}</span>
                                </label>
                            </Form.Item>
                        ))}
                    </Form.Item>
                );
            case 'checkbox':
                return (
                    <Form.Item label={field.label} name={field.name} key={field.name}>
                        {field.options?.map((option) => (
                            <Form.Item name={field.name} key={option.value}>
                                <label>
                                    <input type="checkbox" value={option.value}/>
                                    <span className="ant-form-item-label">{option.label}</span>
                                </label>
                            </Form.Item>
                        ))}
                    </Form.Item>
                );
            default:
                return null;
        }
    };

    return (
        // <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        //     {(props: FormikProps<Record<string, any>>) => (
        //         <Form onSubmit={props.handleSubmit}>
        //             {config.fields.map((field) => generateFormItem(field))}
        //             <Button htmlType="submit">Submit</Button>
        //         </Form>
        //     )}
        // </Formik>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(props: FormikProps<Record<string, any>>) => (
                <FormikForm>
                    {config.fields.map((field) => generateFormItem(field))}
                    <Button htmlType="submit">Submit</Button>
                </FormikForm>
            )}
        </Formik>
    );
};

