import React from 'react';
import { Table, Tag } from 'antd';
import { MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Column } = Table;

const CustomTable = (props) => {
    const { info } = props
    const data = [{
        key: info.id,
        date: info.date,
        land: `$${info.land_value}`,
        structure: `$${info.structure_value}`,
        total: `$${info.total_value}`,
    }]

    return (
        <>
            <StyledCon>
                <StyledHeader>
                    <p> Assessment History </p>
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
                <Column title="Date" dataIndex="date" key="date" />
                <Column title="Land" dataIndex="land" key="land" />
                <Column title="Structure" dataIndex="structure" key="structure" />
                <Column title="Total" dataIndex="total" key="total" />
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

export default CustomTable