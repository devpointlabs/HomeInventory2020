import React from 'react';
import { Link, } from 'react-router-dom';
import { PageHeader, } from 'antd';

const NoMatch = () => (
  <PageHeader>
    Page not found return
    <Link to="/"> Home</Link>
  </PageHeader>
)

export default NoMatch;