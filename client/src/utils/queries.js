import { gql } from "@apollo/client";

export const GET_ME = gql`
Query Me {
    me {
     _id
     username
     email
     bookCount
     savedBooks {
      _id
      authors
      description
      bookId
      image
      link
      title
    }
  }
}
`;
