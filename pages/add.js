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
import catchErrors from "./../utils/catchErrors"

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
  const [disabled, setDisabled] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const isProduct = Object.values(product).every((el) => Boolean(el))
    isProduct ? setDisabled(false) : setDisabled(true)
  }, [product])

  function handleChange(event) {
    const { id, value, files } = event.target
    if (id === "upload") {
      setProduct((prevState) => ({ ...prevState, media: files[0] }))
    } else {
      setProduct((prevState) => ({ ...prevState, [id]: value }))
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
    try {
      setLoading(true)
      setError("")
      const mediaUrl = await handleImageUpload()
      const url = `${baseUrl}/api/product`
      const { brand, name, price, description } = product
      const payload = { brand, name, price, description, mediaUrl }
      const response = await axios.post(url, payload)
      success()
      form.resetFields()
    } catch (error) {
      catchErrors(error, fail)
    } finally {
      setLoading(false)
    }
  }

  function onFinishFailed(errorInfo) {
    console.error("Failed:", errorInfo)
  }

  const { Title } = Typography

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  }

  const validateMessages = {
    required: "${label} is required",
    types: {
      number: "${label} is not a valid number",
    },
  }

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const success = () => {
    message.config({
      top: 65,
      duration: 4,
    })
    message.success("Success! Product successfully posted")
  }

  const fail = (error) => {
    message.config({
      top: 65,
      duration: 4,
    })
    message.error(`Ooops! ${error}`)
  }

  return (
    <div className='background-shape background-shape--green'>
      <div className='container'>
        <div className='form'>
          <Title
            className='form-title'
            level={3}
            style={{ marginBottom: "1.5em" }}
          >
            Add a New Product
          </Title>

          <Form
            {...layout}
            form={form}
            layout='horizontal'
            validateMessages={validateMessages}
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

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
              <Button
                htmlType='submit'
                disabled={disabled || loading}
                type='primary'
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Add
