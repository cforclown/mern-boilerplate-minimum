import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAPIEndpoint } from '@/utils/call-api';
import EditForm from '@/components/create-edit-form/EditForm';
import CreateForm from '@/components/create-edit-form/CreateForm';
import { createSchedule, updateSchedule } from './Schedules.service';
import { schedulesFields } from './Schedules.metadata';
import DashboardContentWrapper from '../../../../components/wrappers/DashboardContentWrapper';
import withCommonState, { IWithCommonStateProps } from '@/components/HOC/withCommonState';

interface IScheduleForm extends IWithCommonStateProps {}

function ScheduleForm({ navigate }: IScheduleForm): JSX.Element {
  const { id } = useParams();
  
  const onSubmitData = async (data: Record<string, any>) => {
    const payload = id ? { id, _id: id, ...data } : data;
    await (id ? updateSchedule : createSchedule)(payload as any);

    toast.success(`Schedule ${data.name} ${id ? 'updated' : 'created'} successfully!`);
    navigate('/schedules');
  };

  return (
    <DashboardContentWrapper>
      {id ? (
        <EditForm
          getInitialDataEndpoint={getAPIEndpoint(`/schedules/${id}`)}
          fields={schedulesFields}
          onSubmitData={onSubmitData}
        />
      ) : (
        <CreateForm
          fields={schedulesFields}
          onSubmitData={onSubmitData}
        />
      )}
    </DashboardContentWrapper>
  );
}

export default withCommonState(ScheduleForm);
