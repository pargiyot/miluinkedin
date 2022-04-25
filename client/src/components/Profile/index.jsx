import "./index.css";
import experiencesMock from "../../assets/mocks/EXPERIENCE.json";
import PEOPLE_TAGS from "../../assets/mocks/PEOPLE_TAGS.json";
import TAGS from "../../assets/mocks/TAGS.json";
import Timeline from "./Timeline";
import { Chip } from "@mui/material";

const Profile = ({ link, name, experience = experiencesMock }) => {
  link =
    "https://media-exp1.licdn.com/dms/image/C4D03AQHwdI64crX-6Q/profile-displayphoto-shrink_400_400/0/1606576176064?e=1656547200&v=beta&t=XvRLVfxnaoLrzV08QWSUwQjyBOU3QeK5J8okKcOOkG8";
  name = "ofie elart";
  const currentRole = experience.filter((x) => x.endDate == null)[0];

  const peopleTags = PEOPLE_TAGS.filter((pt) => pt.personId === 1);

  const tagsInfo = peopleTags.map((pTag) =>
    TAGS.find((t) => t.id === pTag.tagId)
  );

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <img className="profile-img" src={link}></img>
      <div className="profile-details">
        <div className="profile-name">{name}</div>
        <div className="profile-current-role">
          {currentRole
            ? currentRole.role + " at " + currentRole.organization
            : "unemployed"}
        </div>
        <Tags tags={tagsInfo} />
        <Timeline experienceArray={experiencesMock}></Timeline>
      </div>
    </div>
  );
};

const Tags = ({ tags }) => {
  return (
    <div className="profile-tags">
      {tags.map((tag) => (
        <Chip label={tag.name} className="profile-tags-tag"></Chip>
      ))}
    </div>
  );
};


export default Profile;
