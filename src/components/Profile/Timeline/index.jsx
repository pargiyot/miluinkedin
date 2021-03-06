import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Tooltip from "@mui/material/Tooltip";

export default ({ experienceArray }) => {
  const getExperienceBlock = ({
    personId,
    startDate,
    endDate,
    company,
    role,
    isMiluim,
    rate,
    comment,
  }) => {
    return (
      <TimelineItem>
        <TimelineOppositeContent
          sx={{ m: "auto 0" }}
          align="right"
          variant="body2"
          color="text.secondary"
        >
          {startDate} - {endDate}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color={isMiluim ? "success" : "primary"} />
          <TimelineConnector />
        </TimelineSeparator>
        <Tooltip title={isMiluim ? `${rate} starts, ${comment}` : ""}>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <Typography variant="h6" component="span">
              {role}
            </Typography>
            <Typography>{company}</Typography>
          </TimelineContent>
        </Tooltip>
      </TimelineItem>
    );
  };

  const loadTimeLinesItems = () => {
    if (experienceArray) {
      return experienceArray.map((exp) => getExperienceBlock(exp));
    }
  };

  return <Timeline>{loadTimeLinesItems()}</Timeline>;
};
