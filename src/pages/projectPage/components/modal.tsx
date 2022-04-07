import React, { ReactElement, memo } from 'react'
import { Modal, Input, Select, Form, DatePicker } from 'antd'
import { useForm } from 'antd/lib/form/Form'

const { Option } = Select

//定义添加工程用到的参数
interface Props {
    visible: boolean
    title: string
    cancel: () => void
    handlerOk: (e) => any;
    propsData?: any,
    handlerUpdate: (e) => any;
    type: 'edit' | 'create'
}

//控制需要重新渲染的组件
const Index = memo(({ visible, title, cancel, handlerOk, propsData, handlerUpdate, type }: Props): ReactElement => {
    const [form] = useForm()

    const handlerCreate = (values) => {
        console.log(values, form.getFieldsValue())

        let params = form.getFieldsValue();
        //判断更新或者创建
        if (type === 'create') {
            handlerOk(params)
        } else {
            handlerUpdate(params)
        }
    }

    return (
        <div>
            {/* 添加工程 */}
            <Modal visible={visible} title={title} onCancel={cancel} onOk={handlerCreate}>
                <Form initialValues={{ ...propsData }} form={form}>
                    <Form.Item
                        label="所属变电工程"
                        name="mainProjectId"
                        rules={[
                            { required: true, message: '请输入所属变电工程' },
                        ]}
                    >
                        <Select>
                            <Option value={1}>工程1</Option>
                            <Option value={2}>工程2</Option>
                            <Option value={3}>工程3</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="工程名称"
                        name="projectName"
                        rules={[{ required: true, message: '请输入工程名称!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="工程简称"
                        name="projectSimpleName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="工程编码"
                        name="projectCode"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="线路长度" name="lineLength">
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="备注"
                        name="comment"
                        rules={[
                            { required: true, message: 'Please input your username!' },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
})

export default Index
