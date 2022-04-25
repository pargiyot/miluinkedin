import "./index.css";
import Timeline from "./Timeline";
import Skills from "./Skills";

import experiencesMock from "../../assets/mocks/EXPERIENCE.json";
import peopleSkills from "../../assets/mocks/PEOPLE_SKILLS.json";
import skills from "../../assets/mocks/SKILLS.json";

const Profile = ({ link, name, experience = experiencesMock }) => {
  link =
    "https://media-exp1.licdn.com/dms/image/C4D03AQHwdI64crX-6Q/profile-displayphoto-shrink_400_400/0/1606576176064?e=1656547200&v=beta&t=XvRLVfxnaoLrzV08QWSUwQjyBOU3QeK5J8okKcOOkG8";
  name = "ofie elart";
  const currentRole = experience.filter((x) => x.endDate == null)[0];

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
        <Skills skills={peopleSkills.map(s => ({text: skills.find(skill => skill.id == s.skillId).name, value: s.votes}))}>
        </Skills>
        <Timeline experienceArray={experiencesMock}></Timeline>
      </div>
    </div>
  );
};

export default Profile;
