import PropTypes from 'prop-types';
import { paginationList } from '../../utils';
import './style.css'

function Pagination({ pageCount, selectedPage, changePage }) {

    const pageList = paginationList(pageCount, selectedPage);

    return (
        <div className="Pagination">
            <div className="Pagination-list">
                {selectedPage > 2 ?
                    <span className={'Pagination-item' + (1 === selectedPage ? " select" : "")} key={1} onClick={() => changePage(1)}>1</span> : ''}
                {selectedPage >= 4 ? <span className="Pagination-item" >...</span> : ''}
                {
                    pageList.map(item => {
                        if (item >= pageCount) return ('');
                        return (<span key={item} onClick={() => changePage(item)} className={'Pagination-item' + (item === selectedPage ? " select" : "")}>{item}</span>)
                    })
                }
                {selectedPage <= pageCount - 3 ? <span className="Pagination-item">...</span> : ''}
                <span className={'Pagination-item' + (pageCount === selectedPage ? " select" : "")} key={pageCount} onClick={() => changePage(pageCount)}>{pageCount}</span>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    selectedPage: PropTypes.number.isRequired,
    changePage: PropTypes.func,
};

Pagination.defaultProps = {
    changePage: () => { },
}

export default Pagination;