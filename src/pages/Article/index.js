import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Space,
  Tag,
  Image,
  Popconfirm,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { http } from "@/utils";
import "./index.scss";
import img404 from "@/assets/error.png";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  const navigate = useNavigate();
  //频道列表管理
  const [channelList, setChannelList] = useState([]);
  const loadChannelList = async () => {
    const res = await http.get("/channels");
    setChannelList(res.data.data.channels);
  };
  useEffect(() => {
    loadChannelList();
  }, []);
  //文章列表管理
  const [articleData, setArticleData] = useState({
    list: [], //文章列表
    count: 0, //文章总数
  });
  //文章参数
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
  });

  useEffect(() => {
    const loadList = async () => {
      const res = await http.get("/mp/articles", { params });
      const { results, total_count } = res.data.data;
      setArticleData({
        list: results,
        count: total_count,
      });
    };
    loadList();
  }, [params]);
  const onFinish = (values) => {
    const { channel_id, date, status } = values;
    //数据处理
    const _params = {};
    if (status !== -1) {
      _params.status = status;
    }
    if (channel_id) {
      _params.channel_id = channel_id;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YYYY-MM-DD");
      _params.end_pubdate = date[1].format("YYYY-MM-DD");
    }
    //修改params数据 引起接口重新发送
    setParams({
      ...params,
      ..._params,
    });
  };

  const pageChange = (page) => {
    setParams({
      ...params,
      page,
    });
  };
  //删除文章
  const deleteArticle = async (data) => {
    await http.delete(`/mp/articles/${data.id}`);
    //更新
    setParams({
      ...params,
      page: 1,
    });
  };
  //编辑
  const goPublish = (data) => {
    navigate(`/publish?id=${data.id}`);
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <Image
            src={cover.images[0] || img404}
            width={80}
            height={60}
            alt=""
          />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Popconfirm title="是否删除" onConfirm={() => deleteArticle(data)}>
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      {/* 筛选区域 */}
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map((channel) => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 文章列表区域 */}
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            current: params.page,
            pageSize: params.per_page,
            total: articleData.count,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
