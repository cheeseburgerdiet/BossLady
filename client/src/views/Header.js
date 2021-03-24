import React from 'react';
import { Jumbotron, Container} from 'reactstrap';


const Header = () => {
    return(
        <div>
            <Jumbotron fluid>
                <Container fluid>
                <h1 className="display-3">Hey there, boss lady!</h1>
                <p className="lead">Fullfill your potential one great habit at a time.</p>
                </Container>
            </Jumbotron>
        </div>
    )
};

export default Header;