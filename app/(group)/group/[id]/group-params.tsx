export interface GroupParams {
  params: Promise<{
    id: string;
  }>;
}

export const getGroupId = async ({ params }: GroupParams) => {
  return (await params).id;
};
