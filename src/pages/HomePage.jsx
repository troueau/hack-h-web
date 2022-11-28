import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { countFestivals, getFestivals } from '../service/ferstivalService';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import List from '../components/HomePage/List';
import SearchBar from './SearchBar';
import style from './HomePage.module.css';
import LoadingSkelton from '../components/LoadingSkeleton';

function HomePage() {

  // partie Brahim
  const SIZE_PAGE = 8;
  const SIZE_FIREBASE = 50;

  const [qSearch, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [lastElement, setLastElement] = useState('');
  const [isEnabled, setEnabled] = useState(true);
  const [count, setCount] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  // partie Brahim
  const onSearch = (qs) => {
    setSearch(qs);
    setItems([]);
    setLastElement('');
    setCurrentPage(0);
    setEnabled(true);
  }

  const { isLoading, data, error } = useQuery('festivals', () => getFsts(lastElement, SIZE_FIREBASE, qSearch), {
    enabled: isEnabled
  });

  const nextPage = () => {
    let i = currentPage + 1;
    if (i === parseInt((items.length / SIZE_PAGE) - 1)) {
      setEnabled(true);
    }
    setCurrentPage(currentPage + 1);
  }

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const getFsts = async (start = '', size = 10, qSearch = '') => {
    //setLoading(true);
    let ff = await getFestivals(start, size, qSearch);
    let countResult = await countFestivals(qSearch);
    setCount(countResult?.data()?.count);
    setEnabled(false);
    let results = [];
    ff.forEach(e => results.push(e.data()));
    if (results.length > 0) {
      setLastElement(results[results.length - 1].nom_du_festival);
    }
    setItems(items => [...items, ...results]);
    return results;
  }
  //******************** */

  return (
    <div>
        <Container>
          <Row style={{ margin: '0.5em', marginBottom: '2%' }}>
            <Col xs={12} md={8}>
              <SearchBar onSearch={onSearch} />
            </Col>
          </Row>
          {(isLoading || !items || items.length == 0) &&
            <Row><LoadingSkelton /></Row>
          }
          {!isLoading && 
            <Row>
              <Col>
                <List
                  data={items?.slice(currentPage * SIZE_PAGE)?.slice(0, SIZE_PAGE)} />
              </Col>
          </Row>}
          <Row>
            {(items.length > SIZE_PAGE) &&
              <div className={style.pagination}>
                <ul>
                  <li
                    className={currentPage === 0 ? style.disable : style.active}
                    onClick={previousPage}>
                    &#x276E;
                  </li>
                  <li className={style.number}>{currentPage + 1} / {Math.ceil(count / SIZE_PAGE)}</li>
                  <li
                    className={(currentPage + 1) === Math.ceil(count / SIZE_PAGE) ? style.disable : style.active}
                    onClick={nextPage}>
                    &#x276F;
                  </li>
                </ul>
              </div>
            }
          </Row>
          <Row>
            <Button
              variant="outline-primary"
              onClick={() => navigate('/festivalcreation')} style={{ margin: '1em' }}>
              Nouveau festival
            </Button>{' '}
          </Row>
        </Container>
    </div>
  )
}

export default HomePage;
