import "./index.css";
import Timeline from "./Timeline";

const Profile = ({ link }) => {
  link =
    "https://media-exp1.licdn.com/dms/image/C4D03AQHwdI64crX-6Q/profile-displayphoto-shrink_400_400/0/1606576176064?e=1656547200&v=beta&t=XvRLVfxnaoLrzV08QWSUwQjyBOU3QeK5J8okKcOOkG8";

  return (
    <div className="profile-container">
      <div className="profile-background"></div>
      <img className="profile-img" src={link}></img>

      <Timeline></Timeline>
    </div>
  );
};

export default Profile;
