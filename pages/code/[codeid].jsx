import CodeScreen from "../../screens/CodeScreen";
import { useRouter } from "next/router";

const codeid = () => {
  const router = useRouter();
  const codeid = router.query.codeid;
  return <CodeScreen codeid={codeid} />;
};

export default codeid;
