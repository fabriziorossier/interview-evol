import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ITask } from '../interfaces/ITask';
import { useAppDispatch } from '../app/hooks';
import { createTask } from '../features/tasks/taskSlice';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  dueDate: Yup.date().required('Due Date is required'),
  completed: Yup.boolean().default(false),
});

export const TaskForm = () => {
  const dispatch = useAppDispatch();

  const initialValues: ITask = {
    title: '',
    description: '',
    completed: false,
    dueDate: new Date(),
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
      {({ errors, touched, isSubmitting, values, setFieldValue }) => (
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <Field
              type="datetime-local"
              name="dueDate"
              className="w-full p-2 border rounded"
              value={values.dueDate ? new Date(values.dueDate).toISOString().slice(0, 16) : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue('dueDate', new Date(e.target.value));
              }}
            />
            {errors.dueDate && touched.dueDate && (
              <div className="text-red-500">{'Due Date is required'}</div>
            )}
          </div>

          <div className="flex items-center">
            <Field
              type="checkbox"
              name="completed"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              Mark as completed
            </label>
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