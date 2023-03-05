import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const FileHeaderTemplate = () => {
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand href="#home">Excel Convert Site</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default FileHeaderTemplate;