import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import DynamicForm from '../DynamicForm/DynamicForm.style';
import FormContainer from './FormContainer/FormContainer';
import { generateFormSchema, generateInitialValues } from '../DynamicForm/DynamicFormService';
import { callMainAPI, RestAPIException } from '../../Utils/api-service';
import { generateRoutePath } from '../../Utils/common';
import { IMetadataAction, IMetadataRowActionChild } from '../../Types/Metadata';
import { IResourceChildProps } from '../../Pages/Resource/Resource';

interface IFormProps extends IResourceChildProps {
  editData?: Record<string, any>;
  action?: IMetadataAction | IMetadataRowActionChild;
  className?: string;
}

export function FormBase({
  resource, metadata, editData, action, className,
}: IFormProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const isEditing = !!editData;
  const formAction = action ?? location.state ? location.state as IMetadataAction | IMetadataAction : undefined;

  const onSubmit = async (values: Record<string, any>): Promise<void> => {
    try {
      setLoading(true);

      await callMainAPI(formAction?.endpoint ?? metadata.endpoint, values);
      if (!isEditing) {
        navigate(generateRoutePath(resource._id, `/explore/${metadata._id}`, undefined, '../../'), { replace: true });
        return;
      }
    } catch (err) {
      if (err instanceof RestAPIException) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const onCancel = (): void => {
    navigate(generateRoutePath(resource._id, `/explore/${metadata._id}`, undefined, '../../'), { replace: true });
  };

  const initialValues = generateInitialValues(isEditing ? metadata.fields : metadata.fields.filter((f) => !metadata.keyFields.includes(f._id)), editData);
  const validationSchema = generateFormSchema(metadata.fields.filter((f) => !metadata.keyFields.includes(f._id)));

  return (
    <div id="form-page" className={className}>
      <FormContainer
        loading={loading}
        initialValues={initialValues}
        formValidationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <div className="form-header">
          <div className="form-header-title">
            {isEditing ? 'Edit ' : 'Create'}
            {' '}
            {metadata.label.singular}
          </div>
          <div className="form-action">
            <Button type="submit" variant="success" className="fw-bold">Save</Button>
            <Button variant="secondary" className="fw-bold ms-2" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
        <DynamicForm metadata={metadata} isEditing={isEditing} />
      </FormContainer>
    </div>

  );
}
