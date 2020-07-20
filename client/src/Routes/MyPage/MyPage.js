import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { Title } = Typography;
// const { TextArea } = Input;



function MyPage() {

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [FilePath, setFilePath] = useState("")
    const handleChangeEmail = ( event ) => {
        setEmail(event.currentTarget.value)
    }

    const handleChangeName = (event) => {
        console.log(event.currentTarget.value)

        setName(event.currentTarget.value)
    }

    const onSubmit = () => {

    }
    const onDrop = ( files ) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        console.log(files)
        formData.append("file", files[0])

        Axios.post('/api/image/uploadfiles', formData, config)
        .then(response=> {
            if(response.data.success){

                console.log(response.data)
                // let variable = {
                //     filePath: response.data.filePath,
                //     fileName: response.data.fileName
                // }
                setFilePath(response.data.filePath)

                //gerenate thumbnail with this filepath ! 

            } else {
                alert('failed to save the video in server')
            }
        })

    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', }}>
            <Title style={{ color:'white' }} level={2} > My Page</Title>
        </div>

        <Form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            
                <Dropzone 
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={800000000}>
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ width: '100px', height: '80px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <PlusOutlined style={{ color: 'white', fontSize: '3rem' }}/>
                            {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}

                        </div>
                    )}
                </Dropzone>
                <br />
                       
                {/* {thumbnail !== "" &&
                    <div>
                        <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                    </div>
                } */}
            </div>
            <span style={{ color: 'white' }}>Profile Image</span> 
            <br /><br />
            <label>Email</label>
            <Input
                 onChange={handleChangeEmail}
                 value={Email}
            />
            <br /><br />
            <label>Name</label>
            <Input
                 onChange={handleChangeName}
                 value={Name}
            />
            <br /><br />


            <br /><br />

            <Button type="primary" size="large" onClick={onSubmit}>
                완료
            </Button>

        </Form>
    </div>
    )
}

export default MyPage