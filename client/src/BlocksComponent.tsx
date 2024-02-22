import React, { useEffect } from 'react';
import { useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import './styles.css'

const PAGE_SIZE = 20; 

const GET_BLOCKS = gql`
  query GetBlocks {
    bitcoin {
      blocks(date: {between: ["2024-02-18T00:00:00+0000", "2024-02-19T00:00:00+0000"]}) {
        height
        blockSize
        transactionCount
        timestamp {
          iso8601
        }
      }
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions($gteq: Int!, $lteq: Int!) {
    bitcoin {
      transactions {
        block(height: {gteq: $gteq, lteq: $lteq}) {
          height
        }
        feeValue
        txSize
      }
    }
  }
`;




type Block = {
    height: number;
    blockSize: number;
    transactionCount: number;
    timestamp: {
        iso8601: string;
    };
 
};

type Transaction = {
    block: { height: number };
    feeValue: number;
    txSize: number;
};


type BlocksData = {
    bitcoin: {
        blocks: Block[];
    };
};

type TransactionsData = {
    bitcoin: {
        transactions: Transaction[];
    };
};

type MergedBlockData = Block & {
    feeValue?: number | 'N/A';
    txSize?: number | 'N/A';
};

const BlocksComponent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [dateAfter, setDateAfter] = useState('');

 

  

    const { loading: loadingBlocks, error: errorBlocks, data: dataBlocks } = useQuery<BlocksData>(GET_BLOCKS, {
        
});
    const [getTransactions, { called, loading: loadingTransactions, data: dataTransactions }] = useLazyQuery<TransactionsData>(GET_TRANSACTIONS, {
        fetchPolicy: "cache-and-network",
       
        
    });
    const pageCount = dataBlocks ? Math.ceil(dataBlocks.bitcoin.blocks.length / PAGE_SIZE) : 0;

    const paginatedBlocks = dataBlocks ? dataBlocks.bitcoin.blocks.slice(
        currentPage * PAGE_SIZE,
        (currentPage + 1) * PAGE_SIZE
    ) : [];
    const formatTimestamp = (isoString: string) => {
        
        return isoString.replace('T', ' ').replace('Z', '');
    };

    const hasPrevPage = currentPage > 0;
    const hasNextPage = (currentPage + 1) * PAGE_SIZE < (dataBlocks?.bitcoin.blocks.length ?? 0);

   
    const goToPrevPage = () => setCurrentPage(currentPage - 1);
    const goToNextPage = () => setCurrentPage(currentPage + 1);
    const goToFirstPage = () => setCurrentPage(0);

  



    useEffect(() => {
        
        const startHeightIndex = currentPage * PAGE_SIZE;
        const endHeightIndex = (currentPage + 1) * PAGE_SIZE;

       
        const currentHeights = dataBlocks?.bitcoin.blocks
            .slice(startHeightIndex, endHeightIndex)
            .map(block => block.height);

        
        if (currentHeights && currentHeights.length > 0) {
            const minHeight = Math.min(...currentHeights);
            const maxHeight = Math.max(...currentHeights);

            getTransactions({ variables: { gteq: minHeight, lteq: maxHeight } });
        }
    }, [dataBlocks, getTransactions, currentPage]);

    if (loadingBlocks || !called || loadingTransactions) return <p>Loading.Please wait...</p>;
    if (errorBlocks) return <p>Error: {errorBlocks.message}</p>;
    

    if (!dataTransactions || dataTransactions.bitcoin.transactions.length === 0) {
        return <p>No transaction data available</p>; 
    }

    const mergedData: MergedBlockData[] = dataBlocks?.bitcoin?.blocks.map(block => {
        const transactionData = dataTransactions?.bitcoin?.transactions.find(tx => tx.block.height === block.height);
        return {
            ...block,
            feeValue: transactionData?.feeValue ?? 'N/A',
            txSize: transactionData?.txSize ?? 'N/A',
        };
    }) ?? [];

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };



    return (

        <div className="table-container">
            <h2>Blocks list</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Height</th>
                        <th className="th">Block Size</th>
                        <th className="th">Tx count</th>
                        <th className="th">Fee Value</th>
                        <th className="th">Size</th>
                        <th className="th">Time</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBlocks.map((block, index) => {
                        const transactionData = dataTransactions?.bitcoin?.transactions.find(tx => tx.block.height === block.height);
                        return (
                            <tr className="tr" key={index}>
                                <td className="td">{block.height}</td>
                                <td className="td">{block.blockSize}</td>
                                <td className="td">{block.transactionCount}</td>
                                <td className="td">{transactionData?.feeValue ?? 'N/A'}</td>
                                <td className="td">{transactionData?.txSize ?? 'N/A'}</td>
                                <td className="td">{formatTimestamp(block.timestamp.iso8601)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
       
            <div className="pagination">
                <button
                    onClick={goToPrevPage}
                    disabled={!hasPrevPage}
                    className="page-item"
                >
                    Prev
                </button>
               
                <button
                    className={`page-item ${currentPage === 0 ? 'active' : ''}`}
                >
                    {currentPage + 1}
                </button>
                <button
                    onClick={goToNextPage}
                    disabled={!hasNextPage}
                    className="page-item"
                >
                    Next
                </button>
            </div>
        </div>

    );
};

export default BlocksComponent;
