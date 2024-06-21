import { Button } from "./ui/button";

type Props = {
  page: number;
  maxButtons: number;
  totalPages: number;  
  setPage: (value: React.SetStateAction<number>) => void
}

function Pagination({ page, maxButtons, totalPages, setPage }: Props) {

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const halfMaxButtons = Math.floor(maxButtons / 2); //10 / 2 = 5
    let startPage = Math.max(page - halfMaxButtons, 1);
    let endPage = Math.min(page + halfMaxButtons, totalPages); //6 + 5 = 11

    if (page <= halfMaxButtons) {
      endPage = Math.min(maxButtons, totalPages);
    }

    if (page + halfMaxButtons > totalPages) {
      startPage = Math.max(totalPages - maxButtons + 1, 1);
    }
    

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            backgroundColor: i === page ? '#007bff' : '#ffffff',
            color: i === page ? '#ffffff' : '#007bff',
            border: '1px solid #007bff',
            cursor: 'pointer'
          }}
        >
          {i < 10 ? `0${i}` : i}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <div className="flex justify-center items-center pb-3">
        {page > 1 && (
          <Button
            className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => handlePageChange(page - 1)} disabled={page === 1}
          >
            Anterior
          </Button>
        )}

        <div>
          {renderPageNumbers()}
        </div>

        {page < totalPages && (
          <Button
            className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-500" onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            Próximo
          </Button>
        )}
      </div>
    </>
  )
}

export default Pagination
