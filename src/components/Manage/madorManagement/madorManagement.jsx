import { useQuery } from "@apollo/client";
import {
  getMyMadorReservists,
  getMyMadorMembers,
  getMyMadorManagers,
} from "../../../api";
import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/user.context";

const MadorManagement = () => {
  const navigate = useNavigate();
  const [userData] = useContext(UserContext);
  const madorReservists = useQuery(getMyMadorReservists);
  const madorMembers = useQuery(getMyMadorMembers);
  const madorManagers = useQuery(getMyMadorManagers, {
    variables: {
      manager_id: userData.user_id,
    },
  });

  const reservistsList = madorReservists.data
    ? madorReservists.data.mador_reservists
    : [];
  const memberList = madorMembers.data ? madorMembers.data.mador_members : [];
  const managerList = madorManagers.data
    ? madorManagers.data.mador_managers
    : [];
  console.log("managerList", managerList);
  const handleClick = (e) => {
    navigate(`/profile/${e.currentTarget.id}`);
  };

  return (
    <Grid container justifyContent={"space-around"}>
      <Grid item>
        <Typography variant="h4">אנשי המילואים שלנו</Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {reservistsList.length ? (
            reservistsList.map((p1) => {
              const p = p1.reservist;
              const skillsInfo = p.skills;
              const tagsInfo = p.tags;

              const firstSkills = skillsInfo.slice(0, 3);
              const moreSkillsCount = skillsInfo.length - 3;

              return (
                <ListItem
                  key={p.id}
                  alignItems="flex-start"
                  id={p.id}
                  onClick={handleClick}
                  style={{ cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <Avatar alt={`${p.name}-img`} src={p.image_url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={p.name}
                    secondary={
                      <Grid container direction="column">
                        <Grid item>
                          {_.join(
                            firstSkills.map((skill) => skill.name),
                            ", "
                          )}
                          {moreSkillsCount > 0
                            ? " And " + moreSkillsCount + " More"
                            : ""}
                        </Grid>

                        <Grid item>
                          {tagsInfo.map((tag) => (
                            <Chip
                              style={{ marginLeft: "5px", marginTop: "5px" }}
                              size="small"
                              label={tag.name}
                              className="chip"
                            />
                          ))}
                        </Grid>
                      </Grid>
                    }
                  />
                </ListItem>
              );
            })
          ) : (
            <ListItem alignItems="flex-start" dir="ltr">
              לא נמצאו אנשי מילואים משוייכים למדור
            </ListItem>
          )}
        </List>
      </Grid>
      {userData.roles.includes("mador_manager") && (
        <Grid item>
          <Typography variant="h4">מנהלי המדור</Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {managerList.length !== 0 ? (
              managerList.map((managerObj) => {
                const manager = managerObj.mador_manager_user;
                return (
                  <ListItem key={manager.id}>
                    <ListItemText
                      primary={manager.name}
                      secondary={manager.email}
                    ></ListItemText>
                  </ListItem>
                );
              })
            ) : (
              <ListItem alignItems="flex-start" dir="ltr">
                לא נמצאו מנהלי מדור נוספים
              </ListItem>
            )}
          </List>
        </Grid>
      )}
      {userData.roles.includes("mador_manager") && (
        <Grid item>
          <Typography variant="h4">חברי המדור</Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {console.log(memberList)}
            {memberList.length !== 0 ? (
              memberList.map((memberObj) => {
                const member = memberObj.member;
                return (
                  <ListItem key={member.id}>
                    <ListItemText
                      primary={member.name}
                      secondary={member.email}
                    ></ListItemText>
                  </ListItem>
                );
              })
            ) : (
              <ListItem alignItems="flex-start" dir="ltr">
                לא נמצאו חברי מדור
              </ListItem>
            )}
          </List>
        </Grid>
      )}
    </Grid>
  );
};

export default MadorManagement;
