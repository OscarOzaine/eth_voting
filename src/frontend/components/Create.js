import { useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import ElectionService from '../services/ElectionService';

const Create = ({ election, setLoading }) => {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name) return
    try {
      setLoading(true);
      const electionService = new ElectionService(election);
      await electionService.storeCandidate(name);
    } catch (e) {
      console.error('Error creating candidate', e);
    } finally {
      setLoading(true);
    }
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                size="lg"
                required
                type="text"
                placeholder="Name"
              />
              <div className="d-grid px-0">
                <Button onClick={() => handleCreate()} variant="primary" size="lg">
                  Create
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create