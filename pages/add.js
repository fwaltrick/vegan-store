import React, { useState, useEffect } from "react"
import {
  Typography,
  Form,
  Input,
  InputNumber,
  message,
  Button,
  Upload,
  Spin,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"
import baseUrl from "./../utils/baseUrl"

function Add() {
  const INITIAL_PRODUCT = {
    brand: "",
    name: "",
    price: "",
    media: "",
    description: "",
  }

  const [form] = Form.useForm()
  const [product, setProduct] = useState(INITIAL_PRODUCT)
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { id, value, files } = event.target
    if (id === "upload") {
      setProduct((prevState) => ({ ...prevState, media: files[0] }))
    } else {
      setProduct((prevState) => ({ ...prevState, [id]: value }))
      console.log(product)
    }
  }

  async function handleImageUpload() {
    const data = new FormData()
    data.append("file", product.media)
    data.append("upload_preset", "add_vs")
    data.append("cloud_name", "dvn52rfzx")
    const response = await axios.post(process.env.CLOUDINARY_URL, data)
    const mediaUrl = response.data.url
    return mediaUrl
  }

  async function onFinish(values) {
    setLoading(true)
    const mediaUrl = await handleImageUpload()
    const url = `${baseUrl}/api/product`
    const { brand, name, price, description } = product
    const payload = { brand, name, price, description, mediaUrl }
    const response = await axios.post(url, payload)
    console.log({ response })
    setLoading(false)
    success()
    form.resetFields()
    console.log(values)
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo)
  }

  const { Title } = Typography

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  const tailLayout = {
    wrapperCol: { offset: 5, span: 19 },
  }

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not a validate number",
    },
  }

  const normFile = (e) => {
    console.log("Upload event:", e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const success = () => {
    message.config({
      top: 65,
      duration: 3.5,
    })
    message.success("Success! \n Product successfully posted")
  }

  return (
    <>
      <div className='form'>
        <Title className='form-title' level={3}>
          Add Item
        </Title>

        <Form
          {...layout}
          form={form}
          layout='horizontal'
          validateMessages={validateMessages}
          className='form-add'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Spin spinning={loading} tip='Loading...'>
            <Form.Item
              name='brand'
              label='Brand'
              className='form-item'
              hasFeedback
              rules={[{ required: true }]}
              value={product.brand}
              onChange={handleChange}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='name'
              label='Name'
              className='form-item'
              hasFeedback
              rules={[{ required: true }]}
              value={product.name}
              onChange={handleChange}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='price'
              label='Price (€)'
              className='form-item'
              hasFeedback
              rules={[{ type: "number", required: true }]}
              value={product.price}
              onChange={handleChange}
            >
              <InputNumber
                min={0}
                step={0.01}
                value={product.price}
                onChange={(value) =>
                  setProduct((prev) => ({ ...prev, price: value }))
                }
              />
            </Form.Item>

            <Form.Item
              name='upload'
              label='Upload'
              accept='image/*'
              valuePropName='fileList'
              className='form-item'
              rules={[{ required: true }]}
              getValueFromEvent={normFile}
              onChange={handleChange}
            >
              <Upload name='logo' action='/upload.do' listType='picture'>
                <Button className='button-upload'>
                  <UploadOutlined /> Choose File
                </Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name='description'
              label='Description'
              className='form-item'
              hasFeedback
              rules={[{ required: true }]}
              value={product.description}
              onChange={handleChange}
            >
              <Input.TextArea />
            </Form.Item>
          </Spin>

          <Form.Item {...tailLayout}>
            <Button htmlType='submit' disabled={loading} type='primary'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Add
