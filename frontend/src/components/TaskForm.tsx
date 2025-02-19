import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ITask } from '../interfaces/ITask';
import { useAppDispatch } from '../app/hooks';
import { createTask } from '../features/tasks/taskSlice';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

export const TaskForm = () => {
  const dispatch = useAppDispatch();

  const initialValues: ITask = {
    title: '',
    description: '',
  };

  const handleSubmit = async (
    values: ITask, 
    { resetForm, setSubmitting, setErrors }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: { [key: string]: string }) => void }
  ) => {
    try {
      await dispatch(createTask(values)).unwrap();
      resetForm();
    } catch (error) {
      setErrors({ submit: `Failed to create task. ${error}` });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          {errors && (
            <div className="text-red-500 mb-4">{errors.title}</div>
          )}
          
          <div>
            <Field
              name="title"
              className="w-full p-2 border rounded"
              placeholder="Task title"
            />
            {errors.title && touched.title && (
              <div className="text-red-500">{errors.title}</div>
            )}
          </div>

          <div>
            <Field
              as="textarea"
              name="description"
              className="w-full p-2 border rounded"
              placeholder="Task description"
            />
            {errors.description && touched.description && (
              <div className="text-red-500">{errors.description}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </Form>
      )}
    </Formik>
  );
};