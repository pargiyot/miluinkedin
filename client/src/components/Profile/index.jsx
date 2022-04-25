import "./index.css";

const Profile = ({ link }) => {
  link =
    "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";

  return (
    <div className='profile-container'>
      <div className="profile-background"></div>
      <img className="profile-img" src={link}></img>
    </div>
  );
};

export default Profile;
