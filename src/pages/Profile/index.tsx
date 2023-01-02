import { useParams } from "react-router-dom";

const Profile = () => {
  const data = useParams();
  console.log(data);
  return <div>Profile</div>;
};
export default Profile;
