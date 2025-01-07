export interface ProfileParams {
  params: Promise<{
    username: string;
  }>;
}

export const getUsernameParam = async ({ params }: ProfileParams) => {
  return (await params).username;
};
