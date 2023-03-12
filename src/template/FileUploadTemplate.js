import { useEffect, useState } from 'react';
import { read, utils, writeFile } from "xlsx";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components';


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

const COLUMN = {
    PRODUCT_NUMBER: '상품번호',
    SELLER_PRODUCT_CODE: '판매자상품코드',
    PRODUCT_NAME: '상품명'
};

const FileUploadTemplate = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [isUploadFiles, setIsUploadFiles] = useState();
    const [isConverFiles, setIsConvertFiles] = useState([]);

    const onChangeFileUpload = async (event) => {
        if (event.target.value) {
            setIsUploading(true);
            setIsUploadFiles([...event.target.files]);
        } else {
            setIsUploadFiles([]);
            setIsUploading(false);
        }
    }

    const onClickSubmit = async () => {
        await convertFiles();
    }

    const convertFiles = () => {
        return new Promise(resolve => {
            isUploadFiles.forEach(element => {
                let reader = new FileReader();
                reader.onloadend = function () {
                    let fileData = reader.result;
                    let wb = read(fileData, { type: 'binary' });
                    wb.SheetNames.forEach(function (sheetName) {
                        let rowArr = new Array();
                        let sheetArr = utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });

                        if (sheetArr[0].indexOf(COLUMN.PRODUCT_NAME)) {
                            rowArr.push(sheetArr[0].indexOf(COLUMN.PRODUCT_NAME));
                        }
                        if (sheetArr[0].indexOf(COLUMN.SELLER_PRODUCT_CODE)) {
                            rowArr.push(sheetArr[0].indexOf(COLUMN.SELLER_PRODUCT_CODE));
                        }
                        if (sheetArr[0].indexOf(COLUMN.PRODUCT_NUMBER)) {
                            rowArr.push(sheetArr[0].indexOf(COLUMN.PRODUCT_NUMBER));
                        }
                        sheetArr.forEach((element, idx) => {
                            let resultArr = new Array();
                            for (let x = 0; x < rowArr.length; x++) {
                                //  resultArr[x] = element[rowArr[x]];
                                resultArr.push(element[rowArr[x]]);
                            }
                            setIsConvertFiles(isConverFiles => [resultArr, ...isConverFiles]);
                            resolve(isConverFiles);
                        })
                    })
                }
                reader.readAsBinaryString(element);
            })
        })
    }

    useEffect(() => {
        if (isConverFiles.length !== 0 && isUploading) {
            const worksheet = utils.aoa_to_sheet(isConverFiles.reverse());
            worksheet['!autofilter'] = { ref: "A1:C1" };
            const workbook = utils.book_new();
            utils.book_append_sheet(workbook, worksheet, "total");

            writeFile(workbook, "convert_file.xlsx", { compression: true });
            setIsUploadFiles([]);
            setIsUploading(false);
            document.querySelector('.form-control').value = '';
            console.log('convert complete');
        }
    }, [isConverFiles])

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
                        <ListGroup.Item key={idx}>{data.name}</ListGroup.Item>
                    )}
                </ListGroup>}
        </Form>
    );
};

export default FileUploadTemplate;