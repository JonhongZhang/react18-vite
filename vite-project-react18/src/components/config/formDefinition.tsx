import { FormConfig } from 'components/form/dynamicForm';
import * as Yup from 'yup';
export const formConfig: FormConfig = {
    fields: [
        {
            name: 'username',
            label: 'Username',
            type: 'text',
            validation: Yup.string().required('Username is required'),
        },
        {
            name: 'age',
            label: 'Age',
            type: 'number',
            validation: Yup.number().required('Age is required').positive('Age must be positive'),
        },
        {
            name: 'email',
            label: 'Email',
            type: 'email',
            validation: Yup.string().required('Email is required').email('Invalid email address'),
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            validation: Yup.string().required('Password is required'),
        },
        {
            name: 'gender',
            label: 'Gender',
            type: 'radio',
            options: [
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' },
            ],
            validation: Yup.string().required('Gender is required'),
        },
        {
            name: 'hobbies',
            label: 'Hobbies',
            type: 'checkbox',
            options: [
                { label: 'Reading', value: 'reading' },
                { label: 'Swimming', value: 'swimming' },
                { label: 'Running', value: 'running' },
            ],
        },
        {
            name: 'country',
            label: 'Country',
            type: 'select',
            options: [
                { label: 'China', value: 'CN' },
                { label: 'United States', value: 'US' },
                { label: 'Japan', value: 'JP' },
            ],
            validation: Yup.string().required('Country is required'),
        },
    ],

};
