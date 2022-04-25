import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default (experienceArray) => {

  const getExperienceBlock = ({personId,startDate,endDate,organization,role,rate,comment}) => {
    return (
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>{organization}-{role}</TimelineContent>
      </TimelineItem>
    )
  }

  const expItems = experienceArray.map(exp => getExperienceBlock(exp));

  return (
    <Timeline>
     {expItems}
    </Timeline>
  );
}
