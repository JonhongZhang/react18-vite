import { formConfig } from 'components/config/formDefinition';
import { DynamicForm } from 'components/form/dynamicForm'
import {submitFormData} from "../utils/formUtils";
import {message} from "antd";
import {FormikHelpers} from "formik";

const initialValues = {
    username: '',
    age: '',
    email: '',
    password: '',
    gender: '',
    hobbies: [],
    country: '',
};

// const handleSubmit = (values: Record<string, any>) => {
//     console.log(values);
// };

const handleSubmit = async (values: Record<string, any>, { setSubmitting }: FormikHelpers<Record<string, any>>) => {
    try {
        // 在这里进行表单数据提交，比如调用API等等
        await submitFormData(values);
        message.success('表单提交成功！');
    } catch (error) {
        message.error('表单提交失败！');
    } finally {
        setSubmitting(false);
    }
}


function FormPage() {
    return (
        <div>
            <h1>My Form page</h1>
            <DynamicForm config={formConfig} initialValues={initialValues} onSubmit={ handleSubmit } />;
        </div>
    )
}
