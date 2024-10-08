import { IGroupedUsers } from '../interfaces';
import { WegUser } from './wegUser';

export class GroupedUsers {
  private activeUsersArray: WegUser[] = [];

  getUserByNameAndUnity(wegUser: WegUser): WegUser | undefined {
    return this.activeUsersArray.find(
      (x) => x.Name == wegUser.Name && x.Unity == wegUser.Unity,
    );
  }

  setUser(wegUser: WegUser) {
    this.activeUsersArray.push(wegUser);
  }

  filterActiveUsersByTime() {
    let filtroData = new Date();
    filtroData.setDate(filtroData.getDate() - 90);
    this.activeUsersArray = this.activeUsersArray.filter(
      (x) => x.LastOpened >= filtroData.getTime(),
    );
  }

  filterAndGroupUsers(){
    this.filterActiveUsersByTime();
    return this.groupActiveUsersByUnity();    
  }

  groupActiveUsersByUnity() {
    let groupedUsers: IGroupedUsers = this.groupByUnity(this.activeUsersArray);
    let groupedUsersArray = Object.values(groupedUsers);

    return groupedUsersArray;
  }

  private groupByUnity(users: WegUser[]): IGroupedUsers {
    return users.reduce((groups: IGroupedUsers, user: WegUser) => {
      const unity = user.Unity;
      if (!groups[unity]) {
        groups[unity] = { unity: unity, totalUsers: 0 };
      }
      groups[unity].totalUsers++;
      return groups;
    }, {});
  }
}
