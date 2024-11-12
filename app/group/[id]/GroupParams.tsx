export interface GroupParams {
  params: {
    id: string;
  };
}

export const getGroupId = ({ params }: GroupParams) => {
  return params.id;
};
