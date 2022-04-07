import React, {
    ReactElement,
    memo,
    useState,
    useCallback,
    useEffect,
    useRef,
} from 'react'
import { Button, Modal, notification, Table } from 'antd'
//导入api请求
import { getProjectList, deleteById, createPorject, updatePorject } from '@/api/api'
//导入创建弹窗
import PoojectModal from './components/modal'
import './index.less'
//定义响应成功  status常量
const OK = 'OK'
//使用memo创建函数组件  性能开销小  利于维护
const Index = memo((): ReactElement => {
    //控制弹窗是否显示
    const [visible, setVisible] = useState<boolean>(false)
    //请求数据
    const [requestConfig] = useState<any>({
        page: 1,
        pageSize: 10,
    })
    //弹窗类型
    const [modalType, setModalType] = useState<'edit' | 'create'>('create')
    //编辑
    const [propsData, setPropsData] = useState<any>({})
    //定义表单table数据
    const [page, setPage] = useState<any>()
    //定义 ref 存储行数据
    const refPropsData = useRef(null)
    //定义Table colums
    const [columns] = useState<any[]>([
        {
            title: '所属输变电工程',
            width: '20%',
            render: (_, record) => {
                return <span>{record?.projectSimpleName}</span>
            },
        },
        {
            title: '工程名称',
            width: '40%',
            render: (_, record) => {
                return <span>{record?.projectName}</span>
            },
        },
        {
            title: '电压等级',
            width: '10%',
            render: (_, record) => {
                return <span>{record?.electricTypeId}</span>
            },
        },
        {
            title: '线路长度',
            width: '10%',
            render: (_, record) => {
                return <span>{record?.lineLength}</span>
            },
        },
        {
            title: '操作',
            width: '10%',
            render: (_, record) => {
                return (
                    <span>
                        <Button
                            type="link"
                            onClick={() => {
                                //展示弹窗
                                setVisible(true)
                                //设置回显
                                setPropsData(record)
                                //复用弹窗，所以添加和修改区分一下
                                setModalType('edit')
                            }}
                        >
                            编辑
                        </Button>
                        <Button type="link" onClick={() => handlerdelete(record)}>
                            删除
                        </Button>
                    </span>
                )
            },
        },
    ])

    //获取工程列表数据
    const getProject = useCallback(async (params = {}) => {
        let requestParams = Object.assign(requestConfig, params)
        let { data } = await getProjectList(requestParams)
        setPage(data)
        console.log(data)
    }, [])

    //删除工程
    const handlerdelete = ({ id }) => {
        Modal.confirm({
            title: '确定删除吗？',
            okType: 'danger',
            onOk: async () => {
                let data = await deleteById(id)
                if (data?.status === OK) {
                    notification['success']({ message: '删除成功' })
                    //删除后更新列表
                    getProject()
                }
                console.log(data, '删除')
            },
        })
    }

    //创建工程
    const handlerCreate = useCallback(async values => {
        let data = await createPorject({
            ...values,
            status: '1',
            projectType: '1',
            electricTypeId: '1',
        })
        console.log(propsData);
        if (data.status === OK) {
            notification['success']({ message: '创建成功' })
            getProject()
            setVisible(false)
        } else {
            notification['error']({ message: '创建失败，请联系管理员' })
        }
    }, [])

    //编辑工程
    const handlerUpdate = useCallback(async valus => {
        console.log(refPropsData.current)
        let data = await updatePorject(
            {
                ...valus,
                status: '1',
                projectType: '1',
                electricTypeId: '1',
            },
            refPropsData.current?.id
        )

        if (data.status === OK) {
            notification['success']({ message: '修改成功' })
            getProject()
            setVisible(false)
        } else {
            notification['error']({ message: '修改失败，请稍后重试' })
        }
    }, [])

    //拿到最新的props值
    useEffect(() => {
        refPropsData.current = propsData
    }, [visible])

    //分页改变调用
    const handlerChangeTable = (page) => {
        getProject({
            page: page
        })
    }

    //useeffect 相当于  componentDidMount
    useEffect(() => {
        getProject()
    }, [])
    return (
        <div className="project-list">
            <div className="project-list-title">
                <div className="title">工程列表</div>
                <div className="active">
                    <Button
                        type="primary"
                        onClick={() => {
                            setVisible(true)
                            setModalType('create')
                        }}
                    >
                        添加工程
                    </Button>
                </div>
            </div>
            <PoojectModal
                type={modalType}
                propsData={propsData}
                visible={visible}
                handlerUpdate={handlerUpdate}
                title="新建工程"
                cancel={() => setVisible(false)}
                handlerOk={handlerCreate}
                key={Math.random()} //添加一个不唯一的key ==确保弹窗内容是最新的
            />
            <div className="project-list-content">
                <Table columns={columns} dataSource={page?.list} rowKey="id" pagination={
                    {
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total: page?.meta?.total,
                        pageSize: 10,
                        current: page?.meta?.page,
                        onChange: handlerChangeTable,
                        showTotal: () => `共 ${page?.meta?.total} 条`,
                    }
                } />
            </div>
        </div>
    )
})

export default Index
