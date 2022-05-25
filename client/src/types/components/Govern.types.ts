export interface IGovernType {
  pollId?: string;
  title?: string;
  agree?: number | string;
  disagree?: number | string;
  createdTime?: string;
  content?: string;
  creator?: string;
  endTime?: string;
  expired?: boolean;
  totalSupply?: string;
  withdrawableBalance?: string;
}
