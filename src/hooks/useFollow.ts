import { useMutation } from "@apollo/client";
import { FOLLOW_USER } from "../apollo-hooks";
import { followUser, followUserVariables } from "../__generated__/followUser";

const useFollow = ({
  userId,
  isMe,
  isfollowing,
}: {
  userId: number;
  isMe: boolean;
  isfollowing: boolean;
}) => {
  const [followUser, { loading }] = useMutation<
    followUser,
    followUserVariables
  >(FOLLOW_USER, {
    update: (cache, { data }) => {
      if (data?.followUser.ok) {
        cache.modify({
          id: `User:${userId}`,
          fields: {
            isfollowing: (pre) => !pre,
            totalFolloweds: (pre) => (isfollowing ? pre - 1 : pre + 1),
          },
        });
      }
    },
  });
  const followUserEvent = () => {
    if (loading) return;
    if (isMe) {
      alert("不能关注自己");
      return;
    }
    followUser({ variables: { userId } });
  };

  return [followUserEvent];
};

export default useFollow;
