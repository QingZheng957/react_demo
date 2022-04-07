import React, { memo, ReactElement, useCallback } from 'react'
import './index.less'
import { RouteComponentProps } from 'react-router'
import { Form, Input, Button, notification } from 'antd'
import { login } from '@/api/api'
const { Item } = Form

interface Props extends RouteComponentProps { }

const Index = memo(({ history }: Props): ReactElement => {
    //请求
    const handleSubmit = useCallback(async (value: any) => {
        console.log('===', value)
        const params = {
            "appSecret": "94dd0b7b9a1ce8cf07f6eede8f573e92",
            //三点运算符  展开value
            ...value
        }
        let data = await login(params)
        console.log(data)

        //判断登录状态
        if (data.status === 'OK') {
            history.push('/project')
        } else {
            notification['error']({ message: data?.statusCode })
        }

    }, [])

    return (
        <div className="login-box">
            <div className="inner">
                <div className="title">管理系统</div>
                <div className="login-form">
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 19, offset: 1 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        >
                            <Input placeholder='用户名' />
                        </Form.Item>

                        <Form.Item
                            name="telephone"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        >
                            <Input.Password placeholder='用户密码' />
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
})

export default Index
