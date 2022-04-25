import "./index.css";
import Timeline from "./Timeline";
import Skills from "./Skills";

import peopleSkills from "../../assets/mocks/PEOPLE_SKILLS.json";
import skills from "../../assets/mocks/SKILLS.json";
import experiencesMock from "../../assets/mocks/EXPERIENCE.json";
import PEOPLE_TAGS from "../../assets/mocks/PEOPLE_TAGS.json";
import TAGS from "../../assets/mocks/TAGS.json";
import PEOPLE from "../../assets/mocks/PEOPLE.json";
import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {reservistById} from "../../api";

const Profile = ({ name, experience = experiencesMock }) => {
  const [profile,setProfile] = useState(undefined);

  let { personId } = useParams();

  useEffect(() => {
    const loadProfile = async () =>{
        const p = await reservistById(personId);
        setProfile(p);
    }

    loadProfile();
  })

  const currentRole = experience
    .filter((ex) => ex.personId == personId)
    .find((x) => x.endDate == null);
  const peopleTags = PEOPLE_TAGS.filter((pt) => pt.personId == personId);
  const tagsInfo = peopleTags.map((pTag) =>
    TAGS.find((t) => t.id == pTag.tagId)
  );

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <img className="profile-img" src={profile ? profile.image_url : ""}></img>
      <div className="profile-details">
        <div className="profile-name">{profile ? profile.name : ""}</div>
        <div className="profile-current-role">
          {currentRole
            ? currentRole.role + " at " + currentRole.organization
            : "unemployed"}
        </div>
        <Tags tags={tagsInfo} />
        <div className="border"></div>
        <div className="profile-skills">
          <Skills
            skills={peopleSkills.map((s) => ({
              text: skills.find((skill) => skill.id == s.skillId).name,
              value: s.votes
            }))}
          />
        </div>
        <div className="border"></div>
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
