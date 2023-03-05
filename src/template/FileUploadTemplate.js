import { useState } from 'react';
import { read, utils, writeFile } from "xlsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';


const Wrapper = styled.div`
     display: flex;
    justify-content: center;
`;

const FileUploadTemplate = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadFiles, setIsUploadFiles] = useState();

    const onChangeFileUpload = (event) => {
        if (event.target.value) {
            setIsUploading(true);
            setIsUploadFiles([...event.target.files]);
        } else {
            setIsUploadFiles([]);
            setIsUploading(false);
        }
    }

    const onClickSubmit = (event) => {
        let render = new FileReader();
        render.onload = function (event) {
            console.log(event.target.result);
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Wrapper>
                    <input className='form-control' type="file" accept=".xls,.xlsx" multiple onChange={onChangeFileUpload}></input>
                    <Button variant={!isUploading ? 'secondary' : 'primary'} type="button" disabled={!isUploading} onClick={onClickSubmit}>
                        Click
                    </Button>
                </Wrapper>
            </Form.Group>

            {isUploadFiles &&
                <ListGroup >
                    {isUploadFiles.map((data, idx) =>
                        <>
                            <ListGroup.Item key={idx}>{data.name}</ListGroup.Item>
                        </>
                    )}
                </ListGroup>}

        </Form>
    );
};

export default FileUploadTemplate;