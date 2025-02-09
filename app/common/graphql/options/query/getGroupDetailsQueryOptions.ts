import { env } from "@/app/common/utils/env";
import { queryOptions } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { GroupDetailsDto } from "../../dto";

interface Data {
  getGroupDetails: GroupDetailsDto;
}

interface Variables {
  groupId: string;
}

export const getGroupDetailsQueryOptions = (variables: Variables) =>
  queryOptions<Data>({
    queryKey: ["GetGroupDetails"],
    queryFn: () => {
      const query = gql`
        query GetGroupDetails($groupId: String!) {
          getGroupDetails(groupId: $groupId) {
            __typename
            id
            title
            description
            createdAt
            sponsored
            verified
            remote
            cities {
              __typename
              value
              label
            }
            categories {
              __typename
              value
              label
            }
            users {
              __typename
              isHost
              isModerator
              user {
                __typename
                id
                username
                thumbnail {
                  __typename
                  id
                  thumb
                }
                verifiedAt
              }
            }
            comments {
              __typename
              id
              rate
              content
              createdAt
              user {
                __typename
                id
                username
                thumbnail {
                  __typename
                  id
                  thumb
                }
                verifiedAt
              }
            }
            thumbnail {
              __typename
              id
              thumb
            }
            upcoming {
              __typename
              monthReference
              events {
                __typename
                id
                title
                description
                createdAt
                canceled
                sponsored
                verified
                remote
                users {
                  __typename
                  isHost
                  isModerator
                  user {
                    __typename
                    id
                    username
                    thumbnail {
                      __typename
                      id
                      thumb
                    }
                    verifiedAt
                  }
                }
                date {
                  __typename
                  id
                  startAt
                  endAt
                }
                cities {
                  __typename
                  value
                  label
                }
                categories {
                  __typename
                  value
                  label
                }
              }
            }
            pending {
              __typename
              monthReference
              events {
                __typename
                id
                title
                description
                createdAt
                canceled
                sponsored
                verified
                remote
                users {
                  __typename
                  isHost
                  isModerator
                  user {
                    __typename
                    id
                    username
                    thumbnail {
                      __typename
                      id
                      thumb
                    }
                    verifiedAt
                  }
                }
                date {
                  __typename
                  id
                  startAt
                  endAt
                }
                cities {
                  __typename
                  value
                  label
                }
                categories {
                  __typename
                  value
                  label
                }
              }
            }
            past {
              __typename
              monthReference
              events {
                __typename
                id
                title
                description
                createdAt
                canceled
                sponsored
                verified
                remote
                users {
                  __typename
                  isHost
                  isModerator
                  user {
                    __typename
                    id
                    username
                    thumbnail {
                      __typename
                      id
                      thumb
                    }
                    verifiedAt
                  }
                }
                date {
                  __typename
                  id
                  startAt
                  endAt
                }
                cities {
                  __typename
                  value
                  label
                }
                categories {
                  __typename
                  value
                  label
                }
              }
            }
            cancelled {
              __typename
              monthReference
              events {
                __typename
                id
                title
                description
                createdAt
                canceled
                sponsored
                verified
                remote
                users {
                  __typename
                  isHost
                  isModerator
                  user {
                    __typename
                    id
                    username
                    thumbnail {
                      __typename
                      id
                      thumb
                    }
                    verifiedAt
                  }
                }
                date {
                  __typename
                  id
                  startAt
                  endAt
                }
                cities {
                  __typename
                  value
                  label
                }
                categories {
                  __typename
                  value
                  label
                }
              }
            }
            events {
              __typename
              id
              title
              description
              createdAt
              canceled
              sponsored
              verified
              remote
              users {
                __typename
                isHost
                isModerator
                user {
                  __typename
                  id
                  username
                  thumbnail {
                    __typename
                    id
                    thumb
                  }
                  verifiedAt
                }
              }
              date {
                __typename
                id
                startAt
                endAt
              }
              cities {
                __typename
                value
                label
              }
              categories {
                __typename
                value
                label
              }
            }
            upcomingLength
            pendingLength
            pastLength
            cancelledLength
            eventsLength
            rate
          }
        }
      `;

      return request(env.NEXT_PUBLIC_BACKEND_GRAPHQL, query, variables);
    },
  });
