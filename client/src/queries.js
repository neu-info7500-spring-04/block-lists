import { gql } from '@apollo/client';

export const GET_BLOCKS = gql`
    qquery MyQuery {
  bitcoin {
    blocks(any: {date: {after: "2024-02-18T17:14:50+0000"}}) {
      height
      blockSize
      transactionCount
    }
  }
}
`;
