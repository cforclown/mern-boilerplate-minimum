import DataDetails from '@/components/data-details/DataDetails';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { schedulesFields } from './Schedules.metadata';
import { getAPIEndpoint } from '@/utils/call-api';
import { useCallback } from 'react';
import DashboardContentWrapper from '@/components/wrappers/DashboardContentWrapper';

function ScheduleDetails() {
  const { id: scheduleId } = useParams();
  const navigate = useNavigate();
  const endpoint = getAPIEndpoint('/schedules/' + scheduleId);

  const onEditClick = useCallback(() => navigate('/schedules/form/' + scheduleId), [scheduleId]);

  if (!scheduleId) {
    return (
      <Navigate to="/schedules" />
    );
  }

  return (
    <DashboardContentWrapper>
      <DataDetails
        title="Schedule"
        endpoint={endpoint}
        fields={schedulesFields}
        onEditClick={onEditClick}
      />
    </DashboardContentWrapper>
  );
}

export default ScheduleDetails;  
