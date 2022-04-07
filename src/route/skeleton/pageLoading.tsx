import React from 'react'
import { Spin } from 'antd';

//页面加载效果
const PageLoading = props => (
  <div style={{ textAlign: "center", margin: "80px 0" }}><Spin size="large" /></div>
)

export default PageLoading