import "./index.css";
import Timeline from "./Timeline";
import Skills from "./Skills";

import { Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {reservistById} from "../../api";

const Profile = () => {
  const [profile, setProfile] = useState(undefined);

  const { personId } = useParams();

  useEffect(() => {
    const loadProfile = async () =>{
        const p = await reservistById(personId);
        setProfile(p);
    }

    loadProfile();
  }, [personId])

  const currentRole = profile ? profile.experiences.find((x) => x.endDate === null) : undefined;

  return profile ? (
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
        <Tags tags={profile.tags} />
        <div className="border"></div>
        <div className="profile-skills">
          <Skills
            skills={profile.skills.map((s) => ({
              text: s.name,
              value: s.score
            }))}
          />
        </div>
        <div className="border"></div>
        <Timeline experienceArray={profile.experiences}></Timeline>
      </div>
    </div>
  ) : <div />;
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
