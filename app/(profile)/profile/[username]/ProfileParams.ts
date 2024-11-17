export interface ProfileParams {
  params: {
    username: string;
  };
}

export const getUsernameParam = ({ params }: ProfileParams) => {
  return params.username;
};
