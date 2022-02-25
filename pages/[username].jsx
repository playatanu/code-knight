import { useRouter } from "next/router";

import ProfileScreen from "../screens/PofileScreen";

const username = () => {
  const router = useRouter();
  const username = router.query.username;

  return <ProfileScreen query={username} />;
};

export default username;
