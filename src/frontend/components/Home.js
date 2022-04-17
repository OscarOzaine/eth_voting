import { useState, useEffect } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import ElectionService from '../services/ElectionService';

const Home = ({ election }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const loadCandidates = async () => {
    try {
      setLoading(true);
      const electionService = new ElectionService(election);
      const items = await electionService.getCandidates(election);
      setItems(items);
    } catch (e) {
      console.error('Error loading candidates', e);
    } finally {
      setLoading(false);
    }    
  }

  const handleVote = async (item) => {
    if (!item?.name) return
    try {
      setLoading(true);
      const electionService = new ElectionService(election);
      await electionService.vote(item);
      loadCandidates();
    } catch (e) {
      console.error('Error voting for candidate', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCandidates();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Loading...</h2>
      </main>
    );
  }
  

  return (
    <div className="flex justify-center">
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.voteCount}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button onClick={() => handleVote(item)} variant="primary" size="lg">
                        Vote
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}
export default Home