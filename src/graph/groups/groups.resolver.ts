import { IContext } from "../context/context.interface";
import { IGroup } from "./groups.interface";

export const GroupsResolver = {
  Group: {
    image: (group: IGroup, args, { authData, dataSources }: IContext) => {
      return dataSources.groupsAPI.getGroupImage(group.leader.id);
    },
  }
};

export default GroupsResolver;
