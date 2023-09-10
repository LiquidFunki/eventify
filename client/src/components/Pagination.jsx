import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Додати номери сторінок в масив pageNumbers
  for (let i = 1; i <= totalPages; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center my-5'>
      <nav>
        <ul className='pagination'>
          {/* Кнопка назад */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className='page-link'
              disabled={currentPage === 1}
            >
              Назад
            </button>
          </li>

          {/* Поточна сторінка */}
          <li className='page-item'>
            <button
              onClick={() => onPageChange(currentPage)}
              className='page-link bg-green-500 text-white'
            >
              {currentPage}
            </button>
          </li>

          {/* Наступна сторінка */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className='page-link'
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </li>

          {/* Три крапки */}
          {currentPage > 2 && <li className='page-item disabled'>...</li>}

          {/* Дві останні сторінки */}
          {currentPage > 1 && currentPage < totalPages - 1 && (
            <>
              <li className='page-item'>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  className='page-link'
                >
                  {currentPage + 1}
                </button>
              </li>
              <li className='page-item'>
                <button
                  onClick={() => onPageChange(currentPage + 2)}
                  className='page-link'
                >
                  {currentPage + 2}
                </button>
              </li>
            </>
          )}

          {/* Три крапки */}
          {currentPage < totalPages - 1 && <li className='page-item disabled'>...</li>}

          {/* Кнопка вперед */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className='page-link'
              disabled={currentPage === totalPages}
            >
              Вперед
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
