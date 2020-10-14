import React, { Component } from 'react';

import Pagination from "react-js-pagination";

export class TableWrapper extends Component {

  state = {
    activePage: 1,
  }

  handlePagination = (direction) => {

    let { page = 1 } = this.props.pageMeta || {}

    let { queryHandler } = this.props;

    let pageNumber;

    if (direction === "previous") {

      pageNumber = page - 1;

    } else if (direction === "next") {

      pageNumber = page + 1;

    }

    if (queryHandler) {

      queryHandler({ page: pageNumber })

    }

  }

  handlePageChange = (pageNumber) => {

    const { queryHandler } = this.props;

    queryHandler && queryHandler({ page: pageNumber })

    // this.setState({ activePage: pageNumber });

  }

  render() {
    const { headerDetails = [], pageMeta = {} } = this.props;

    const {
      chunk = 10,
      page = 0,
      total = 0,
      totalPages = 0,
    } = pageMeta;

    const upperPages = [];

    const lowerPages = [];

    for (let i = page; i <= totalPages; i++) {

      if (i < page + 3) {

        upperPages.push(i);

        i = i === page + 2 && totalPages > page + 4 ? totalPages - 3 : i;

      } else {

        if (totalPages > 6) {

          lowerPages.push(i)

        }

      }

    }

    return (

      <>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                {headerDetails.map(({ label, className, divClass = '', width = false }, index) => {
                  return (
                    <th className={className} key={index} style={{ width }}>
                      <div className={`d-flex align-items-center ${divClass}`}>
                        {label}
                      </div>
                    </th>
                  )
                }
                )}
              </tr>
            </thead>
            {total > 0 ?
              <>
                <tbody>
                  {this.props.children}
                </tbody>
              </>
              : ''}
          </table>
          {total > 0 ? '' :
            <div className="text-center my-4 py-3 w-100 fs-22 text-c1 fw-600">
              No Data Found
            </div>
          }
        </div>

        {total > 0 ?
          <div className="ce-pagination py-4 w-100">
            {total > chunk ?
              <Pagination
                activePage={page}
                itemsCountPerPage={chunk}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                prevPageText="Previous"
                nextPageText="Next"
                itemClassFirst="first-page"
                itemClassLast="last-page"
                itemClassPrev="ml-auto"
              />
              : ''}
          </div>
          : ''}
      </>
    )
  }
}

