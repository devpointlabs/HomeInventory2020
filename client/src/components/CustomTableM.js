import React from 'react';
import { Table, Tag } from 'antd';
import { MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';


const { Column } = Table;

const CustomTableM = (props) => {
    const { info } = props
    const data = [{
        key: info.id,
        date: info.due_date,
        task: info.task,
    }]

    return (
        <>
            <StyledCon>
                <StyledHeader>
                    <p> Maintenance Schedule </p>
                </StyledHeader>
                <StyledIcon>
                    <MinusOutlined />
                </StyledIcon>
                <StyledIcon>
                    <PlusOutlined />
                </StyledIcon>
                <StyledIcon>
                    <EditOutlined />
                </StyledIcon>
            </StyledCon>
            <Table dataSource={data}>
                <Column title="Due Date" dataIndex="date" key="date" />
                <Column title="task" dataIndex="task" key="land" />
            </Table>
        </>
    )
}

const StyledCon = styled.div`
display: flex; 
flex-direction: row;
align-items: center;
margin-bottom: 20px;
`
const StyledHeader = styled.div`
margin-right: 60%;
`

const StyledIcon = styled.div`
cursor: pointer;
font-size: 20px;
margin: 0 5px;
`

export default CustomTableM